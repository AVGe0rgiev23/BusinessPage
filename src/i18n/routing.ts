import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Owner decision: no automatic redirects from browser language or cookie.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
