import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Environment variable configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
};

export default nextConfig;
