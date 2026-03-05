import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
