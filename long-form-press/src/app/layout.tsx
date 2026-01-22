import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { NavigationTracker } from "@/components/layout/NavigationTracker";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://longformpress.com"),
  title: "Long Form Press | Read Slowly or Die Trying",
  description: "Literary goods for people who've actually read the book. T-shirts, prints, bookmarks, and books for the discerning reader.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Long Form Press | Read Slowly or Die Trying",
    description: "Literary goods for people who've actually read the book.",
    images: ["/content/logo_typography_green.png"],
    siteName: "Long Form Press",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Form Press | Read Slowly or Die Trying",
    description: "Literary goods for people who've actually read the book.",
    images: ["/content/logo_typography_green.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        {/*
          Critical: This script MUST run before React hydrates to set the loader flag.
          It determines whether the loader should play based on navigation type.
        */}
        <Script
          id="loader-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                console.log('[Loader Init] Running at:', window.location.pathname);

                // Skip if not on homepage
                if (window.location.pathname !== '/') {
                  window.__loaderPlayed = false;
                  window.__loaderDecided = true;
                  console.log('[Loader Init] Not homepage, skipping');
                  return;
                }

                // Check navigation type using Performance API
                var navEntries = performance.getEntriesByType('navigation');
                var navType = navEntries.length > 0 ? navEntries[0].type : 'navigate';
                console.log('[Loader Init] Navigation type:', navType);

                // Check if SPA was active in this session
                var spaActive = sessionStorage.getItem('__lfp_spa_active') === 'true';
                console.log('[Loader Init] SPA active:', spaActive);

                if (navType === 'reload') {
                  // Page refresh - always show loader
                  window.__loaderPlayed = true;
                  console.log('[Loader Init] Reload detected - showing loader');
                } else if (navType === 'back_forward') {
                  // Browser back/forward - don't show loader
                  window.__loaderPlayed = false;
                  console.log('[Loader Init] Back/forward detected - hiding loader');
                } else {
                  // navType === 'navigate' - first visit or new page load
                  window.__loaderPlayed = true;
                  console.log('[Loader Init] Navigate detected - showing loader');
                }

                window.__loaderDecided = true;
                console.log('[Loader Init] Final decision - loaderPlayed:', window.__loaderPlayed);
              })();
            `,
          }}
        />
        <InitialLoader />
        <NavigationTracker />
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
