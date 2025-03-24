import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com", "www.example.com"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
