// Shopify Storefront API Types

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  tags: string[];
  productType: string;
  vendor: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface ShopifyCartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
  };
  cost: {
    totalAmount: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
  lines: {
    edges: {
      node: ShopifyCartLineItem;
    }[];
  };
}

// Simplified types for components
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  price: string;
  compareAtPrice: string | null;
  currencyCode: string;
  variants: ProductVariant[];
  options: ProductOption[];
  tags: string[];
  productType: string;
  availableForSale: boolean;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string;
  currencyCode: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface CartItem {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  image: ShopifyImage | null;
  handle: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: string;
  total: string;
  currencyCode: string;
  items: CartItem[];
}

// API Response types
export interface ShopifyResponse<T> {
  data: T;
  errors?: {
    message: string;
  }[];
}
