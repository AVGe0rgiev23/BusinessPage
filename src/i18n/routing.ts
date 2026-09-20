import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Owner decision: no automatic redirects from browser language or cookie.
  localeDetection: false,
  // Nothing reads a locale cookie (the URL is the choice), so don't set one.
  localeCookie: false,
  // hreflang alternates are emitted once, with absolute URLs, in the page
  // metadata (src/lib/seo.ts) and the sitemap; a second `Link:` header built
  // from the request host could disagree with them (e.g. on preview URLs).
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
