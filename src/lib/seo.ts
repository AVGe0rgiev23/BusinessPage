import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export const ROUTES = {
  home: "/",
  services: "/services",
  process: "/process",
  technologies: "/technologies",
  work: "/work",
  about: "/about",
  faq: "/faq",
  book: "/book",
  contact: "/contact",
} as const;
export type RouteKey = keyof typeof ROUTES;

const OG_LOCALE: Record<Locale, string> = { en: "en_US", bg: "bg_BG" };

/** Public path of a route in a locale: "/" and "/bg", "/services" and "/bg/services", … */
export const localizedPath = (locale: Locale, route: RouteKey) =>
  getPathname({ locale, href: ROUTES[route] });

export async function routeMetadata(locale: Locale, route: RouteKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, route)]),
  );
  return {
    title: t(`${route}.title`),
    description: t(`${route}.description`),
    alternates: {
      canonical: localizedPath(locale, route),
      languages: { ...languages, "x-default": localizedPath(routing.defaultLocale, route) },
    },
    // Deliberately no og:title/og:description: Next backfills them from this
    // route's own title/description, so each page carries its own values.
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      images: [{ url: `/og/${locale}`, width: 1200, height: 630, alt: t("og.alt") }],
    },
    twitter: { card: "summary_large_image", images: [`/og/${locale}`] },
  };
}
