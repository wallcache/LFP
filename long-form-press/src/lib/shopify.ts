import {
  ShopifyProduct,
  ShopifyCart,
  ShopifyResponse,
  Product,
  Cart,
  CartItem,
  ShopifyImage,
} from '@/types/shopify';
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from './queries';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Check if Shopify is configured
export const isShopifyConfigured = Boolean(
  domain &&
  storefrontAccessToken &&
  domain !== 'your-store.myshopify.com'
);

// Main fetch function for Shopify Storefront API
export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<ShopifyResponse<T>> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured. Please add your credentials to .env.local');
  }

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR revalidation
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  return response.json();
}

// Transform Shopify product to simplified Product type
function transformProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    featuredImage: shopifyProduct.featuredImage,
    images: shopifyProduct.images.edges.map((edge) => edge.node),
    price: shopifyProduct.priceRange.minVariantPrice.amount,
    compareAtPrice: shopifyProduct.variants.edges[0]?.node.compareAtPrice?.amount || null,
    currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    variants: shopifyProduct.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      price: edge.node.price.amount,
      currencyCode: edge.node.price.currencyCode,
      selectedOptions: edge.node.selectedOptions,
      image: edge.node.image,
    })),
    options: shopifyProduct.options,
    tags: shopifyProduct.tags,
    productType: shopifyProduct.productType,
    availableForSale: shopifyProduct.availableForSale,
  };
}

// Transform Shopify cart to simplified Cart type
function transformCart(shopifyCart: ShopifyCart): Cart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: shopifyCart.cost.subtotalAmount.amount,
    total: shopifyCart.cost.totalAmount.amount,
    currencyCode: shopifyCart.cost.totalAmount.currencyCode,
    items: shopifyCart.lines.edges.map((edge) => ({
      id: edge.node.id,
      merchandiseId: edge.node.merchandise.id,
      quantity: edge.node.quantity,
      title: edge.node.merchandise.product.title,
      variantTitle: edge.node.merchandise.title,
      price: edge.node.merchandise.price.amount,
      currencyCode: edge.node.merchandise.price.currencyCode,
      image: edge.node.merchandise.product.featuredImage,
      handle: edge.node.merchandise.product.handle,
    })),
  };
}

// API Functions

export async function getProducts(first: number = 20): Promise<Product[]> {
  const response = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return response.data.products.edges.map((edge) => transformProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const response = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data.productByHandle) {
    return null;
  }

  return transformProduct(response.data.productByHandle);
}

export async function getCollections(): Promise<
  { handle: string; title: string; description: string }[]
> {
  const response = await shopifyFetch<{
    collections: {
      edges: {
        node: { handle: string; title: string; description: string };
      }[];
    };
  }>({
    query: COLLECTIONS_QUERY,
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return response.data.collections.edges.map((edge) => edge.node);
}

export async function createCart(): Promise<Cart> {
  const response = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>({
    query: CREATE_CART_MUTATION,
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return transformCart(response.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<Cart> {
  const response = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId, quantity }],
    },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return transformCart(response.data.cartLinesAdd.cart);
}

export async function updateCart(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const response = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>({
    query: UPDATE_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return transformCart(response.data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const response = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: {
      cartId,
      lineIds,
    },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  return transformCart(response.data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const response = await shopifyFetch<{
    cart: ShopifyCart | null;
  }>({
    query: GET_CART_QUERY,
    variables: { cartId },
  });

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data.cart) {
    return null;
  }

  return transformCart(response.data.cart);
}
