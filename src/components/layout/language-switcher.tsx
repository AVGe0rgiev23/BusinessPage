"use client";

import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn, focusRing } from "@/lib/utils";

const SHORT = { en: "EN", bg: "БГ" } as const;

/**
 * EN | БГ — each link goes to the same page in the other language.
 *
 * Deliberately a plain link, not a redirect and not detection: the visitor
 * chooses, and the choice is the URL. The href is the language's public URL
 * (`/services`, `/bg/services`) rather than next-intl's `<Link locale>`, which
 * would point English at the redirecting `/en/services`. `lang` and `hreflang`
 * tell assistive tech and search engines which language each link leads to, and
 * the accessible names are the languages' own names («English», «Български»)
 * so a screen reader pronounces each in its own language.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common.language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("flex items-center font-mono text-eyebrow uppercase", className)}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-1 text-border-hover">
              |
            </span>
          ) : null}
          <NextLink
            href={getPathname({ locale, href: pathname })}
            lang={locale}
            hrefLang={locale}
            aria-label={t(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "rounded-sm px-1.5 py-2 transition-colors duration-[--duration-fast]",
              focusRing,
              locale === current
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            {SHORT[locale]}
          </NextLink>
        </span>
      ))}
    </div>
  );
}
