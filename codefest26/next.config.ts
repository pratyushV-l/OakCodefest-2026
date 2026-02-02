import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/CFHero',
  // assetPrefix: '/CFHero/',
  devIndicators: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
