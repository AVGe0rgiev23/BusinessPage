import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { TechStack } from "@/components/technologies/tech-stack";
import { WhyThisStack } from "@/components/technologies/why-this-stack";
import { TechnologiesCta } from "@/components/technologies/technologies-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "technologies");
}

export default async function TechnologiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("technologies");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      <TechStack />
      <WhyThisStack />
      <TechnologiesCta />
    </main>
  );
}
