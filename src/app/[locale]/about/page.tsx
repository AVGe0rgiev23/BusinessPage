import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Mission } from "@/components/about/mission";
import { HowWeBuild } from "@/components/about/how-we-build";
import { Principles } from "@/components/about/principles";
import { EngineeringInTheOpen } from "@/components/about/engineering-in-the-open";
import { WhoWeServe } from "@/components/about/who-we-serve";
import { AboutCta } from "@/components/about/about-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("about");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      <Mission />
      <HowWeBuild />
      <Principles />
      <EngineeringInTheOpen />
      <WhoWeServe />
      <AboutCta />
    </main>
  );
}
