/**
 * Reviews we can verify publicly (AlternativeTo). Only these are shown and used in
 * Review/AggregateRating schema. Three older "customer" quotes from the Jan 2026 SEO pass
 * (see git history of components/reviews-section.tsx) are left out until confirmed real.
 */
export const ALTERNATIVETO_URL = 'https://alternativeto.net/software/ai-brand-track/about/';

export type Review = { quote: string; author: string; date: string; rating: number };

export const reviews: Review[] = [
  {
    quote: "Didn't know we were basically invisible in ChatGPT until we ran this. Fixed that. Worth every penny.",
    author: 'Guest',
    rating: 5,
    date: '2026-02-24',
  },
  {
    quote:
      'It doesn’t just show where we rank—it tells us what to do next. We actually changed our content based on the recommendations. It has helped us a lot.',
    author: 'JohnnyT',
    rating: 5,
    date: '2026-02-25',
  },
];

export const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
