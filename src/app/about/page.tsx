import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Mission } from "@/components/about/mission";
import { HowWeBuild } from "@/components/about/how-we-build";
import { Principles } from "@/components/about/principles";
import { EngineeringInTheOpen } from "@/components/about/engineering-in-the-open";
import { WhoWeServe } from "@/components/about/who-we-serve";
import { AboutCta } from "@/components/about/about-cta";

const title = "About AGility — Custom Software Built Around Your Business";
const description =
  "I build custom software that saves growing businesses time and money, with clear ownership and a delivery model you choose. Here is how I think about building, and what I stand for.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="About"
        title="I build software that pays for itself."
        subtitle="AGility is one person with a simple belief: technology should earn its keep. I start from the time and money a business is losing, and build exactly what it takes to win it back — and nothing it doesn’t."
      />
      <Mission />
      <HowWeBuild />
      <Principles />
      <EngineeringInTheOpen />
      <WhoWeServe />
      <AboutCta />
    </main>
  );
}
