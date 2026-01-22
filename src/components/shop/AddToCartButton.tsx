'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/types/shopify';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  className?: string;
}

export function AddToCartButton({
  product,
  variant,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!variant.availableForSale) return;

    setIsAdding(true);

    // Simulate a brief delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem(product, variant);
    setIsAdding(false);
    setJustAdded(true);

    // Reset "Added" state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (!variant.availableForSale) {
    return (
      <Button variant="secondary" disabled className={className}>
        Sold Out
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      loading={isAdding}
      className={className}
    >
      {justAdded ? 'Added' : 'Add to Cart'}
    </Button>
  );
}
