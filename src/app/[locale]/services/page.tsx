import { initLocale } from "@/i18n/init-locale";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { WhyCustomCallout } from "@/components/services/why-custom-callout";
import { DeliveryModels } from "@/components/shared/delivery-models";
import { ServicesCta } from "@/components/services/services-cta";

const title = "Custom Software & AI Automation Services | AGility";
const description =
  "From email and document automation to AI assistants, internal tools, and custom SaaS, AGility builds software around your business — and you choose whether I run it for you, hand it over, or maintain it inside your own environment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Services"
        title="Software that handles the busywork your team shouldn't be doing."
        subtitle="Everything below is an example of what I build, not a fixed menu. Every project is designed around your business — your tools, your process, and the specific work you want to stop doing by hand."
      />
      <ServicesCatalog />
      <WhyCustomCallout />
      <DeliveryModels
        id="delivery"
        eyebrow="Delivery"
        heading="How your software is delivered"
        intro="Every project is different, and so is the right operating model. I can run the system for you, deploy it into infrastructure you control, or manage software running inside your own environment — whichever fits how your business works."
        className="border-t border-border bg-bg-surface"
      />
      <ServicesCta />
    </main>
  );
}
