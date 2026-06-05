import type { Metadata } from "next";
import { LandingPage } from "@/components/seo/landing-page";
import { SEO_PAGES, SEO_PAGE_META } from "@/lib/seo-landing-content";

const SLUG = "ai-search-visibility";

export const metadata: Metadata = {
  title: SEO_PAGE_META[SLUG].title,
  description: SEO_PAGE_META[SLUG].description,
  alternates: { canonical: `https://www.aibrandtrack.com/${SLUG}` },
  openGraph: {
    title: SEO_PAGE_META[SLUG].title,
    description: SEO_PAGE_META[SLUG].description,
    url: `https://www.aibrandtrack.com/${SLUG}`,
  },
};

export default function Page() {
  return <LandingPage data={SEO_PAGES[SLUG]} />;
}
