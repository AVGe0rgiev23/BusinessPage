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
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Technologies"
        title="Built on proven tools — so your software stays reliable, fast, and maintainable."
        subtitle="I work with a well-supported, widely adopted stack — the same tooling behind serious software products. I choose it for reliability and longevity rather than novelty, and I pick the parts that fit each project rather than running every job through the same template."
      />
      <TechStack />
      <WhyThisStack />
      <TechnologiesCta />
    </main>
  );
}
