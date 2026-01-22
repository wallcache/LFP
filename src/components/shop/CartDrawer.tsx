'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    totalQuantity,
    subtotal,
    currencyCode,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#FAFAF8] shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 px-6 py-4">
            <h2 className="font-serif text-xl">
              Cart {totalQuantity > 0 && `(${totalQuantity})`}
            </h2>
            <button
              onClick={closeCart}
              className="text-[#8A8A8A] transition-colors hover:text-[#1A1A1A]"
              aria-label="Close cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-serif text-lg text-[#4A4A4A]">
                  Your cart is empty
                </p>
                <p className="mt-2 text-sm text-[#8A8A8A]">
                  For the reader who stayed.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 text-sm underline text-[#1A1A1A] hover:text-[#4A4A4A]"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    {/* Image */}
                    <div className="relative h-24 w-20 flex-shrink-0 bg-[#F5F5F0]">
                      {item.image ? (
                        <Image
                          src={item.image.url}
                          alt={item.image.altText || item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs text-[#8A8A8A]">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.handle}`}
                          onClick={closeCart}
                          className="font-serif text-sm hover:underline"
                        >
                          {item.title}
                        </Link>
                        {item.variantTitle && (
                          <p className="text-xs text-[#8A8A8A]">
                            {item.variantTitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center border border-[#1A1A1A]/20 text-sm hover:border-[#1A1A1A]"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center border border-[#1A1A1A]/20 text-sm hover:border-[#1A1A1A]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm">
                            {formatPrice(
                              (parseFloat(item.price) * item.quantity).toFixed(
                                2
                              ),
                              item.currencyCode
                            )}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[#8A8A8A] hover:text-[#1A1A1A] hover:underline"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#1A1A1A]/10 px-6 py-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4A4A4A]">Subtotal</span>
                <span className="font-serif text-lg">
                  {formatPrice(subtotal, currencyCode)}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#8A8A8A]">
                Shipping calculated at checkout
              </p>

              {/* Checkout Button */}
              <button
                className="mt-4 w-full bg-[#1A1A1A] py-3 text-sm tracking-wide text-[#FAFAF8] transition-colors hover:bg-[#4A4A4A]"
              >
                Checkout
              </button>

              <p className="mt-3 text-center text-xs text-[#8A8A8A]">
                Tote bag included with every order
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
