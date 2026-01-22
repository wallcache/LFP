'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollHighlightProps {
  children: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
}

export function ScrollHighlight({
  children,
  className,
  as: Component = 'span',
}: ScrollHighlightProps) {
  const ref = useRef<HTMLElement>(null);
  const [highlightProgress, setHighlightProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when element enters viewport, complete when it's 30% up
      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.3;

      if (rect.top <= startPoint && rect.top >= endPoint) {
        const progress = (startPoint - rect.top) / (startPoint - endPoint);
        setHighlightProgress(Math.min(1, Math.max(0, progress)));
      } else if (rect.top < endPoint) {
        setHighlightProgress(1);
      } else {
        setHighlightProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Component
      ref={ref as any}
      className={cn('scroll-highlight', className)}
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(45, 74, 62, 0.3), rgba(45, 74, 62, 0.3))',
        backgroundSize: `${highlightProgress * 100}% 40%`,
        backgroundPosition: 'left 85%',
        backgroundRepeat: 'no-repeat',
        transition: 'background-size 0.1s ease-out',
      }}
    >
      {children}
    </Component>
  );
}
