import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";

export async function FaqCta() {
  const t = await getTranslations("faq");

  return (
    <CtaBand
      id="still-have-questions"
      eyebrow={t("cta.eyebrow")}
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      primary={{ label: t("cta.primary"), href: "/book" }}
      secondary={{ label: t("cta.secondary"), href: "/contact", icon: true }}
    />
  );
}
