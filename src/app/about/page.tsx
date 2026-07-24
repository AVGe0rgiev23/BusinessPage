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
  "We build custom software that saves growing businesses time and money — and hands them full ownership of the code. Here is how we think about building, and what we stand for.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="About"
        title="We build software that pays for itself."
        subtitle="AGility is a software team with a simple belief: technology should earn its keep. We start from the time and money a business is losing, and build exactly what it takes to win it back — and nothing it doesn’t."
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
