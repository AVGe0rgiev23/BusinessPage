import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { focusRing } from "@/lib/utils";
import { calendlyUrl } from "@/lib/site-config";
import { CtaBand } from "@/components/layout/cta-band";

export const CALENDLY_URL = calendlyUrl;

export async function BookingCta() {
  const t = await getTranslations("book");
  return (
    <CtaBand
      id="book-now"
      eyebrow={t("bookingCta.eyebrow")}
      title={t("bookingCta.title")}
      subtitle={t("bookingCta.subtitle")}
      primary={{ label: t("bookingCta.primary"), href: CALENDLY_URL }}
      secondary={{ label: t("bookingCta.secondary"), href: "/contact" }}
      footnote={t.rich("bookingCta.footnote", {
        contact: (chunks) => (
          <Link
            href="/contact"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            {chunks}
          </Link>
        ),
      })}
    />
  );
}
