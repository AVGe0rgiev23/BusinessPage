import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ProcessSteps } from "@/components/process/process-steps";
import { WorkingWithUs } from "@/components/process/working-with-us";
import { ProcessCta } from "@/components/process/process-cta";

const title = "Our Process — How AGility Builds Your Software";
const description =
  "See how we take a project from an expensive problem to working software: discovery, scoping, build, launch, and long-term support — with clear communication and no surprises at every step.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function ProcessPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Process"
        title="You’ll always know exactly where your project stands."
        subtitle="Great software shouldn’t come with mystery. We work in clear, predictable stages — so from the first conversation to long after launch, there are no black boxes and no surprises."
      />
      <ProcessSteps />
      <WorkingWithUs />
      <ProcessCta />
    </main>
  );
}
