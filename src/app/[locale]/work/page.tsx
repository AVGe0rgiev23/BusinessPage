import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Philosophy } from "@/components/work/philosophy";
import { GithubProjects } from "@/components/work/github-projects";
import { EngineeringPractice } from "@/components/work/engineering-practice";
import { SelectedWork } from "@/components/work/selected-work";
import { WorkCta } from "@/components/work/work-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "work");
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("work");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      <Philosophy />
      <GithubProjects />
      <EngineeringPractice />
      <SelectedWork />
      <WorkCta />
    </main>
  );
}
