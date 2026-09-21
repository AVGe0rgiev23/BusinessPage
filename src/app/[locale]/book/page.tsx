import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Expectations } from "@/components/book/expectations";
import { Preparation } from "@/components/book/preparation";
import { BookingCta, CALENDLY_URL } from "@/components/book/booking-cta";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "book");
}

const perks = ["about30Minutes", "free", "noPressure", "noObligation"] as const;

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("book");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      >
        <div className="flex flex-col items-start gap-7">
          <Button
            size="lg"
            render={
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" />
            }
            className={cn("group", focusRing)}
          >
            <CalendarClock aria-hidden="true" />
            {t("page.cta")}
          </Button>
          {/* The four terms of the offer, set as a monospace run rather than
              pills — it reads as a specification line, not four more badges. */}
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-eyebrow uppercase text-text-muted">
            {perks.map((perk, i) => (
              <li key={perk} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-border-hover">
                    /
                  </span>
                ) : null}
                {t(`perks.${perk}`)}
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <Expectations />
      <Preparation />
      <BookingCta />
    </main>
  );
}
