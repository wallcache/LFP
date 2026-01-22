# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Long Form Press is a Next.js 16 e-commerce site for literary goods (t-shirts, prints, bookmarks, books). Built with React 19, TypeScript, and Tailwind CSS 4, featuring custom UI animations and Shopify integration.

## Development Commands

### Core Commands
```bash
npm run dev     # Start development server on localhost:3000
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017 with Next.js plugin enabled

## Architecture

### Data Layer Strategy

The site is designed with **dual-mode data handling**:

1. **Placeholder Mode** (Current): Uses `src/lib/placeholder-data.ts` with mock products
2. **Shopify Mode** (When configured): Uses Shopify Storefront API via `src/lib/shopify.ts`

**Key Pattern**: Components check `isShopifyConfigured` (from `shopify.ts`) to determine which data source to use. When Shopify credentials are not configured (check `.env.local` for `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`), the site falls back to placeholder data automatically.

### Cart Implementation

The cart uses **localStorage-based state management** (not Shopify Cart API), implemented in `src/context/CartContext.tsx`:
- State persists across page refreshes via localStorage key `lfp-cart`
- Cart drawer opens automatically when items are added
- No server-side cart synchronization in placeholder mode

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts, CartProvider
│   ├── page.tsx           # Homepage with hero, categories, featured products
│   ├── shop/              # Shop pages with filtering
│   ├── product/[handle]/  # Dynamic product detail pages
│   ├── about/             # About page
│   └── designed-to-last/  # Brand philosophy page
├── components/
│   ├── home/              # Homepage-specific components (HeroSection)
│   ├── layout/            # Header, Footer, Container
│   ├── shop/              # ProductCard, ProductGrid, CartDrawer, etc.
│   └── ui/                # Reusable UI components with animations
├── context/
│   └── CartContext.tsx    # Global cart state with localStorage
├── lib/
│   ├── shopify.ts         # Shopify API client (future integration)
│   ├── queries.ts         # GraphQL queries for Shopify
│   ├── placeholder-data.ts # Mock product data for development
│   └── utils.ts           # Utility functions including localStorage wrapper
└── types/
    └── shopify.ts         # TypeScript types for products, cart, variants
```

### UI Component Patterns

**Custom Animation Components** (`src/components/ui/`):
- `AnimateOnScroll.tsx` - Intersection Observer-based scroll animations
- `AnimateWords.tsx` - Staggered word-by-word text reveals
- `Typewriter.tsx` - Typewriter text effect
- `FlipText.tsx` - Letter cascade flip hover effect
- `MagneticImage.tsx` - Mouse-following image parallax
- `MagneticButton.tsx` - Magnetic hover effect on buttons
- `Annotation.tsx` - Handwritten marginalia (circles, highlights, underlines, margin notes)
- `ScrollHighlight.tsx` - Scroll-triggered text highlighting
- `Marginalia.tsx` - Scattered handwritten notes

**Key Pattern**: Most animation components use `framer-motion` for physics-based animations and `use-client` directive since they track mouse/scroll state.

### Styling System

- **Tailwind CSS 4** with inline theme configuration in `globals.css`
- **Custom CSS variables** for brand colors (`--color-cream`, `--color-ink`, `--color-forest`)
- **Font stack**: Cormorant Garamond (serif) + Inter (sans-serif) + custom Handwriting font
- **Glassmorphism effects**: Extensive glass/glow utilities in `globals.css` (search for "GLASSMORPHISM")
- **Animation keyframes**: All custom animations defined in `globals.css` (typewriter, reveal, glow-pulse, etc.)

### Product Categories

Products are typed by `productType` field:
- `T-Shirts` - Apparel with size variants (S, M, L, XL)
- `Prints` - Art prints with size variants (A4, A3)
- `Bookmarks` - Single variant items
- `Books` - Books with format variants (Hardcover, Paperback)

## Important Patterns

### Environment Variables
Required for Shopify integration (currently optional):
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

### Product Routing
- Shop page: `/shop` or `/shop?category=prints`
- Product details: `/product/[handle]` (e.g., `/product/long-live-the-long-form-tee`)
- Dynamic routing uses `handle` field from product data

### Client Components
Most components use `'use client'` because they:
- Track mouse position for magnetic/parallax effects
- Use Intersection Observer for scroll animations
- Manage cart state via React Context
- Use localStorage for persistence

### Image Paths
- Product images: `/content/` (t-shirts, bookmarks) and `/images/` (lifestyle photos)
- Public assets served from `/public/` directory

## Brand Voice

The site has a literary, slightly pretentious tone with self-aware humor. Copy emphasizes:
- Serious readers who "finish the book"
- Slow reading as resistance to algorithmic culture
- Marginalia and annotation as sacred acts
- "Pretension, Earned" as the brand motto

When writing new content or features, match this sophisticated-but-playful literary aesthetic.
