'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from './Container';
import { useCart } from '@/context/CartContext';
import { FlipText } from '@/components/ui/FlipText';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Shop', href: '/shop', annotation: 'underline' as const },
  { name: 'About', href: '/about', annotation: 'circle' as const },
];

// Random marginalia comments for nav hover
const marginalia = [
  'yes!', 'this.', 'ooh', '!!!', 'go!', 'nice', 'wow', 'yep', 'true', 'same',
  'click!', 'here', 'look', 'good', 'love', 'want', 'need', 'now', 'yes', 'do it'
];

// Nav annotation effect with draw-out then draw-in animation
function NavAnnotation({ show, type }: { show: boolean; type: 'underline' | 'circle' }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'draw-in' | 'draw-out' | 'idle'>('idle');
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const wasShowing = useRef(false);

  const startDrawIn = useCallback(() => {
    if (animationRef.current) clearInterval(animationRef.current);
    setPhase('draw-in');
    let p = 0;
    animationRef.current = setInterval(() => {
      p += 0.06;
      setProgress(Math.min(1, p));
      if (p >= 1) {
        if (animationRef.current) clearInterval(animationRef.current);
        setPhase('idle');
      }
    }, 16);
  }, []);

  useEffect(() => {
    if (show && !wasShowing.current) {
      // Mouse entered - start draw-in
      startDrawIn();
    } else if (!show && wasShowing.current && phase !== 'draw-out') {
      // Mouse left - start draw-out then draw-in
      if (animationRef.current) clearInterval(animationRef.current);
      setPhase('draw-out');
      let p = 0;
      animationRef.current = setInterval(() => {
        p += 0.08;
        setProgress(Math.min(1, p));
        if (p >= 1) {
          if (animationRef.current) clearInterval(animationRef.current);
          // After draw-out, start draw-in
          setTimeout(() => startDrawIn(), 30);
        }
      }, 16);
    }
    wasShowing.current = show;

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [show, phase, startDrawIn]);

  // Calculate offset
  const getOffset = (dashLength: number) => {
    if (phase === 'idle') return 0;
    if (phase === 'draw-in') return dashLength - progress * dashLength;
    return -progress * dashLength; // draw-out
  };

  if (phase === 'idle' && progress === 0) return null;

  if (type === 'circle') {
    return (
      <svg
        className="absolute -inset-1 pointer-events-none"
        style={{ width: 'calc(100% + 8px)', height: 'calc(100% + 12px)', left: '-4px', top: '-6px' }}
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="25"
          rx="47"
          ry="20"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={getOffset(200)}
          transform="rotate(-2 50 25)"
        />
      </svg>
    );
  }

  return (
    <svg
      className="absolute left-0 -bottom-1 w-full h-2 pointer-events-none"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <path
        d="M0,5 Q30,2 50,5 T100,4"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={getOffset(120)}
      />
    </svg>
  );
}

function NavMarginNote({ show }: { show: boolean }) {
  const [note] = useState(() => marginalia[Math.floor(Math.random() * marginalia.length)]);
  const [angle] = useState(() => Math.floor(Math.random() * 21) - 10);
  const [offsetY] = useState(() => Math.floor(Math.random() * 20) - 10);

  if (!show) return null;

  return (
    <span
      className="absolute left-full ml-2 text-[#3B78C6] whitespace-nowrap pointer-events-none hidden lg:block"
      style={{
        fontFamily: 'Handwriting, cursive',
        fontSize: '1.2rem',
        transform: `rotate(${angle}deg)`,
        top: `${offsetY}px`,
        opacity: 0.9,
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {note}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [cartHovered, setCartHovered] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-5px) rotate(var(--angle, 0deg)); }
          to { opacity: 0.9; transform: translateX(0) rotate(var(--angle, 0deg)); }
        }
      `}</style>
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative inline-block font-serif text-lg md:text-xl text-[#3B78C6] tracking-tight transition-all duration-300 hover:opacity-70 hover:scale-[1.02]"
          >
            Long Form Press
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'nav-link-flip text-sm tracking-wide py-2 px-1 relative',
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-[#1A1A1A]'
                    : 'text-[#8A8A8A] hover:text-[#1A1A1A]'
                )}
                onMouseEnter={() => setHoveredNav(item.name)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <FlipText>{item.name}</FlipText>
                <NavAnnotation show={hoveredNav === item.name} type={item.annotation} />
                <NavMarginNote show={hoveredNav === item.name} />
              </Link>
            ))}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="nav-link-flip relative flex items-center gap-2 text-sm tracking-wide text-[#8A8A8A] hover:text-[#1A1A1A] py-2 px-1"
              aria-label={`Cart with ${totalQuantity} items`}
              onMouseEnter={() => setCartHovered(true)}
              onMouseLeave={() => setCartHovered(false)}
            >
              <FlipText>Cart</FlipText>
              {totalQuantity > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3B78C6] text-xs text-[#FAFAF8] transition-transform hover:scale-110">
                  {totalQuantity}
                </span>
              )}
              <NavAnnotation show={cartHovered} type="underline" />
              <NavMarginNote show={cartHovered} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Subtle border */}
      <div className="h-px bg-[#1A1A1A]/5" />
    </header>
  );
}
