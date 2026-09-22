import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";
import { WriteFirstFootnote } from "@/components/layout/write-first-footnote";

export async function TechnologiesCta() {
  const t = await getTranslations("technologies");

  return (
    <CtaBand
      id="get-started"
      eyebrow={t("cta.eyebrow")}
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      primary={{ label: t("cta.primary"), href: "/book" }}
      secondary={{ label: t("cta.secondary"), href: "/contact", icon: true }}
      footnote={<WriteFirstFootnote />}
    />
  );
}
