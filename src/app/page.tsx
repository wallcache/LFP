'use client';

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { getFeaturedProducts, categories } from "@/lib/placeholder-data";
import { HeroSection } from "@/components/home/HeroSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { AnimateWords } from "@/components/ui/AnimateWords";
import { MagneticImage } from "@/components/ui/MagneticImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnnotatedText, MarginNote, ScatteredNote } from "@/components/ui/Annotation";

const categoryImages: Record<string, string> = {
  prints: "/site_photos/fictionordeath.jpg",
  books: "/site_photos/book_MODBDYSID.jpg",
};

export default function Home() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <>
      <HeroSection />

      {/* Tagline Band */}
      <section className="bg-[#3B78C6] text-[#FAFAF8] py-6 relative overflow-visible">
        <Container>
          <p className="text-center font-serif text-lg md:text-xl italic relative">
            &ldquo;The Long Read, The <AnnotatedText annotation="circle" delay={1300} color="#FAFAF8">Short</AnnotatedText> Life.&rdquo;
            <MarginNote side="right" delay={1500} color="light" random />
          </p>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="flex items-end justify-between mb-12">
              <div>
                <AnimateWords as="h2" className="font-serif text-3xl md:text-4xl mb-2">
                  The Collection
                </AnimateWords>
                <AnimateWords className="text-[#8A8A8A]" delay={200}>
                  Literary goods for the discerning reader.
                </AnimateWords>
              </div>
              <Link
                href="/shop"
                className="hidden md:block text-sm text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors nav-link py-1"
              >
                View All
              </Link>
            </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 stagger-children">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <MagneticButton
              href="/shop"
              variant="dark"
              className="border border-[#1A1A1A] px-8 py-3 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#FAFAF8]"
            >
              View All Products
            </MagneticButton>
          </div>
        </Container>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 md:py-32 bg-[#F5F5F0] relative overflow-visible">
        <ScatteredNote x="5%" y="15%" delay={200} random />
        <ScatteredNote x="92%" y="45%" delay={700} random />
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg">
                <MagneticImage
                  src="/images/df66b392638924a895cd0c1c78ebdbb2.jpg"
                  alt="Reading"
                  fill
                  containerClassName="absolute inset-0"
                  strength={25}
                  scale={1.06}
                />
              </div>
            <div className="relative">
                <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight relative">
                  The <AnnotatedText annotation="circle" delay={100}>Revolution</AnnotatedText> Will Be <AnnotatedText annotation="highlight" delay={300}>Well-Read</AnnotatedText>.
                  <MarginNote side="right" delay={400} random />
                  <MarginNote side="left" delay={500} random />
                </h2>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8 relative">
                  We make stuff for readers who <AnnotatedText annotation="highlight" delay={400}>finish the book</AnnotatedText>. Who&apos;ve argued about <AnnotatedText annotation="underline" delay={500}>translations</AnnotatedText>. Who have <AnnotatedText annotation="circle" delay={600}>Opinions</AnnotatedText> about adaptations. Who are, frankly, <AnnotatedText annotation="highlight" delay={650}>a bit much</AnnotatedText> at dinner parties.
                  <MarginNote side="left" delay={700} random />
                </p>
                <p className="text-lg italic text-[#3B78C6] relative">
                  Yes, we&apos;re <AnnotatedText annotation="circle" delay={750} color="#3B78C6">pretentious</AnnotatedText>. But we&apos;ve <AnnotatedText annotation="highlight" delay={800}>earned it</AnnotatedText>. And if you&apos;re here, so have you.
                  <MarginNote side="right" delay={850} random />
                </p>
              </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-32">
        <Container>
          <AnimateWords as="h2" className="font-serif text-3xl md:text-4xl mb-12 text-center">
              Shop by Category
            </AnimateWords>

          <div className="grid grid-cols-2 gap-4 md:gap-6 stagger-children max-w-3xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.handle}
                href={`/shop?category=${category.handle}`}
                className="group relative aspect-[4/5] bg-[#1A1A1A] overflow-hidden card-glow rounded-lg"
              >
                {categoryImages[category.handle] && (
                  <MagneticImage
                    src={categoryImages[category.handle]}
                    alt={category.title}
                    fill
                    containerClassName="absolute inset-0"
                    className="opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                    strength={20}
                    scale={1.1}
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#FAFAF8] p-6 text-center z-10">
                  <h3 className="font-serif text-2xl mb-2 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[#FAFAF8]/70 transition-all duration-500 group-hover:opacity-100 opacity-70">
                    {category.description}
                  </p>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-32 bg-[#3B78C6] text-[#FAFAF8] relative overflow-visible">
        <ScatteredNote x="8%" y="25%" delay={300} color="light" random />
        <ScatteredNote x="88%" y="60%" delay={600} color="light" random />
        <div className="absolute inset-0 opacity-20">
          <MagneticImage
            src="/images/05224f277ba3667270902b448b936b64.jpg"
            alt=""
            fill
            containerClassName="absolute inset-0"
            strength={15}
            scale={1.04}
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center relative">
            <blockquote className="font-serif text-3xl md:text-5xl leading-tight mb-8 relative">
              Give Me <AnnotatedText annotation="highlight" delay={200}>Fiction</AnnotatedText> or Give Me <AnnotatedText annotation="circle" delay={400} color="#FAFAF8">Death</AnnotatedText>.
              <MarginNote side="right" delay={500} color="light" random />
              <MarginNote side="left" delay={600} color="light" random />
            </blockquote>
            <p className="text-sm tracking-[0.2em] uppercase text-[#FAFAF8]/60 relative">
              <AnnotatedText annotation="underline" delay={600} color="#FAFAF8">Pretension, Earned.</AnnotatedText>
            </p>
          </div>
        </Container>
      </section>

      {/* Tote Bag Banner */}
      <section className="py-12 border-y border-[#1A1A1A]/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="text-2xl">&#9830;</span>
            <p className="font-serif text-lg">
              Complimentary tote bag with every order
            </p>
            <span className="text-2xl">&#9830;</span>
          </div>
        </Container>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <ScatteredNote x="4%" y="40%" delay={400} random />
        <ScatteredNote x="93%" y="20%" delay={200} random />
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
                <p className="text-sm tracking-[0.2em] uppercase text-[#8A8A8A] mb-4">
                  About Long Form Press
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight relative">
                  For People Who <AnnotatedText annotation="highlight" delay={100}>Reread</AnnotatedText>.
                  <MarginNote side="right" delay={200} random />
                </h2>
                <p className="text-[#4A4A4A] leading-relaxed mb-6 relative">
                  Long Form Press exists because we got tired of <AnnotatedText annotation="highlight" delay={250}>book merch</AnnotatedText> designed by people who think <AnnotatedText annotation="circle" delay={300}>classic literature</AnnotatedText> means The Notebook.
                  <MarginNote side="left" delay={350} random />
                </p>
                <p className="text-[#4A4A4A] leading-relaxed mb-8 relative">
                  We&apos;re for the <AnnotatedText annotation="underline" delay={400}>reader who stayed</AnnotatedText>. The one who turned <AnnotatedText annotation="highlight" delay={450}>every page</AnnotatedText>. The world-weary reader—tired of the algorithm, allergic to <AnnotatedText annotation="circle" delay={500}>mediocrity</AnnotatedText>, still obsessed with <AnnotatedText annotation="highlight" delay={550}>meaning</AnnotatedText>.
                  <MarginNote side="right" delay={600} random />
                </p>
                <MagneticButton
                  href="/about"
                  variant="dark"
                  className="border border-[#1A1A1A] px-8 py-3 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#FAFAF8]"
                >
                  Read More
                </MagneticButton>
              </div>
            <div className="relative aspect-[4/5] bg-[#F5F5F0] overflow-hidden rounded-lg">
                <MagneticImage
                  src="/images/41e893d89a5edab55a6cf30298981869.jpg"
                  alt="Penguin Classics collection"
                  fill
                  containerClassName="absolute inset-0"
                  strength={25}
                  scale={1.06}
                />
              </div>
          </div>
        </Container>
      </section>

      {/* Reading by the sea */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-visible">
        <ScatteredNote x="85%" y="20%" delay={400} color="light" random />
        <MagneticImage
          src="/images/3983085ffeb3f02f92299ac2d4163612.jpg"
          alt="Reading by the sea"
          fill
          containerClassName="absolute inset-0"
          strength={30}
          scale={1.08}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10 h-full flex items-end pb-16">
          <div className="text-[#FAFAF8] relative">
            <p className="font-serif text-2xl md:text-4xl italic mb-2 relative">
              Because <AnnotatedText annotation="highlight" delay={200}>attention</AnnotatedText> is the <AnnotatedText annotation="circle" delay={400} color="#FAFAF8">rarest art</AnnotatedText>.
              <MarginNote side="right" delay={500} color="light" random />
            </p>
            <p className="text-sm text-[#FAFAF8]/60 relative">
              For the reader who <AnnotatedText annotation="underline" delay={600} color="#FAFAF8">stayed</AnnotatedText>.
            </p>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-[#FAFAF8] relative overflow-visible">
        {/* Floating glow orbs */}
        <div className="glow-orb w-64 h-64 top-10 -left-20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-32" style={{ animationDelay: '-3s' }} />
        <div className="glow-orb w-48 h-48 top-1/2 right-10" style={{ animationDelay: '-5s' }} />

        <ScatteredNote x="8%" y="30%" delay={200} color="light" random />
        <ScatteredNote x="88%" y="60%" delay={500} color="light" random />

        <Container className="relative z-10">
            <div className="max-w-xl mx-auto">
              <div className="glass-glow-dark p-8 md:p-12">
                <div className="text-center relative">
                  <h2 className="font-serif text-3xl md:text-4xl mb-4 relative">
                    Turn <AnnotatedText annotation="highlight" delay={100}>Pages</AnnotatedText>, And <AnnotatedText annotation="circle" delay={300} color="#FAFAF8">Heads</AnnotatedText>.
                    <MarginNote side="right" delay={400} color="light" random />
                  </h2>
                  <p className="text-[#FAFAF8]/70 mb-8 relative">
                    Join the <AnnotatedText annotation="highlight" delay={350}>literary defiance</AnnotatedText>. New drops, rare finds, and occasional <AnnotatedText annotation="underline" delay={450} color="#FAFAF8">manifestos</AnnotatedText>.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-3 bg-[#FAFAF8]/5 border border-[#FAFAF8]/20 rounded-lg text-[#FAFAF8] placeholder:text-[#FAFAF8]/50 focus:outline-none focus:border-[#3B78C6] focus:shadow-[0_0_20px_rgba(59,120,198,0.3)] transition-all"
                    />
                    <MagneticButton
                      type="submit"
                      variant="dark"
                      className="px-8 py-3 bg-[#3B78C6] text-[#FAFAF8] text-sm tracking-wide rounded-lg"
                    >
                      Subscribe
                    </MagneticButton>
                  </form>
                  <p className="mt-6 text-xs text-[#FAFAF8]/50 relative">
                    <AnnotatedText annotation="underline" delay={550} color="#FAFAF8">Read slowly</AnnotatedText> or die trying.
                  </p>
                </div>
              </div>
            </div>
        </Container>
      </section>
    </>
  );
}
