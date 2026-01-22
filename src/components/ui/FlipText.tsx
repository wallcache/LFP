'use client';

import { cn } from '@/lib/utils';

interface FlipTextProps {
  children: string;
  className?: string;
}

export function FlipText({ children, className }: FlipTextProps) {
  const letters = children.split('');

  return (
    <span className={cn('inline-flex', className)}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="flip-letter"
          style={{
            animationDelay: `${index * 30}ms`,
            // Preserve spaces
            ...(letter === ' ' ? { width: '0.25em' } : {})
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}
