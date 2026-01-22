import { type ClassValue, clsx } from 'clsx';

// Combine class names (simple implementation without tailwind-merge for now)
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Format price for display
export function formatPrice(amount: string, currencyCode: string = 'GBP'): string {
  const numericAmount = parseFloat(amount);

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currencyCode === 'GBP' ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

// Create URL-friendly slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Get placeholder image URL
export function getPlaceholderImage(width: number = 400, height: number = 500): string {
  return `https://placehold.co/${width}x${height}/FAFAF8/1A1A1A?text=Long+Form+Press`;
}

// Delay utility for loading states
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if we're on the client side
export const isClient = typeof window !== 'undefined';

// Local storage helpers with error handling
export const storage = {
  get: <T>(key: string, fallback: T): T => {
    if (!isClient) return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  },
  remove: (key: string): void => {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Storage unavailable
    }
  },
};
