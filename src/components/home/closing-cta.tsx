import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";
import { WriteFirstFootnote } from "@/components/layout/write-first-footnote";

/**
 * ClosingCta — the page's single booking ask.
 *
 * It used to carry a "Get in touch" secondary alongside it, and the hero
 * carried a second "Book a consultation" above the fold. Three high-friction
 * asks and no cheap one meant a visitor who wasn't ready to book had nothing
 * to do but leave. The secondary is gone (the footnote link below already
 * covers "I'd rather write"), the hero now points at the teardown, and this is
 * deliberately the last thing on the page: the expensive ask comes after the
 * free one, not beside it.
 */
export async function ClosingCta() {
  const t = await getTranslations("home.closingCta");
  return (
    <CtaBand
      id="get-started"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      primary={{ label: t("cta"), href: "/book" }}
      footnote={<WriteFirstFootnote />}
    />
  );
}
