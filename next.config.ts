import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // WordPress URLs end in a slash (selah.coffee/faq/). Keeping it means every old URL
  // works unchanged on the new site, so no page-level redirects are needed at launch.
  trailingSlash: true,
  images: {
    // Vercel's Hobby team ("saba's projects") has used up its image-optimization quota, so every
    // /_next/image request answered 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED and no photo showed
    // (2026-11-19). Until the site moves to a Pro team, next/image serves the files in /public as they
    // are (all are web-sized, 620 KB at most). On Pro, delete this line to get AVIF/WebP and resizing back.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
