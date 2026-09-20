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
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Process"
        title="You’ll always know exactly where your project stands."
        subtitle="Great software shouldn’t come with mystery. I work in clear, predictable stages — so from the first conversation to long after launch, there are no black boxes and no surprises."
      />
      <ProcessSteps />
      <WorkingWithUs />
      <ProcessCta />
    </main>
  );
}
