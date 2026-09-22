import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    // The share image moved from file-based routes to /og/<locale>; keep the old
    // URLs alive for social cards that already cached them.
    return [
      { source: "/opengraph-image", destination: "/og/en", permanent: true },
      { source: "/twitter-image", destination: "/og/en", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
