import { initLocale } from "@/i18n/init-locale";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Outcomes } from "@/components/home/outcomes";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyCustom } from "@/components/home/why-custom";
import { ProcessPreview } from "@/components/home/process-preview";
import { DeliveryModels } from "@/components/shared/delivery-models";
import { Pricing } from "@/components/home/pricing";
import { Technology } from "@/components/home/technology";
import { WhyAgility } from "@/components/home/why-agility";
import { OpenSource } from "@/components/home/open-source";
import { Connect } from "@/components/home/connect";
import { FaqPreview } from "@/components/home/faq-preview";
import { Teardown } from "@/components/home/teardown";
import { ClosingCta } from "@/components/home/closing-cta";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <Hero />
      <Problem />
      <Outcomes />
      <ServicesPreview />
      <WhyCustom />
      <ProcessPreview />
      <DeliveryModels index="06" />
      <Pricing />
      <Technology />
      <WhyAgility />
      <OpenSource />
      <Connect />
      <FaqPreview />
      {/* Teardown before the booking CTA on purpose: the cheap ask goes
          first, the expensive one second. */}
      <Teardown />
      <ClosingCta />
    </main>
  );
}
