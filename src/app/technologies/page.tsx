import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { TechStack } from "@/components/technologies/tech-stack";
import { WhyThisStack } from "@/components/technologies/why-this-stack";
import { TechnologiesCta } from "@/components/technologies/technologies-cta";

const title = "Technology Stack | AGility";
const description =
  "The languages, frameworks, data, AI, and cloud tools AGility builds on — a proven, widely supported stack chosen for reliability, performance, and software you can maintain and own long term.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/technologies",
  },
};

export default function TechnologiesPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Technologies"
        title="Built on proven tools — so your software stays reliable, fast, and yours to maintain."
        subtitle="We work with a well-supported, widely adopted stack — the same tooling behind serious software products. We choose it for reliability and longevity rather than novelty, and we adapt it to fit each project."
      />
      <TechStack />
      <WhyThisStack />
      <TechnologiesCta />
    </main>
  );
}
