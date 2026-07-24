import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Outcomes } from "@/components/home/outcomes";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyCustom } from "@/components/home/why-custom";
import { ProcessPreview } from "@/components/home/process-preview";
import { Technology } from "@/components/home/technology";
import { WhyAgility } from "@/components/home/why-agility";
import { OpenSource } from "@/components/home/open-source";
import { Connect } from "@/components/home/connect";
import { FaqPreview } from "@/components/home/faq-preview";
import { ClosingCta } from "@/components/home/closing-cta";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <Hero />
      <Problem />
      <Outcomes />
      <ServicesPreview />
      <WhyCustom />
      <ProcessPreview />
      <Technology />
      <WhyAgility />
      <OpenSource />
      <Connect />
      <FaqPreview />
      <ClosingCta />
    </main>
  );
}
