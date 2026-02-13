'use client';

import Link from 'next/link';
import { Container } from './Container';
import { FlipText } from '@/components/ui/FlipText';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#1A1A1A]/5 bg-[#FAFAF8]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row md:py-16">
          {/* Tagline */}
          <p className="text-lg text-[#4A4A4A]">
            Read slowly or die trying.
          </p>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/shop"
              className="nav-link-flip text-sm text-[#8A8A8A] transition-colors hover:text-[#1A1A1A]"
            >
              <FlipText>Shop</FlipText>
            </Link>
            <Link
              href="/about"
              className="nav-link-flip text-sm text-[#8A8A8A] transition-colors hover:text-[#1A1A1A]"
            >
              <FlipText>About</FlipText>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[#8A8A8A]">
            &copy; {currentYear} Long Form Press
          </p>
        </div>
      </Container>
    </footer>
  );
}
