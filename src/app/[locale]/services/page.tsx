import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { WhyCustomCallout } from "@/components/services/why-custom-callout";
import { DeliveryModels } from "@/components/shared/delivery-models";
import { ServicesCta } from "@/components/services/services-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("services");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      <ServicesCatalog />
      <WhyCustomCallout />
      <DeliveryModels
        id="delivery"
        eyebrow={t("delivery.eyebrow")}
        heading={t("delivery.heading")}
        intro={t("delivery.intro")}
        className="border-t border-border bg-bg-surface"
      />
      <ServicesCta />
    </main>
  );
}
