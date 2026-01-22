import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block card-hover"
    >
      {/* Image */}
      <div className="img-hover-glow img-hover-reveal relative aspect-[4/5] bg-[#F5F5F0] mb-4 overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-lg text-[#8A8A8A]">
              {product.title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/10 transition-colors duration-500" />

        {/* Quick view text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[#FAFAF8] text-sm tracking-wider bg-[#1A1A1A]/80 px-4 py-2 backdrop-blur-sm">
            View
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-[#1A1A1A] transition-all duration-300 group-hover:text-[#2D4A3E] group-hover:translate-x-1">
          {product.title}
        </h3>
        <p className="text-sm text-[#8A8A8A] transition-all duration-300 group-hover:text-[#4A4A4A]">
          {formatPrice(product.price, product.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
