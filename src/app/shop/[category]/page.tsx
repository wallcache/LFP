'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { getProductsByCategory } from "@/lib/placeholder-data";
import { AnnotatedText, MarginNote, ScatteredNote } from "@/components/ui/Annotation";
import { MagneticImage } from "@/components/ui/MagneticImage";

// Category-specific content
const categoryContent: Record<string, {
  title: string;
  titleAnnotation: 'highlight' | 'circle' | 'underline';
  description: string;
  heroImage: string;
  marginNotes: string[];
  scatteredNotes: string[];
  bottomQuote: string;
}> = {
  prints: {
    title: 'Prints',
    titleAnnotation: 'highlight',
    description: 'Museum-quality archival prints for walls that deserve literature. Typography that speaks to the reader who stayed.',
    heroImage: '/images/df66b392638924a895cd0c1c78ebdbb2.jpg',
    marginNotes: ['yes!', 'want', 'need'],
    scatteredNotes: ['art!', 'walls', 'perfect', 'love'],
    bottomQuote: 'Your walls should read as well as you do.',
  },
  bookmarks: {
    title: 'Bookmarks',
    titleAnnotation: 'circle',
    description: 'Because dog-earing is a crime. Mark your place with intention, with objects worthy of the pages they hold.',
    heroImage: '/images/41e893d89a5edab55a6cf30298981869.jpg',
    marginNotes: ['finally!', 'this', 'same'],
    scatteredNotes: ['mark', 'place', 'hold', 'yes!'],
    bottomQuote: 'The bookmark is the reader\'s most faithful companion.',
  },
  't-shirts': {
    title: 'T-Shirts',
    titleAnnotation: 'highlight',
    description: 'Wear your reading on your sleeve. Literary declarations for those who believe reading is rebellion.',
    heroImage: '/images/49b59d5866a63a2fe0bb03ea05ce649d.jpg',
    marginNotes: ['wear it', 'bold', 'yes'],
    scatteredNotes: ['style', 'read', 'wear', 'bold!'],
    bottomQuote: 'Read the book. Wear the shirt. Be insufferable.',
  },
  books: {
    title: 'Books',
    titleAnnotation: 'underline',
    description: 'Curated editions for the discerning reader. Not just any books—the books that changed everything.',
    heroImage: '/images/05224f277ba3667270902b448b936b64.jpg',
    marginNotes: ['curated', 'rare', 'essential'],
    scatteredNotes: ['read', 'pages', 'words', 'more!'],
    bottomQuote: 'Some books are meant to be owned, not borrowed.',
  },
};

const validCategories = ['prints', 'bookmarks', 't-shirts', 'books'];

export default function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = use(params);

  if (!validCategories.includes(category)) {
    notFound();
  }

  const products = getProductsByCategory(category);
  const content = categoryContent[category];

  return (
    <>
      {/* Hero with image */}
      <section className="relative py-16 md:py-24 bg-[#1A1A1A] text-[#FAFAF8] overflow-visible">
        <ScatteredNote x="85%" y="15%" delay={300} color="light">{content.scatteredNotes[0]}</ScatteredNote>
        <ScatteredNote x="5%" y="25%" delay={500} color="light">{content.scatteredNotes[1]}</ScatteredNote>
        <ScatteredNote x="90%" y="60%" delay={700} color="light">{content.scatteredNotes[2]}</ScatteredNote>
        <ScatteredNote x="8%" y="70%" delay={900} color="light">{content.scatteredNotes[3]}</ScatteredNote>
        <div className="absolute inset-0 opacity-40">
          <MagneticImage
            src={content.heroImage}
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
              <AnnotatedText annotation={content.titleAnnotation} delay={100} color="#FAFAF8">{content.title}</AnnotatedText>
              <MarginNote side="right" delay={200} color="light">{content.marginNotes[0]}</MarginNote>
            </h1>
            <p className="text-[#FAFAF8]/80 text-lg relative">
              {content.description}
              <MarginNote side="left" delay={350} color="light">{content.marginNotes[1]}</MarginNote>
              <MarginNote side="right" delay={450} color="light">{content.marginNotes[2]}</MarginNote>
            </p>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20 relative overflow-visible">
        <ScatteredNote x="3%" y="5%" delay={100}>browse</ScatteredNote>
        <ScatteredNote x="92%" y="20%" delay={400}>need</ScatteredNote>
        <ScatteredNote x="5%" y="50%" delay={600}>want!</ScatteredNote>
        <ScatteredNote x="90%" y="70%" delay={800}>yes</ScatteredNote>
        <Container>
          {/* Filters */}
          <div className="mb-12">
            <CategoryFilter />
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-[#4A4A4A] mb-4">Coming Soon</p>
              <p className="text-[#8A8A8A]">We&apos;re curating this collection. Check back soon.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t border-[#1A1A1A]/10 text-center relative">
            <p className="font-serif text-xl text-[#4A4A4A] italic relative">
              &ldquo;<AnnotatedText annotation="highlight" delay={200}>{content.bottomQuote}</AnnotatedText>&rdquo;
              <MarginNote side="right" delay={500}>truth</MarginNote>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
