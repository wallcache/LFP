'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const categories = [
  { handle: '', title: 'All' },
  { handle: 'prints', title: 'Prints' },
  { handle: 'bookmarks', title: 'Bookmarks' },
  { handle: 't-shirts', title: 'T-Shirts' },
  { handle: 'books', title: 'Books' },
];

export function CategoryFilter() {
  const pathname = usePathname();

  const isActive = (handle: string) => {
    if (handle === '') {
      return pathname === '/shop';
    }
    return pathname === `/shop/${handle}`;
  };

  return (
    <nav className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category.handle}
          href={category.handle ? `/shop/${category.handle}` : '/shop'}
          className={cn(
            'px-4 py-2 text-sm tracking-wide transition-colors',
            isActive(category.handle)
              ? 'bg-[#1A1A1A] text-[#FAFAF8]'
              : 'bg-transparent text-[#8A8A8A] hover:text-[#1A1A1A]'
          )}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
