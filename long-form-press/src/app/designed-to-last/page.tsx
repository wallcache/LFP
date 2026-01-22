'use client';

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AnnotatedText, MarginNote, ScatteredNote } from "@/components/ui/Annotation";
import { MagneticImage } from "@/components/ui/MagneticImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function DesignedToLastPage() {
  return (
    <>
      {/* Hero with Hemingway kicking the can */}
      <section className="relative py-20 md:py-32 bg-[#1A1A1A] text-[#FAFAF8] overflow-visible">
        <ScatteredNote x="5%" y="15%" delay={200} color="light" random />
        <ScatteredNote x="88%" y="25%" delay={400} color="light" random />
        <div className="absolute inset-0 opacity-40">
          <MagneticImage
            src="/images/7af5fb8d48b36f26afd1e4edf19f8f9c.jpg"
            alt="Hemingway"
            fill
            containerClassName="absolute inset-0"
            strength={20}
            scale={1.05}
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.3em] uppercase text-[#8A8A8A] mb-6">
              Our Promise
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-8 relative">
              <AnnotatedText annotation="highlight" delay={100}>Designed</AnnotatedText> to <AnnotatedText annotation="circle" delay={300} color="#FAFAF8">Last</AnnotatedText>.
              <MarginNote side="right" delay={400} color="light" random />
            </h1>
            <p className="text-xl text-[#FAFAF8]/80 font-serif italic relative">
              Not for <AnnotatedText annotation="underline" delay={500} color="#FAFAF8">landfill</AnnotatedText>. For <AnnotatedText annotation="highlight" delay={600}>legacy</AnnotatedText>.
              <MarginNote side="left" delay={700} color="light" random />
            </p>
          </div>
        </Container>
      </section>

      {/* Main Philosophy */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <ScatteredNote x="3%" y="20%" delay={100} random />
        <ScatteredNote x="92%" y="40%" delay={500} random />
        <ScatteredNote x="8%" y="70%" delay={800} random />
        <Container>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-8 relative">
              <h2 className="font-serif text-3xl md:text-4xl mb-6 relative">
                <AnnotatedText annotation="circle" delay={100}>Recyclable</AnnotatedText>, Not <AnnotatedText annotation="highlight" delay={200}>Disposable</AnnotatedText>
                <MarginNote side="right" delay={300} random />
              </h2>

              <p className="text-lg leading-relaxed text-[#4A4A4A] relative">
                Every product we make is designed with its <AnnotatedText annotation="highlight" delay={350}>end of life</AnnotatedText> in mind.
                Our inks are <AnnotatedText annotation="circle" delay={400}>soy-based</AnnotatedText>. Our papers are <AnnotatedText annotation="underline" delay={450}>FSC-certified</AnnotatedText>.
                Our packaging is <AnnotatedText annotation="highlight" delay={500}>100% recyclable</AnnotatedText>.
                <MarginNote side="left" delay={550} random />
              </p>

              <p className="text-lg leading-relaxed text-[#4A4A4A] relative">
                We don&apos;t believe in <AnnotatedText annotation="highlight" delay={600}>fast fashion</AnnotatedText> for books.
                Or <AnnotatedText annotation="circle" delay={650}>planned obsolescence</AnnotatedText> for readers.
                Our shirts are <AnnotatedText annotation="underline" delay={700}>organic cotton</AnnotatedText>.
                Our prints are <AnnotatedText annotation="highlight" delay={750}>archival quality</AnnotatedText>.
                <MarginNote side="right" delay={800} random />
              </p>

              <p className="font-serif text-xl italic text-[#2D4A3E] relative">
                Because if the books have lasted <AnnotatedText annotation="highlight" delay={850}>centuries</AnnotatedText>,
                shouldn&apos;t the <AnnotatedText annotation="circle" delay={900} color="#2D4A3E">merchandise</AnnotatedText> last a <AnnotatedText annotation="underline" delay={950} color="#2D4A3E">decade</AnnotatedText>?
                <MarginNote side="right" delay={1000} random />
              </p>
            </div>

            <div className="relative aspect-[4/5] bg-[#F5F5F0] rounded-lg overflow-hidden">
              <MagneticImage
                src="/images/df66b392638924a895cd0c1c78ebdbb2.jpg"
                alt="Sustainable reading"
                fill
                containerClassName="absolute inset-0"
                strength={25}
                scale={1.06}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* The Numbers */}
      <section className="py-20 md:py-32 bg-[#F5F5F0] relative overflow-visible">
        <ScatteredNote x="5%" y="10%" delay={200} random />
        <ScatteredNote x="90%" y="30%" delay={600} random />
        <ScatteredNote x="8%" y="80%" delay={900} random />
        <Container>
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center relative">
            The <AnnotatedText annotation="highlight" delay={100}>Hard</AnnotatedText> Numbers
            <MarginNote side="right" delay={200} random />
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center relative">
              <p className="font-serif text-5xl md:text-6xl text-[#2D4A3E] mb-4">0</p>
              <p className="text-lg text-[#4A4A4A] relative">
                <AnnotatedText annotation="circle" delay={300}>Plastic</AnnotatedText> in our packaging
                <MarginNote side="right" delay={400} random />
              </p>
            </div>

            <div className="text-center relative">
              <p className="font-serif text-5xl md:text-6xl text-[#2D4A3E] mb-4">100%</p>
              <p className="text-lg text-[#4A4A4A] relative">
                <AnnotatedText annotation="highlight" delay={450}>Recyclable</AnnotatedText> materials
                <MarginNote side="left" delay={550} random />
              </p>
            </div>

            <div className="text-center relative">
              <p className="font-serif text-5xl md:text-6xl text-[#2D4A3E] mb-4">10+</p>
              <p className="text-lg text-[#4A4A4A] relative">
                Year <AnnotatedText annotation="underline" delay={600}>lifespan</AnnotatedText> guarantee
                <MarginNote side="right" delay={700} random />
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Materials Deep Dive */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <ScatteredNote x="4%" y="15%" delay={100} random />
        <ScatteredNote x="93%" y="50%" delay={700} random />
        <Container>
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center relative">
            What We&apos;re <AnnotatedText annotation="highlight" delay={100}>Made Of</AnnotatedText>
            <MarginNote side="right" delay={200} random />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="p-8 bg-[#F5F5F0] rounded-lg relative">
              <h3 className="font-serif text-xl mb-4 relative">
                <AnnotatedText annotation="circle" delay={250}>Prints & Posters</AnnotatedText>
              </h3>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="highlight" delay={300}>FSC-certified</AnnotatedText> paper</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span>Soy-based inks</span>
                </li>
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="underline" delay={400}>Archival</AnnotatedText> quality (100+ years)</span>
                  <MarginNote side="right" delay={450} random />
                </li>
              </ul>
            </div>

            <div className="p-8 bg-[#F5F5F0] rounded-lg relative">
              <h3 className="font-serif text-xl mb-4 relative">
                <AnnotatedText annotation="circle" delay={350}>T-Shirts</AnnotatedText>
              </h3>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="highlight" delay={450}>100% organic</AnnotatedText> cotton</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span>GOTS certified</span>
                </li>
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="underline" delay={550}>Water-based</AnnotatedText> prints</span>
                  <MarginNote side="left" delay={600} random />
                </li>
              </ul>
            </div>

            <div className="p-8 bg-[#F5F5F0] rounded-lg relative">
              <h3 className="font-serif text-xl mb-4 relative">
                <AnnotatedText annotation="circle" delay={500}>Bookmarks</AnnotatedText>
              </h3>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="highlight" delay={600}>Recycled</AnnotatedText> cardstock</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span>Compostable laminate</span>
                </li>
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="underline" delay={700}>Vegetable</AnnotatedText> dyes</span>
                  <MarginNote side="right" delay={750} random />
                </li>
              </ul>
            </div>

            <div className="p-8 bg-[#F5F5F0] rounded-lg relative">
              <h3 className="font-serif text-xl mb-4 relative">
                <AnnotatedText annotation="circle" delay={650}>Packaging</AnnotatedText>
              </h3>
              <ul className="space-y-3 text-[#4A4A4A]">
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="highlight" delay={750}>Recycled</AnnotatedText> cardboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span>Paper tape (no plastic)</span>
                </li>
                <li className="flex items-start gap-3 relative">
                  <span className="text-[#2D4A3E]">&#10003;</span>
                  <span><AnnotatedText annotation="underline" delay={850}>Seed paper</AnnotatedText> inserts</span>
                  <MarginNote side="left" delay={900} random />
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Band */}
      <section className="relative py-16 bg-[#2D4A3E] text-[#FAFAF8] overflow-visible">
        <ScatteredNote x="10%" y="30%" delay={200} color="light" random />
        <ScatteredNote x="85%" y="50%" delay={500} color="light" random />
        <Container className="relative z-10">
          <blockquote className="text-center font-serif text-2xl md:text-4xl italic relative">
            &ldquo;The <AnnotatedText annotation="highlight" delay={200}>earth</AnnotatedText> provides enough to satisfy every man&apos;s <AnnotatedText annotation="circle" delay={400} color="#FAFAF8">needs</AnnotatedText>, but not every man&apos;s <AnnotatedText annotation="underline" delay={600} color="#FAFAF8">greed</AnnotatedText>.&rdquo;
            <MarginNote side="right" delay={700} color="light" random />
          </blockquote>
          <p className="text-center text-[#FAFAF8]/60 mt-4 text-sm tracking-[0.2em] uppercase">
            &#8212; Mahatma Gandhi
          </p>
        </Container>
      </section>

      {/* The Promise */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <ScatteredNote x="6%" y="25%" delay={300} random />
        <ScatteredNote x="90%" y="60%" delay={700} random />
        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="font-serif text-3xl md:text-4xl mb-8 relative">
              Our <AnnotatedText annotation="highlight" delay={100}>Promise</AnnotatedText>
              <MarginNote side="right" delay={200} random />
            </h2>

            <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8 relative">
              Every Long Form Press product is designed to be <AnnotatedText annotation="highlight" delay={300}>cherished</AnnotatedText>,
              not <AnnotatedText annotation="circle" delay={400}>discarded</AnnotatedText>. When you do eventually part with it,
              it should return to the <AnnotatedText annotation="underline" delay={500}>earth</AnnotatedText> as gracefully as it arrived.
              <MarginNote side="left" delay={600} random />
            </p>

            <p className="font-serif text-xl italic text-[#2D4A3E] mb-12 relative">
              <AnnotatedText annotation="highlight" delay={700}>Read forever</AnnotatedText>. <AnnotatedText annotation="circle" delay={800} color="#2D4A3E">Waste never</AnnotatedText>.
              <MarginNote side="right" delay={900} random />
            </p>

            <MagneticButton
              href="/shop"
              variant="dark"
              className="border border-[#1A1A1A] px-8 py-4 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#FAFAF8]"
            >
              Shop Sustainably
            </MagneticButton>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-[#FAFAF8] relative overflow-visible">
        <ScatteredNote x="8%" y="30%" delay={100} color="light" random />
        <ScatteredNote x="88%" y="50%" delay={400} color="light" random />
        <Container>
          <div className="max-w-2xl mx-auto text-center relative">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 relative inline-block">
              <AnnotatedText annotation="circle" delay={200} color="#FAFAF8">Think Long Term</AnnotatedText>.
              <MarginNote side="right" delay={300} color="light" random />
            </h2>
            <p className="text-[#FAFAF8]/70 mb-8 relative">
              Like <AnnotatedText annotation="highlight" delay={350}>literature</AnnotatedText> itself, we&apos;re in it for the <AnnotatedText annotation="underline" delay={450} color="#FAFAF8">long form</AnnotatedText>.
              <MarginNote side="left" delay={500} color="light" random />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                href="/shop"
                variant="light"
                className="bg-[#FAFAF8] text-[#1A1A1A] px-8 py-4 text-sm tracking-wide"
              >
                Explore the Collection
              </MagneticButton>
              <MagneticButton
                href="/about"
                variant="dark"
                className="border border-[#FAFAF8] text-[#FAFAF8] px-8 py-4 text-sm tracking-wide hover:bg-[#FAFAF8] hover:text-[#1A1A1A]"
              >
                About Us
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
