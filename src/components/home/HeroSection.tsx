'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { MagneticImage } from '@/components/ui/MagneticImage';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnnotatedText, MarginNote, ScatteredNote, HandwrittenStar } from '@/components/ui/Annotation';

// Declare global type for TypeScript
declare global {
  interface Window {
    __loaderPlayed: boolean;
    __loaderDecided: boolean;
  }
}

export function HeroSection() {
  // Read loaderPlayed synchronously during initial render
  // The flag is set by InitialLoader module before any React components render
  const [loaderPlayed] = useState(() => {
    if (typeof window === 'undefined') return false;
    const played = window.__loaderPlayed === true;
    console.log('[HeroSection] Loader played:', played);
    return played;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Base delay is 0 if no loader, 2000ms if loader played
  const baseDelay = loaderPlayed ? 2000 : 0;
  console.log('[HeroSection] Base delay:', baseDelay);

  return (
    <section className="relative bg-[#FAFAF8] overflow-visible">
      {/* Scattered marginalia */}
      <ScatteredNote x="92%" y="20%" delay={baseDelay + 200} random />
      <ScatteredNote x="88%" y="45%" delay={baseDelay + 400} random />
      <ScatteredNote x="4%" y="75%" delay={baseDelay + 300} random />

      <Container className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[85vh] py-16 md:py-0">
          {/* Left - Text Content */}
          <div className="relative order-2 md:order-1">
            <p
              className={`text-sm tracking-[0.3em] uppercase text-[#8A8A8A] mb-6 transition-all duration-700 relative ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${baseDelay + 200}ms` }}
            >
              <AnnotatedText annotation="underline" delay={baseDelay}>Long Form Press</AnnotatedText>
              <HandwrittenStar x="105%" y="-20%" delay={baseDelay + 100} size="md" />
            </p>

            <h1
              className={`font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 transition-all duration-700 text-[#1A1A1A] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${baseDelay + 400}ms` }}
            >
              <span className="block overflow-visible relative">
                <span className={`block transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: `${baseDelay + 500}ms` }}>
                  <AnnotatedText annotation="highlight" delay={baseDelay - 200}>Long Live</AnnotatedText>
                  <MarginNote side="right" delay={baseDelay - 100} random />
                </span>
              </span>
              <span className="block overflow-visible relative">
                <span className={`block transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: `${baseDelay + 650}ms` }}>
                  the <AnnotatedText annotation="circle" delay={baseDelay}>Long Form</AnnotatedText>.
                  <MarginNote side="right" delay={baseDelay + 100} random />
                </span>
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl lg:text-2xl text-[#4A4A4A] font-serif italic mb-10 max-w-md transition-all duration-700 relative ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${baseDelay + 800}ms` }}
            >
              Literary goods for people who&apos;ve <AnnotatedText annotation="highlight" delay={baseDelay + 200}>actually read</AnnotatedText> the <AnnotatedText annotation="circle" delay={baseDelay + 400}>book</AnnotatedText>.
              <MarginNote side="right" delay={baseDelay + 500} random />
            </p>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${baseDelay + 1000}ms` }}
            >
              <MagneticButton
                href="/shop"
                variant="dark"
                className="bg-[#1A1A1A] text-[#FAFAF8] px-8 py-4 text-sm tracking-wide"
              >
                Shop Collection
              </MagneticButton>
              <MagneticButton
                href="/about"
                variant="dark"
                className="border border-[#1A1A1A]/40 text-[#1A1A1A] px-8 py-4 text-sm tracking-wide hover:border-[#1A1A1A]"
              >
                Our Story
              </MagneticButton>
            </div>
          </div>

          {/* Right - Image */}
          <div
            className={`relative order-1 md:order-2 transition-all duration-1000 flex justify-center md:justify-end ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: `${baseDelay + 300}ms` }}
          >
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px] aspect-[3/4] rounded-lg overflow-hidden">
              <MagneticImage
                src="/images/49b59d5866a63a2fe0bb03ea05ce649d.jpg"
                alt="Reading by the sea"
                fill
                containerClassName="absolute inset-0"
                strength={25}
                scale={1.06}
                priority
              />
            </div>
            <ScatteredNote x="85%" y="15%" delay={baseDelay + 600} random />
            <ScatteredNote x="90%" y="80%" delay={baseDelay + 800} random />
          </div>
        </div>
      </Container>
    </section>
  );
}
