import { cn } from '@/lib/utils';
import { ElementType, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-[1200px] px-6 md:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
}
