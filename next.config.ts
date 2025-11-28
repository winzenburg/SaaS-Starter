import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Suppress hydration warnings from browser extensions
  reactStrictMode: true,
  // Allow eval in development for Next.js hot reloading
  webpack: (config, { dev }) => {
    if (dev) {
      // In development, Next.js uses eval for hot module replacement
      // This is expected and safe in dev mode
    }
    return config;
  },
};

export default nextConfig;

