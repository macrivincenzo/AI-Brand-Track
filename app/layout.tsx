import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { CookieConsent } from "@/components/cookie-consent";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aibrandtrack.com'),

  // OPTIMIZED: More specific, AI-quotable title with year
  title: {
    default: "AI Brand Track: AI Visibility Tracker for ChatGPT, Claude, Perplexity & Gemini",
    template: "%s | AI Brand Track"
  },

  // OPTIMIZED: Longer, more detailed description with specific claims
  description: "Track how ChatGPT, Claude, Perplexity and Gemini mention and rank your brand against competitors. Get actionable AEO and GEO recommendations. Free analysis in 60 seconds, pay-as-you-go credits.",

  // OPTIMIZED: Expanded keywords with long-tail, question-based variations
  keywords: [
    // Core brand terms
    "AI brand visibility",
    "AI brand monitoring",
    "AI brand tracking",
    "brand visibility monitoring",

    // Platform-specific
    "ChatGPT brand tracking",
    "ChatGPT brand visibility",
    "how to track brand on ChatGPT",
    "Claude brand monitoring",
    "Claude AI brand tracking",
    "Perplexity brand tracking",
    "Perplexity AI monitoring",
    "Google Gemini brand tracking",
    "Gemini brand visibility",
    "Gemini AI monitoring",

    // Question-based (what AI searches for)
    "how to monitor AI brand visibility",
    "how to track brand in AI search",
    "how to improve AI brand presence",
    "what is AI brand monitoring",
    "what is AEO optimization",
    "what is GEO optimization",

    // Competitive/comparison
    "AI brand monitoring tools",
    "AI brand tracking software",
    "AI brand visibility platform",
    "ChatGPT SEO tools",
    "AI search optimization tools",
    "competitor analysis AI",

    // Technical SEO terms
    "AI search optimization",
    "AI engine optimization",
    "AEO optimization",
    "GEO optimization",
    "generative engine optimization",
    "AI search visibility",
    "AI ranking tracker",

    // Use cases
    "track brand mentions AI",
    "monitor brand AI platforms",
    "AI brand reputation monitoring",
    "AI competitor tracking",
    "brand visibility analytics",
    "AI brand analysis",

    // Year-specific
    "AI brand monitoring 2026",
    "AI search trends 2026",
    "ChatGPT SEO 2026"
  ],

  // OPTIMIZED: Added more author metadata
  authors: [
    { name: "AI Brand Track", url: "https://www.aibrandtrack.com" }
  ],
  creator: "AI Brand Track",
  publisher: "AI Brand Track",

  // OPTIMIZED: Enhanced robots with more specific instructions
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OPTIMIZED: More detailed OpenGraph with article-style metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.aibrandtrack.com',
    siteName: 'AI Brand Track',
    title: 'AI Brand Track - Monitor Your Brand Visibility Across ChatGPT, Claude, Perplexity & Google Gemini',
    description: 'The leading AI brand visibility monitoring platform. Track how AI platforms like ChatGPT, Claude, Perplexity, and Google Gemini rank your brand against competitors. Get actionable insights for AI search optimization (AEO) and generative engine optimization (GEO). Free trial with results in 60 seconds.',
  },

  // OPTIMIZED: Enhanced Twitter card with creator
  twitter: {
    card: 'summary_large_image',
    site: '@aibrandtrack',
    creator: '@aibrandtrack',
  },

  // Icons remain the same
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' }
    ],
    apple: '/ai-brand-track-logo.jpeg',
    shortcut: '/favicon.svg',
  },

  // NEW: Category for better classification
  category: 'Business Software',

  // NEW: Application name for PWA
  applicationName: 'AI Brand Track',

  // NEW: Referrer policy
  referrer: 'origin-when-cross-origin',

  // NEW: Format detection
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* NEW: Additional meta tags for better AEO/GEO */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CookieConsent />
            <Toaster position="bottom-right" richColors closeButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
