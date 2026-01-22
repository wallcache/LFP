'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MagneticImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  strength?: number;
  scale?: number;
  priority?: boolean;
}

export function MagneticImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  containerClassName,
  strength = 20,
  scale = 1.05,
  priority = false,
}: MagneticImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / rect.width;
    const distanceY = (e.clientY - centerY) / rect.height;

    setTransform({
      x: distanceX * strength,
      y: distanceY * strength,
      scale: scale,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('overflow-hidden', containerClassName)}
    >
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn('object-cover', className)}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
