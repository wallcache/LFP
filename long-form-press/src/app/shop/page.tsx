'use client';

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { placeholderProducts } from "@/lib/placeholder-data";
import { AnnotatedText, MarginNote, ScatteredNote } from "@/components/ui/Annotation";
import { MagneticImage } from "@/components/ui/MagneticImage";

export default function ShopPage() {
  return (
    <>
      {/* Hero with image */}
      <section className="relative py-16 md:py-24 bg-[#1A1A1A] text-[#FAFAF8] overflow-visible">
        <ScatteredNote x="85%" y="15%" delay={300} color="light">shop!</ScatteredNote>
        <ScatteredNote x="5%" y="25%" delay={500} color="light">ooh</ScatteredNote>
        <ScatteredNote x="90%" y="60%" delay={700} color="light">want</ScatteredNote>
        <ScatteredNote x="8%" y="70%" delay={900} color="light">yes</ScatteredNote>
        <div className="absolute inset-0 opacity-40">
          <MagneticImage
            src="/images/ab8e5b69c9b4bec3ad1812df6853e2c1.jpg"
            alt=""
            fill
            containerClassName="absolute inset-0"
            strength={20}
            scale={1.05}
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-2xl relative">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 relative">
              The <AnnotatedText annotation="highlight" delay={100}>Collection</AnnotatedText>
              <MarginNote side="right" delay={200} color="light">finally!</MarginNote>
            </h1>
            <p className="text-[#FAFAF8]/80 text-lg relative">
              Designed for readers who know that &ldquo;<AnnotatedText annotation="circle" delay={300} color="#FAFAF8">I love reading!</AnnotatedText>&rdquo; and
              &ldquo;<AnnotatedText annotation="highlight" delay={400}>I love literature</AnnotatedText>&rdquo; are not the <AnnotatedText annotation="underline" delay={500} color="#FAFAF8">same sentence</AnnotatedText>.
              <MarginNote side="left" delay={550} color="light">BIG difference</MarginNote>
              <MarginNote side="right" delay={650} color="light">this.</MarginNote>
            </p>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20 relative overflow-visible">
        <ScatteredNote x="3%" y="3%" delay={100}>browse</ScatteredNote>
        <ScatteredNote x="92%" y="15%" delay={400}>need</ScatteredNote>
        <ScatteredNote x="5%" y="35%" delay={600}>omg</ScatteredNote>
        <ScatteredNote x="90%" y="45%" delay={800}>want!</ScatteredNote>
        <ScatteredNote x="4%" y="60%" delay={1000}>love</ScatteredNote>
        <ScatteredNote x="93%" y="70%" delay={1200}>yep</ScatteredNote>
        <ScatteredNote x="6%" y="85%" delay={1400}>same</ScatteredNote>
        <Container>
          {/* Filters */}
          <div className="mb-12">
            <CategoryFilter />
          </div>

          {/* Grid */}
          <ProductGrid products={placeholderProducts} />

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t border-[#1A1A1A]/10 text-center relative">
            <p className="font-serif text-xl text-[#4A4A4A] italic relative">
              &ldquo;Read the book. <AnnotatedText annotation="highlight" delay={200}>Wear the shirt</AnnotatedText>. Be <AnnotatedText annotation="circle" delay={400}>insufferable</AnnotatedText>.&rdquo;
              <MarginNote side="right" delay={500}>goals</MarginNote>
              <MarginNote side="left" delay={600}>absolutely agree</MarginNote>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
