import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { focusRing } from "@/lib/utils";
import { CtaBand } from "@/components/layout/cta-band";

/**
 * ProcessCta — closing conversion block for the Process page. A thin wrapper
 * around the shared `CtaBand` with Process-specific copy, funnelling to `/book`
 * (primary) and `/contact` (secondary). Server Component.
 */
export async function ProcessCta() {
  const t = await getTranslations("process");
  return (
    <CtaBand
      id="get-started"
      eyebrow={t("cta.eyebrow")}
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      primary={{ label: t("cta.primary"), href: "/book" }}
      secondary={{ label: t("cta.secondary"), href: "/contact", icon: true }}
      footnote={t.rich("cta.footnote", {
        about: (chunks) => (
          <Link
            href="/about"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            {chunks}
          </Link>
        ),
      })}
    />
  );
}
