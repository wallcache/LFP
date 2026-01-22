'use client';

import { cn } from '@/lib/utils';
import { ProductOption, ProductVariant } from '@/types/shopify';

interface VariantSelectorProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, value: string) => void;
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  // Filter out default options
  const displayOptions = options.filter(
    (option) => !(option.values.length === 1 && option.values[0] === 'Default Title')
  );

  if (displayOptions.length === 0) {
    return null;
  }

  // Check if a specific option value is available
  const isOptionAvailable = (optionName: string, value: string): boolean => {
    return variants.some((variant) => {
      const matchesOption = variant.selectedOptions.some(
        (opt) => opt.name === optionName && opt.value === value
      );
      const matchesOtherOptions = Object.entries(selectedOptions)
        .filter(([name]) => name !== optionName)
        .every(([name, val]) =>
          variant.selectedOptions.some(
            (opt) => opt.name === name && opt.value === val
          )
        );
      return matchesOption && matchesOtherOptions && variant.availableForSale;
    });
  };

  return (
    <div className="space-y-6">
      {displayOptions.map((option) => (
        <div key={option.id}>
          <label className="mb-3 block text-sm text-[#4A4A4A]">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isOptionAvailable(option.name, value);

              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={cn(
                    'min-w-[3rem] px-4 py-2 text-sm transition-colors',
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#FAFAF8]'
                      : isAvailable
                      ? 'border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'
                      : 'border border-[#1A1A1A]/10 text-[#8A8A8A] line-through cursor-not-allowed'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
