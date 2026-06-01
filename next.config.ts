import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization — serve AVIF first (smallest), fall back to WebP
  // for browsers without AVIF support, and finally to the original format.
  // Cuts ~75% off the lunar plate payloads (the JPGs are ~500KB each).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Serve the standalone GEO case-study page at a clean /case-study URL.
  // The self-contained HTML lives in public/case-study.html (its own fonts,
  // styles, and scripts), so the rewrite lets it bypass the app layout
  // entirely while still resolving at the pretty path.
  async rewrites() {
    return [{ source: "/case-study", destination: "/case-study.html" }];
  },
};

export default nextConfig;
