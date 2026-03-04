"use client";

import Link from "next/link";

const ALTERNATIVETO_URL = "https://alternativeto.net/software/ai-brand-track/about/";

const reviews = [
  {
    quote:
      "Didn't know we were basically invisible in ChatGPT until we ran this. Fixed that. Worth every penny.",
    author: "Guest",
    date: "Feb 24, 2026",
    highlight: true,
  },
  {
    quote:
      "I really liked using AI Brand Track. Getting a full brand analysis for free without adding a credit card was honestly impressive. It made it easy to test the platform without any pressure. I also appreciate their pricing structure. The pay-as-you-go option is perfect if you don't want to commit to a monthly subscription. Not many competitors offer that kind of flexibility.",
    author: "ShazInfinity",
    date: "Feb 27, 2026",
    highlight: false,
  },
  {
    quote:
      "It doesn't just show where we rank—it tells us what to do next. We actually changed our content based on the recommendations. It has helped us a lot.",
    author: "JohnnyT",
    date: "Feb 25, 2026",
    highlight: false,
  },
  {
    quote:
      "I liked it very much AI Brand Track because I was able to get a full brand analysis of my website for free. Plus I didn't need to add my credit card—that was great. The price plans are good because you can pay-as-you-go; you don't need to subscribe to a monthly fee. That's an option not many competitors give.",
    author: "PaceTyler",
    date: "Feb 25, 2026",
    highlight: false,
  },
];

function StarRating() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="h-5 w-5 text-amber-400 fill-current"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            Loved by marketers & founders
          </p>
          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            What customers are saying about AI Brand Track
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Real reviews from{" "}
            <a
              href={ALTERNATIVETO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              AlternativeTo
            </a>
            —unfiltered feedback from people actually using the product.
          </p>

          {/* Rating + source link */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <StarRating />
              <span className="text-lg font-semibold text-gray-900">5.0</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">Based on reviews on AlternativeTo</span>
            <Link
              href={ALTERNATIVETO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Read all reviews →
            </Link>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-none p-6 flex flex-col ${
                review.highlight
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-gray-200 hover:border-gray-300"
              } transition-colors`}
            >
              {review.highlight && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-3">
                  <span aria-hidden>👍</span> Top positive comment
                </span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <StarRating />
              </div>
              <blockquote className="text-gray-700 flex-1 mb-4">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                <span className="font-medium text-gray-700">{review.author}</span>
                <span className="mx-2">·</span>
                <time dateTime={review.date}>{review.date}</time>
                <span className="mx-2">·</span>
                <a
                  href={ALTERNATIVETO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Review on AlternativeTo
                </a>
              </footer>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={ALTERNATIVETO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-none border-2 border-blue-600 hover:border-blue-700 transition-colors"
          >
            See more customer reviews on AlternativeTo
          </Link>
        </div>
      </div>
    </section>
  );
}
