import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { generateLocalBusinessJsonLd, studioData } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://inkstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INK STUDIO | Custom Tattoos by Award-Winning Artists",
    template: "%s | INK STUDIO",
  },
  description: "Premium custom tattoo studio featuring award-winning artists specializing in blackwork, fine line, Japanese traditional, realism, and more. Book your consultation today.",
  keywords: ["tattoo", "custom tattoo", "tattoo studio", "tattoo artist", "blackwork", "fine line", "Japanese tattoo", "realism tattoo"],
  authors: [{ name: "INK STUDIO" }],
  creator: "INK STUDIO",
  publisher: "INK STUDIO",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "INK STUDIO",
    title: "INK STUDIO | Custom Tattoos by Award-Winning Artists",
    description: "Premium custom tattoo studio featuring award-winning artists. Book your consultation today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "INK STUDIO - Custom Tattoos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INK STUDIO | Custom Tattoos",
    description: "Premium custom tattoo studio featuring award-winning artists.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href={siteUrl} />
        {/* JSON-LD LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateLocalBusinessJsonLd() }}
        />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
