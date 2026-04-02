import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vitafit-ks.com',
      },
      {
        protocol: 'https',
        hostname: 'www.preworkout.org',
      },
      {
        protocol: 'https',
        hostname: 'c4preworkout.com',
      },
      {
        protocol: 'https',
        hostname: 'a1protein.com',
      },
    ],
  },
};

export default nextConfig;
