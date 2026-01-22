'use client';

import { useRef, useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  strength?: number;
  variant?: 'dark' | 'light';
}

// Pre-defined hand-drawn rectangle paths (more natural looking)
const handDrawnPaths = [
  'M3,4 C12,2 28,5 50,3 C72,1 88,4 97,5 C99,15 98,28 97,38 C85,40 65,37 50,39 C35,41 15,38 3,40 C2,28 3,15 3,4 Z',
  'M4,5 C18,3 35,6 52,4 C70,2 85,5 96,4 C98,16 97,30 96,39 C80,41 60,38 48,40 C32,42 16,39 4,41 C3,30 4,17 4,5 Z',
  'M3,6 C20,3 40,5 55,3 C75,1 90,4 97,6 C98,18 97,32 96,40 C78,42 58,39 45,41 C28,43 12,40 4,42 C2,32 3,18 3,6 Z',
];

// Crayon scribble fill paths - more lines for denser fill
const scribbleFillPaths = [
  'M6,6 Q28,4 50,7 T94,5',
  'M8,11 Q32,9 55,12 T92,10',
  'M6,16 Q30,14 52,17 T94,15',
  'M8,21 Q28,19 50,22 T92,20',
  'M6,26 Q32,24 54,27 T94,25',
  'M8,31 Q30,29 52,32 T92,30',
  'M6,36 Q28,34 50,37 T94,35',
  'M8,41 Q32,39 54,42 T92,40',
];

export function MagneticButton({
  children,
  href,
  className,
  type = 'button',
  onClick,
  strength = 0.25,
  variant = 'dark',
}: MagneticButtonProps) {
  const uniqueId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const [pathIndex] = useState(() => Math.floor(Math.random() * handDrawnPaths.length));
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const strokeColor = variant === 'dark' ? '#1A1A1A' : '#FAFAF8';
  const scribbleColor = variant === 'dark' ? '#1A1A1A' : '#FAFAF8';
  const bgColor = variant === 'dark' ? '#FAFAF8' : 'transparent';

  useEffect(() => {
    if (animationRef.current) clearInterval(animationRef.current);

    if (isHovered) {
      animationRef.current = setInterval(() => {
        setFillProgress(prev => {
          const next = prev + 0.08;
          if (next >= 1) {
            if (animationRef.current) clearInterval(animationRef.current);
            return 1;
          }
          return next;
        });
      }, 16);
    } else {
      animationRef.current = setInterval(() => {
        setFillProgress(prev => {
          const next = prev - 0.06;
          if (next <= 0) {
            if (animationRef.current) clearInterval(animationRef.current);
            return 0;
          }
          return next;
        });
      }, 16);
    }

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setTransform({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const squigglyPath = handDrawnPaths[pathIndex];
  const visibleScribbles = Math.ceil(fillProgress * scribbleFillPaths.length);
  const clipId = `scribble-clip-${uniqueId.replace(/:/g, '')}`;

  const content = href ? (
    <Link href={href} className={cn('relative z-10 block', className)}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={cn('relative z-10', className)}>
      {children}
    </button>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="btn-squiggly-container relative inline-block cursor-pointer"
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Squiggly border SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 46"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Shadow layer */}
        <path
          d={squigglyPath}
          fill={strokeColor}
          style={{
            transform: isHovered ? 'translate(4px, 4px)' : 'translate(2px, 2px)',
            transition: 'transform 0.3s ease',
            opacity: isHovered ? 1 : 0.7,
          }}
        />

        {/* Background fill */}
        <path
          d={squigglyPath}
          fill={bgColor}
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Crayon scribble fill on hover */}
        <defs>
          <clipPath id={clipId}>
            <path d={squigglyPath} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {scribbleFillPaths.slice(0, visibleScribbles).map((path, i) => {
            const isLastLine = i === visibleScribbles - 1;
            const lineProgress = isLastLine ? (fillProgress * scribbleFillPaths.length) % 1 : 1;

            return (
              <path
                key={i}
                d={path}
                fill="none"
                stroke={scribbleColor}
                strokeWidth="5"
                strokeLinecap="round"
                opacity={0.5 + (i / scribbleFillPaths.length) * 0.3}
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200 - lineProgress * 200,
                  transition: isLastLine ? 'none' : 'stroke-dashoffset 0.1s ease',
                }}
              />
            );
          })}
        </g>
      </svg>

      {content}
    </div>
  );
}
