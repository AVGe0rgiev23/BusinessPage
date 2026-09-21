import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";

export async function WorkCta() {
  const t = await getTranslations("work");

  return (
    <CtaBand
      id="start-a-project"
      eyebrow={t("cta.eyebrow")}
      title={t("cta.title")}
      subtitle={t("cta.subtitle")}
      primary={{ label: t("cta.primary"), href: "/book" }}
      secondary={{ label: t("cta.secondary"), href: "/contact" }}
    />
  );
}
