'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MarginaliaProps {
  children: string;
  className?: string;
  position?: 'left' | 'right';
  rotation?: number;
  delay?: number;
}

export function Marginalia({
  children,
  className,
  position = 'right',
  rotation = -3,
  delay = 0,
}: MarginaliaProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            // Animate the drawing effect
            let progress = 0;
            const interval = setInterval(() => {
              progress += 0.05;
              setDrawProgress(Math.min(1, progress));
              if (progress >= 1) clearInterval(interval);
            }, 20);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const positionStyles = position === 'left'
    ? { right: '100%', marginRight: '1rem' }
    : { left: '100%', marginLeft: '1rem' };

  return (
    <span
      ref={ref}
      className={cn(
        'absolute top-0 whitespace-nowrap pointer-events-none hidden md:inline-block',
        'text-[#3B78C6] text-lg md:text-xl',
        className
      )}
      style={{
        fontFamily: 'Handwriting, cursive',
        transform: `rotate(${rotation}deg)`,
        opacity: isVisible ? 0.85 : 0,
        clipPath: `inset(0 ${100 - drawProgress * 100}% 0 0)`,
        transition: 'opacity 0.4s ease',
        ...positionStyles,
      }}
    >
      {children}
    </span>
  );
}
