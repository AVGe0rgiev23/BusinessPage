import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProcessSteps } from "@/components/process/process-steps";
import { WorkingWithUs } from "@/components/process/working-with-us";
import { ProcessCta } from "@/components/process/process-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "process");
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("process");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      <ProcessSteps />
      <WorkingWithUs />
      <ProcessCta />
    </main>
  );
}
