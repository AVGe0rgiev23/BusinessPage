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
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="My work"
        title="I'd rather show you how I build than fake a portfolio."
        subtitle="AGility is early, and I'm honest about it. There's no wall of client logos yet — so instead of inventing one, the engineering goes out in the open. Judge it on the work itself."
      />
      <Philosophy />
      <GithubProjects />
      <EngineeringPractice />
      <SelectedWork />
      <WorkCta />
    </main>
  );
}
