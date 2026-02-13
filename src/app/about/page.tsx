'use client';

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AnnotatedText, MarginNote, ScatteredNote, HandwrittenArrow, HandwrittenStar } from "@/components/ui/Annotation";
import { MagneticImage } from "@/components/ui/MagneticImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function AboutPage() {
  return (
    <>
      {/* Hero with Tolstoy image */}
      <section className="relative py-20 md:py-32 bg-[#1A1A1A] text-[#FAFAF8] overflow-visible">
        <ScatteredNote x="75%" y="20%" delay={400} color="light" random />
        <ScatteredNote x="80%" y="50%" delay={600} color="light" random />
        <ScatteredNote x="5%" y="60%" delay={800} color="light" random />
        <div className="absolute inset-0 opacity-30">
          <MagneticImage
            src="/images/05224f277ba3667270902b448b936b64.jpg"
            alt=""
            fill
            containerClassName="absolute inset-0"
            strength={20}
            scale={1.05}
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl relative">
            <p className="text-sm tracking-[0.3em] uppercase text-[#8A8A8A] mb-6 relative">
              <AnnotatedText annotation="underline" delay={200} color="#FAFAF8">About Us</AnnotatedText>
              <MarginNote side="right" delay={300} color="light" random />
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-8 text-[#3B78C6] relative">
              For the <AnnotatedText annotation="highlight" delay={400}>Reader</AnnotatedText><br />Who <AnnotatedText annotation="circle" delay={600} color="#3B78C6">Stayed</AnnotatedText>.
              <MarginNote side="right" delay={700} color="light" random />
            </h1>
            <p className="text-xl text-[#FAFAF8]/80 font-serif relative">
              <AnnotatedText annotation="highlight" delay={800}>Objects</AnnotatedText> for the <AnnotatedText annotation="circle" delay={1000} color="#FAFAF8">patient mind</AnnotatedText>.
              <MarginNote side="right" delay={1100} color="light" random />
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <ScatteredNote x="50%" y="50%" delay={500} random />
        <HandwrittenStar x="85%" y="25%" delay={500} size="lg" />
        <Container>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-8 relative">
              <p className="text-lg leading-relaxed text-[#4A4A4A] relative">
                Long Form Press exists because we got tired of <AnnotatedText annotation="highlight" delay={100}>book merch</AnnotatedText> designed
                by people who think <AnnotatedText annotation="circle" delay={200}>&ldquo;classic literature&rdquo;</AnnotatedText> means The Notebook.
                <MarginNote side="right" delay={500} random />
                <HandwrittenArrow x="-5%" y="50%" delay={600} direction="right" size="md" />
              </p>
              <p className="text-lg leading-relaxed text-[#4A4A4A] relative">
                We make stuff for readers who <AnnotatedText annotation="highlight" delay={300}>finish the book</AnnotatedText>. Who&apos;ve argued about
                <AnnotatedText annotation="underline" delay={400}> translations</AnnotatedText>. Who have <AnnotatedText annotation="circle" delay={600}>Opinions about adaptations</AnnotatedText>. Who are, frankly,
                <AnnotatedText annotation="highlight" delay={500}> a bit much</AnnotatedText> at dinner parties.
                <MarginNote side="right" delay={500} random />
              </p>
              <p className="text-lg leading-relaxed text-[#4A4A4A] relative">
                We&apos;re for the ones who <AnnotatedText annotation="highlight" delay={800}>stayed up too late</AnnotatedText>, turned <AnnotatedText annotation="circle" delay={850}>every page</AnnotatedText>, and never once skipped to the end.
                <MarginNote side="right" delay={500} random />
                <MarginNote side="right" delay={500} random />
              </p>
              <div className="pt-4 relative">
                <p className="font-serif text-2xl text-[#3B78C6] relative">
                  &ldquo;Because you didn&apos;t <AnnotatedText annotation="highlight" delay={950}>sparknotes</AnnotatedText> your way through <AnnotatedText annotation="underline" delay={1000} color="#3B78C6">Dostoevsky</AnnotatedText>.&rdquo;
                  <MarginNote side="right" delay={500} random />
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-[#F5F5F0] rounded-lg overflow-hidden">
              <MagneticImage
                src="/images/df66b392638924a895cd0c1c78ebdbb2.jpg"
                alt="Reading"
                fill
                containerClassName="absolute inset-0"
                strength={25}
                scale={1.06}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Full width image break */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <MagneticImage
          src="/images/1497935eab9f39466622f315f8630149.jpg"
          alt="Writer's desk by the sea"
          fill
          containerClassName="absolute inset-0"
          strength={20}
          scale={1.05}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/40 pointer-events-none" />
        <Container className="relative z-10 h-full flex items-center justify-center">
          <p className="font-serif text-3xl md:text-5xl text-[#FAFAF8] text-center">
            &ldquo;The Long Read, The Short Life.&rdquo;
          </p>
        </Container>
      </section>

      {/* Brand Values */}
      <section className="py-20 md:py-32 bg-[#F5F5F0] relative overflow-visible">
        <HandwrittenArrow x="8%" y="5%" delay={100} direction="down" size="lg" />
        <ScatteredNote x="50%" y="50%" delay={500} random />
        <Container>
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center relative">
            The <AnnotatedText annotation="highlight" delay={100}>Brand Archetype</AnnotatedText>
            <MarginNote side="right" delay={500} random />
          </h2>

          <div className="max-w-3xl mx-auto relative">
            <p className="text-center text-xl text-[#4A4A4A] mb-12 font-serif relative">
              The <AnnotatedText annotation="circle" delay={300}>Self-Aware Snob</AnnotatedText> Who&apos;s <AnnotatedText annotation="highlight" delay={400}>Actually Read The Books</AnnotatedText>
              <MarginNote side="right" delay={500} random />
              <HandwrittenArrow x="-8%" y="50%" delay={550} direction="left" size="lg" />
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* What we're not */}
              <div className="relative">
                <h3 className="font-serif text-xl mb-6 text-[#6B2D2D]"><AnnotatedText annotation="underline" delay={550} color="#6B2D2D">We&apos;re Not</AnnotatedText></h3>
                <ul className="space-y-4 text-[#4A4A4A]">
                  <li className="flex items-start gap-3 relative">
                    <span className="text-[#6B2D2D]">×</span>
                    <span>Earnest <AnnotatedText annotation="highlight" delay={600}>BookTok energy</AnnotatedText> (&ldquo;reading is my superpower!&rdquo;)</span>
                    <MarginNote side="right" delay={500} random />
                  </li>
                  <li className="flex items-start gap-3 relative">
                    <span className="text-[#6B2D2D]">×</span>
                    <span>Pretentious without substance (owns <AnnotatedText annotation="circle" delay={700}>Ulysses</AnnotatedText>, hasn&apos;t opened it)</span>
                    <MarginNote side="right" delay={500} random />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#6B2D2D]">×</span>
                    <span><AnnotatedText annotation="highlight" delay={800}>Gatekeeping snobs</AnnotatedText> (actively mean to casual readers)</span>
                  </li>
                </ul>
              </div>

              {/* What we are */}
              <div className="relative">
                <h3 className="font-serif text-xl mb-6 text-[#3B78C6] relative">
                  <AnnotatedText annotation="circle" delay={600} color="#3B78C6">We Are</AnnotatedText>
                  <HandwrittenArrow x="105%" y="20%" delay={700} direction="right" size="lg" />
                </h3>
                <ul className="space-y-4 text-[#4A4A4A]">
                  <li className="flex items-start gap-3 relative">
                    <span className="text-[#3B78C6]">✓</span>
                    <span><AnnotatedText annotation="highlight" delay={750}>Literate and proud</AnnotatedText>, but <AnnotatedText annotation="underline" delay={800}>aware it&apos;s a bit ridiculous</AnnotatedText></span>
                  </li>
                  <li className="flex items-start gap-3 relative">
                    <span className="text-[#3B78C6]">✓</span>
                    <span>Read the <AnnotatedText annotation="highlight" delay={850}>difficult books</AnnotatedText> <em>and</em> enjoyed them (mostly)</span>
                    <MarginNote side="right" delay={500} random />
                  </li>
                  <li className="flex items-start gap-3 relative">
                    <span className="text-[#3B78C6]">✓</span>
                    <span>Self-deprecating about being &ldquo;<AnnotatedText annotation="circle" delay={900}>that person</AnnotatedText>,&rdquo; but unapologetic about taste</span>
                    <MarginNote side="right" delay={500} random />
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center mt-12 font-serif text-lg text-[#4A4A4A] relative">
              The vibe: &ldquo;<AnnotatedText annotation="highlight" delay={1000}>Yes, I&apos;m annoying.</AnnotatedText> <AnnotatedText annotation="underline" delay={1050}>Yes, I&apos;m right.</AnnotatedText>&rdquo;
              <MarginNote side="right" delay={500} random />
            </p>
          </div>
        </Container>
      </section>

      {/* Philosophy with image */}
      <section className="py-20 md:py-32 relative overflow-visible">
        <HandwrittenStar x="3%" y="30%" delay={300} size="md" />
        <HandwrittenArrow x="95%" y="65%" delay={900} direction="up" size="sm" />
        <ScatteredNote x="50%" y="50%" delay={500} random />
        <Container>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative aspect-square md:aspect-[4/5] order-2 md:order-1 rounded-lg overflow-hidden">
              <MagneticImage
                src="/images/d074f7fd4b72671e73abae789d48d926.jpg"
                alt="Books by the window"
                fill
                containerClassName="absolute inset-0"
                strength={25}
                scale={1.06}
              />
            </div>
            <div className="order-1 md:order-2 relative">
              <h2 className="font-serif text-3xl md:text-4xl mb-8 relative">
                Our <AnnotatedText annotation="highlight" delay={100}>Philosophy</AnnotatedText>
                <MarginNote side="right" delay={500} random />
                <HandwrittenStar x="-8%" y="0%" delay={250} size="sm" />
              </h2>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8 relative">
                You read for <AnnotatedText annotation="highlight" delay={300}>pleasure</AnnotatedText> but <AnnotatedText annotation="underline" delay={400}>annotate for sport</AnnotatedText>.
                You&apos;re the <AnnotatedText annotation="circle" delay={500}>world-weary reader</AnnotatedText>—tired of the algorithm,
                allergic to <AnnotatedText annotation="highlight" delay={550}>mediocrity</AnnotatedText>, still <AnnotatedText annotation="circle" delay={600}>obsessed with meaning</AnnotatedText>.
                <MarginNote side="right" delay={500} random />
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-12 relative">
                We believe in <AnnotatedText annotation="highlight" delay={700}>punching up, never down</AnnotatedText>. Mock the person who brags
                about <AnnotatedText annotation="underline" delay={750}>not reading</AnnotatedText>. Mock the &ldquo;<AnnotatedText annotation="circle" delay={800}>I only read nonfiction</AnnotatedText>&rdquo; guy.
                Mock yourself for being <AnnotatedText annotation="highlight" delay={850}>precious about first editions</AnnotatedText>.
                <MarginNote side="right" delay={500} random />
                <MarginNote side="right" delay={500} random />
              </p>
              <p className="font-serif text-xl text-[#3B78C6] relative">
                But <AnnotatedText annotation="underline" delay={950} color="#3B78C6">never sneer</AnnotatedText> at someone reading their <AnnotatedText annotation="highlight" delay={980}>first classic</AnnotatedText>.
                The joke is always &ldquo;we&apos;re ridiculous, but <AnnotatedText annotation="circle" delay={1000} color="#3B78C6">the books are actually good</AnnotatedText>.&rdquo;
                <MarginNote side="right" delay={500} random />
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Band with Hemingway */}
      <section className="relative py-16 bg-[#3B78C6] text-[#FAFAF8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/7af5fb8d48b36f26afd1e4edf19f8f9c.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10">
          <blockquote className="text-center font-serif text-2xl md:text-4xl">
            &ldquo;Because attention is the rarest art.&rdquo;
          </blockquote>
        </Container>
      </section>

      {/* Collections Preview */}
      <section className="py-20 md:py-32">
        <Container>
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
            The Collections
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/49b59d5866a63a2fe0bb03ea05ce649d.jpg"
                alt="Volume I"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FAFAF8]">
                <h3 className="font-serif text-xl mb-2">Volume I</h3>
                <p className="text-[#FAFAF8]/80 mb-1">For Readers Who Stayed</p>
                <p className="text-sm text-[#FAFAF8]/60">The foundational collection</p>
              </div>
            </div>
            <div className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/41e893d89a5edab55a6cf30298981869.jpg"
                alt="Volume II"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FAFAF8]">
                <h3 className="font-serif text-xl mb-2">Volume II</h3>
                <p className="text-[#FAFAF8]/80 mb-1">The Obsessions</p>
                <p className="text-sm text-[#FAFAF8]/60">Madness, passion, Dostoevsky, Brontë</p>
              </div>
            </div>
            <div className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/df66b392638924a895cd0c1c78ebdbb2.jpg"
                alt="Volume III"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FAFAF8]">
                <h3 className="font-serif text-xl mb-2">Volume III</h3>
                <p className="text-[#FAFAF8]/80 mb-1">The Dreamers</p>
                <p className="text-sm text-[#FAFAF8]/60">Kafka, Woolf, Borges, Murakami</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-[#FAFAF8] relative overflow-visible">
        <HandwrittenArrow x="10%" y="20%" delay={100} direction="right" size="md" color="#FAFAF8" />
        <ScatteredNote x="50%" y="50%" delay={500} color="light" random />
        <Container>
          <div className="max-w-2xl mx-auto text-center relative">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 relative inline-block">
              <AnnotatedText annotation="circle" delay={200} color="#FAFAF8">Read or Be Read.</AnnotatedText>
              <MarginNote side="right" delay={500} color="light" random />
            </h2>
            <p className="text-[#FAFAF8]/70 mb-8 relative">
              Made for <AnnotatedText annotation="highlight" delay={350}>readers</AnnotatedText>. Not consumers.
              <MarginNote side="right" delay={500} color="light" random />
            </p>
            <MagneticButton
              href="/shop"
              variant="light"
              className="bg-[#FAFAF8] text-[#1A1A1A] px-8 py-4 text-sm tracking-wide"
            >
              Shop the Collection
            </MagneticButton>
          </div>
        </Container>
      </section>
    </>
  );
}
