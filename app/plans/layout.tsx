import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing: Pay-As-You-Go AI Visibility Tracking',
  description: 'AI Brand Track pricing: a free analysis, pay-as-you-go credits that never expire, or monthly plans. Track your brand across ChatGPT, Claude, Perplexity and Gemini.',
  keywords: [
    'AI brand tracking pricing',
    'AI brand monitoring cost',
    'ChatGPT brand tracking price',
    'AI search optimization pricing',
    'brand visibility monitoring plans'
  ],
  openGraph: {
    title: 'Pricing: Pay-As-You-Go AI Visibility Tracking | AI Brand Track',
    description: 'A free analysis, pay-as-you-go credits that never expire, or monthly plans. Track your brand across ChatGPT, Claude, Perplexity and Gemini.',
    url: 'https://www.aibrandtrack.com/plans',
  },
  alternates: {
    canonical: 'https://www.aibrandtrack.com/plans',
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

