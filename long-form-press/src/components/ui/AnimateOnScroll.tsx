'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'reveal-up' | 'reveal-left' | 'reveal-right' | 'reveal-scale';
  delay?: number;
  className?: string;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  animation = 'reveal-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(animation),
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function getInitialTransform(animation: string): string {
  switch (animation) {
    case 'reveal-up':
      return 'translateY(40px)';
    case 'reveal-left':
      return 'translateX(-40px)';
    case 'reveal-right':
      return 'translateX(40px)';
    case 'reveal-scale':
      return 'scale(0.9)';
    default:
      return 'translateY(40px)';
  }
}
