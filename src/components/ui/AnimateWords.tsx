'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimateWordsProps {
  children: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'blockquote';
  delay?: number;
}

export function AnimateWords({
  children,
  className,
  as: Component = 'p',
  delay = 0
}: AnimateWordsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const words = children.split(' ');

  return (
    <Component
      ref={ref as any}
      className={cn('animate-words-container', className)}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="animate-word inline-block"
          style={{
            transitionDelay: isVisible ? `${index * 60}ms` : '0ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {word}
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
