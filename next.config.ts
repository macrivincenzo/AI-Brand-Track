import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-auth, better-call and autumn-js initialize at import time and must
  // NOT be processed by the server bundler — bundling tree-shakes/mangles
  // better-call's createEndpoint and breaks `next build` page-data collection
  // for the auth routes. pg is a native-ish driver and is externalized too.
  serverExternalPackages: ['better-auth', 'better-call', 'autumn-js', 'pg'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Ensure proper domain handling
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'aibrandtrack.com',
          },
        ],
        destination: 'https://www.aibrandtrack.com',
        permanent: true,
      },
      // Redirect duplicate blog URL to canonical (fix duplicate content)
      {
        source: '/blog/2026-03-05-generative-engine-optimization',
        destination: '/blog/generative-engine-optimization',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
