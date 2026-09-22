import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { ROUTES, localizedPath, type RouteKey } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Home + the two conversion pages (book / contact) rank highest; static
// informational pages (technologies / faq) rank lowest.
const WEIGHT: Record<RouteKey, { changeFrequency: Freq; priority: number }> = {
  home: { changeFrequency: "monthly", priority: 1.0 },
  services: { changeFrequency: "monthly", priority: 0.9 },
  book: { changeFrequency: "monthly", priority: 0.9 },
  contact: { changeFrequency: "monthly", priority: 0.8 },
  process: { changeFrequency: "yearly", priority: 0.7 },
  about: { changeFrequency: "yearly", priority: 0.7 },
  work: { changeFrequency: "yearly", priority: 0.7 },
  technologies: { changeFrequency: "yearly", priority: 0.6 },
  faq: { changeFrequency: "yearly", priority: 0.5 },
};

const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** 9 routes × 2 languages = 18 URLs, each listing its language alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return (Object.keys(ROUTES) as RouteKey[]).flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absolute(localizedPath(locale, route)),
      lastModified,
      ...WEIGHT[route],
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, absolute(localizedPath(l, route))]),
          ),
          "x-default": absolute(localizedPath(routing.defaultLocale, route)),
        },
      },
    })),
  );
}
