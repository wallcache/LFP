'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types/shopify';
import { VariantSelector } from '@/components/shop/VariantSelector';
import { AddToCartButton } from '@/components/shop/AddToCartButton';
import { formatPrice } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  // Initialize selected options from first variant
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants[0]) {
      product.variants[0].selectedOptions.forEach((opt) => {
        initial[opt.name] = opt.value;
      });
    }
    return initial;
  });

  // Find the selected variant based on current options
  const selectedVariant = useMemo<ProductVariant>(() => {
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) || product.variants[0]
    );
  }, [product.variants, selectedOptions]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-[4/5] bg-[#F5F5F0]">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-2xl text-[#8A8A8A]">
                {product.title}
              </span>
            </div>
          )}
        </div>

        {/* Additional images */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square bg-[#F5F5F0] cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-[#8A8A8A]">
          <Link href="/shop" className="hover:text-[#1A1A1A]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>{product.productType}</span>
        </nav>

        {/* Title & Price */}
        <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.title}</h1>

        <p className="text-xl mb-8">
          {formatPrice(selectedVariant.price, selectedVariant.currencyCode)}
        </p>

        {/* Description */}
        <div
          className="prose prose-sm text-[#4A4A4A] mb-8 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />

        {/* Variant Selector */}
        {product.options.length > 0 && (
          <div className="mb-8">
            <VariantSelector
              options={product.options}
              variants={product.variants}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
          </div>
        )}

        {/* Add to Cart */}
        <AddToCartButton
          product={product}
          variant={selectedVariant}
          className="w-full md:w-auto"
        />

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10 space-y-4">
          <p className="text-sm text-[#8A8A8A]">
            Free tote bag with every order
          </p>
          <p className="text-sm text-[#8A8A8A]">
            Shipping calculated at checkout
          </p>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#8A8A8A] bg-[#F5F5F0] px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
