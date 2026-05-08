import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization — serve AVIF first (smallest), fall back to WebP
  // for browsers without AVIF support, and finally to the original format.
  // Cuts ~75% off the lunar plate payloads (the JPGs are ~500KB each).
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
