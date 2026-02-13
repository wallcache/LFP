import { Product } from '@/types/shopify';

// Placeholder products for development before Shopify is connected
export const placeholderProducts: Product[] = [
  // --- BOOKS ---
  {
    id: 'gid://shopify/Product/5',
    handle: 'moby-dick',
    title: 'Moby Dick',
    description: 'Herman Melville\'s obsessive masterpiece, rebound for the Long Form Press library. Bold typographic cover. Sewn binding. The whale deserved better design.',
    descriptionHtml: '<p>Herman Melville\'s obsessive masterpiece, rebound for the Long Form Press library.</p><p>Bold typographic cover. Sewn binding. The whale deserved better design.</p>',
    featuredImage: {
      url: '/site_photos/book_MODBDYSID.jpg',
      altText: 'Moby Dick by Herman Melville — Long Form Press edition',
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: '/site_photos/book_MODBDYSID.jpg',
        altText: 'Moby Dick by Herman Melville — Long Form Press edition',
        width: 800,
        height: 1000,
      },
    ],
    price: '14.99',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/9',
        title: 'Paperback',
        availableForSale: true,
        price: '14.99',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Format', value: 'Paperback' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/5',
        name: 'Format',
        values: ['Paperback'],
      },
    ],
    tags: ['book', 'classic', 'literary', 'melville'],
    productType: 'Books',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'wuthering-heights',
    title: 'Wuthering Heights',
    description: 'Emily Brontë\'s dark, windswept masterwork, rebound for the Long Form Press library. Bold typographic cover. Sewn binding. Heathcliff would approve.',
    descriptionHtml: '<p>Emily Brontë\'s dark, windswept masterwork, rebound for the Long Form Press library.</p><p>Bold typographic cover. Sewn binding. Heathcliff would approve.</p>',
    featuredImage: {
      url: '/site_photos/book_wh.jpg',
      altText: 'Wuthering Heights by Emily Brontë — Long Form Press edition',
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: '/site_photos/book_wh.jpg',
        altText: 'Wuthering Heights by Emily Brontë — Long Form Press edition',
        width: 800,
        height: 1000,
      },
    ],
    price: '14.99',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/11',
        title: 'Paperback',
        availableForSale: true,
        price: '14.99',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Format', value: 'Paperback' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/6',
        name: 'Format',
        values: ['Paperback'],
      },
    ],
    tags: ['book', 'classic', 'literary', 'bronte'],
    productType: 'Books',
    availableForSale: true,
  },
  // --- PRINTS ---
  {
    id: 'gid://shopify/Product/1',
    handle: 'give-me-fiction-or-give-me-death-print',
    title: 'Give Me Fiction or Give Me Death',
    description: 'The declaration, framed. Limited edition typographic print on museum-quality archival paper. Numbered and signed. For walls that read.',
    descriptionHtml: '<p>The declaration, framed. Limited edition typographic print on museum-quality archival paper.</p><p>Numbered and signed. For walls that read.</p>',
    featuredImage: {
      url: '/site_photos/fictionordeath.jpg',
      altText: 'Give Me Fiction or Give Me Death typographic print in wooden frame',
      width: 800,
      height: 800,
    },
    images: [
      {
        url: '/site_photos/fictionordeath.jpg',
        altText: 'Give Me Fiction or Give Me Death typographic print in wooden frame',
        width: 800,
        height: 800,
      },
    ],
    price: '35.00',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'A4',
        availableForSale: true,
        price: '35.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A4' }],
      },
      {
        id: 'gid://shopify/ProductVariant/2',
        title: 'A3',
        availableForSale: true,
        price: '55.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A3' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/1',
        name: 'Size',
        values: ['A4', 'A3'],
      },
    ],
    tags: ['print', 'typography', 'literary', 'limited-edition'],
    productType: 'Prints',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'long-live-the-long-form-print',
    title: 'Long Live the Long Form',
    description: 'Our manifesto, mounted. Limited edition typographic print on museum-quality archival paper. Numbered and signed. A rallying cry for your reading room.',
    descriptionHtml: '<p>Our manifesto, mounted. Limited edition typographic print on museum-quality archival paper.</p><p>Numbered and signed. A rallying cry for your reading room.</p>',
    featuredImage: {
      url: '/site_photos/print_longlive.jpg',
      altText: 'Long Live the Long Form typographic print in wooden frame',
      width: 800,
      height: 800,
    },
    images: [
      {
        url: '/site_photos/print_longlive.jpg',
        altText: 'Long Live the Long Form typographic print in wooden frame',
        width: 800,
        height: 800,
      },
    ],
    price: '35.00',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/3',
        title: 'A4',
        availableForSale: true,
        price: '35.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A4' }],
      },
      {
        id: 'gid://shopify/ProductVariant/4',
        title: 'A3',
        availableForSale: true,
        price: '55.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A3' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/2',
        name: 'Size',
        values: ['A4', 'A3'],
      },
    ],
    tags: ['print', 'typography', 'literary', 'limited-edition'],
    productType: 'Prints',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'read-slowly-or-die-trying-print',
    title: 'Read Slowly or Die Trying',
    description: 'For the patient reader. Limited edition typographic print on museum-quality archival paper. Numbered and signed. Because attention is the rarest art.',
    descriptionHtml: '<p>For the patient reader. Limited edition typographic print on museum-quality archival paper.</p><p>Numbered and signed. Because attention is the rarest art.</p>',
    featuredImage: {
      url: '/site_photos/readslow.jpg',
      altText: 'Read Slowly or Die Trying typographic print in wooden frame',
      width: 800,
      height: 800,
    },
    images: [
      {
        url: '/site_photos/readslow.jpg',
        altText: 'Read Slowly or Die Trying typographic print in wooden frame',
        width: 800,
        height: 800,
      },
    ],
    price: '35.00',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/5',
        title: 'A4',
        availableForSale: true,
        price: '35.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A4' }],
      },
      {
        id: 'gid://shopify/ProductVariant/6',
        title: 'A3',
        availableForSale: true,
        price: '55.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A3' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/3',
        name: 'Size',
        values: ['A4', 'A3'],
      },
    ],
    tags: ['print', 'typography', 'literary', 'limited-edition'],
    productType: 'Prints',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'so-many-books-so-little-time-print',
    title: 'So Many Books. So Little Time.',
    description: 'The eternal lament, letterpress\'d. Limited edition typographic print on museum-quality archival paper. Numbered and signed. For readers whose ambitions exceed their shelves.',
    descriptionHtml: '<p>The eternal lament, letterpress\'d. Limited edition typographic print on museum-quality archival paper.</p><p>Numbered and signed. For readers whose ambitions exceed their shelves.</p>',
    featuredImage: {
      url: '/site_photos/somanybooks.jpg',
      altText: 'So Many Books So Little Time typographic print in wooden frame',
      width: 800,
      height: 800,
    },
    images: [
      {
        url: '/site_photos/somanybooks.jpg',
        altText: 'So Many Books So Little Time typographic print in wooden frame',
        width: 800,
        height: 800,
      },
    ],
    price: '35.00',
    compareAtPrice: null,
    currencyCode: 'GBP',
    variants: [
      {
        id: 'gid://shopify/ProductVariant/7',
        title: 'A4',
        availableForSale: true,
        price: '35.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A4' }],
      },
      {
        id: 'gid://shopify/ProductVariant/8',
        title: 'A3',
        availableForSale: true,
        price: '55.00',
        currencyCode: 'GBP',
        selectedOptions: [{ name: 'Size', value: 'A3' }],
      },
    ],
    options: [
      {
        id: 'gid://shopify/ProductOption/4',
        name: 'Size',
        values: ['A4', 'A3'],
      },
    ],
    tags: ['print', 'typography', 'literary', 'limited-edition'],
    productType: 'Prints',
    availableForSale: true,
  },
];

// Category data
export const categories = [
  { handle: 'books', title: 'Books', description: 'Classics rebound for the discerning reader.' },
  { handle: 'prints', title: 'Prints', description: 'Limited edition typographic prints for literary walls.' },
];

// Helper to get products by category
export function getProductsByCategory(categoryHandle: string): Product[] {
  const categoryMap: Record<string, string> = {
    prints: 'Prints',
    books: 'Books',
  };

  const productType = categoryMap[categoryHandle];
  if (!productType) return placeholderProducts;

  return placeholderProducts.filter((p) => p.productType === productType);
}

// Helper to get product by handle
export function getProductByHandle(handle: string): Product | undefined {
  return placeholderProducts.find((p) => p.handle === handle);
}

// Helper to get featured products
export function getFeaturedProducts(count: number = 4): Product[] {
  return placeholderProducts.slice(0, count);
}

// Helper to get related products
export function getRelatedProducts(currentHandle: string, count: number = 3): Product[] {
  return placeholderProducts
    .filter((p) => p.handle !== currentHandle)
    .slice(0, count);
}
