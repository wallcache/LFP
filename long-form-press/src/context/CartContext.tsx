'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { CartItem, Product, ProductVariant } from '@/types/shopify';
import { storage } from '@/lib/utils';

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: string;
  currencyCode: string;
  isOpen: boolean;
  isLoading: boolean;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lfp-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get<CartItem[]>(CART_STORAGE_KEY, []);
    setItems(savedCart);
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      storage.set(CART_STORAGE_KEY, items);
    }
  }, [items, isLoading]);

  // Calculate totals
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const currencyCode = items[0]?.currencyCode || 'GBP';

  // Add item to cart
  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity: number = 1) => {
      setItems((currentItems) => {
        const existingItemIndex = currentItems.findIndex(
          (item) => item.merchandiseId === variant.id
        );

        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
          return updatedItems;
        }

        // Add new item
        const newItem: CartItem = {
          id: `${variant.id}-${Date.now()}`,
          merchandiseId: variant.id,
          quantity,
          title: product.title,
          variantTitle: variant.title !== 'Default Title' ? variant.title : '',
          price: variant.price,
          currencyCode: variant.currencyCode,
          image: product.featuredImage,
          handle: product.handle,
        };

        return [...currentItems, newItem];
      });

      // Open cart drawer when adding item
      setIsOpen(true);
    },
    []
  );

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Clear cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Open/close cart drawer
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        currencyCode,
        isOpen,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
