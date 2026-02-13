import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { NavigationTracker } from "@/components/layout/NavigationTracker";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://longformpress.com"),
  title: "Long Form Press | Read Slowly or Die Trying",
  description: "Literary goods for people who've actually read the book. Prints and books for the discerning reader.",
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
        className={`${poppins.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        {/*
          Critical: Raw script tag to ensure it runs synchronously before React hydrates.
          next/script beforeInteractive doesn't reliably run before hydration in App Router on Vercel.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.location.pathname!=='/'){window.__loaderPlayed=false;window.__loaderDecided=true;return;}var n=performance.getEntriesByType('navigation');var t=n.length>0?n[0].type:'navigate';if(t==='back_forward'){window.__loaderPlayed=false;}else{window.__loaderPlayed=true;}window.__loaderDecided=true;})();`,
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
