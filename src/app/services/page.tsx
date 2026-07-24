import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { WhyCustomCallout } from "@/components/services/why-custom-callout";
import { ServicesCta } from "@/components/services/services-cta";

const title = "Custom Software & AI Automation Services | AGility";
const description =
  "From email and document automation to AI assistants, internal tools, and custom SaaS, AGility builds software around your business to cut manual work, connect your systems, and give you tools you own.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Services"
        title="Software that handles the busywork your team shouldn't be doing."
        subtitle="Everything below is an example of what we build, not a fixed menu. Every solution is designed around your business — your tools, your process, and the specific work you want to stop doing by hand."
      />
      <ServicesCatalog />
      <WhyCustomCallout />
      <ServicesCta />
    </main>
  );
}
