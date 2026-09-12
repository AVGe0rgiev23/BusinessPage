import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

/**
 * Principles — the values behind AGility, built on the honest trust pillars
 * (fast communication, transparent development, long-term support, ownership on
 * your terms). Written in a values / "why this is held to" voice, distinct from the
 * day-to-day experiential framing of the Process page's WorkingWithUs section.
 */
const PRINCIPLES: Point[] = [
  {
    title: "Fast communication",
    body: "The best software comes from a tight loop between the people who understand the business and the person writing the code. So that loop stays short: you talk to me directly, and you get straight answers quickly.",
  },
  {
    title: "Transparent development",
    body: "Trust is earned by being seen, not by asking for it. I keep scope, timelines, and progress in the open, so you always know what you’re paying for and why — no inflated claims, no black boxes.",
  },
  {
    title: "Long-term support",
    body: "Software isn’t finished at launch; that’s where it starts earning. I’ll maintain and grow what I build for as long as you want me to, because my reputation lives in how it performs a year later, not on demo day — and if you’d rather run it yourself, I hand it over properly.",
  },
  {
    title: "Ownership on your terms",
    body: "Ownership is a right, not an upsell. The custom software is yours under the project agreement and your data stays yours — and you choose how much I operate on your behalf. Holding myself to that keeps me honest about earning the work rather than trapping it.",
  },
];

export function Principles() {
  return (
    <Section id="principles" aria-labelledby="principles-heading">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="What I stand for"
          headingId="principles-heading"
          title="The promises I actually keep."
          lede="I'd rather earn trust with a handful of things I genuinely do than a page of claims. These four are the ones I hold myself to, on every project."
        />

        <PointList items={PRINCIPLES} columns={2} className="mt-16 md:mt-20" />
      </Container>
    </Section>
  );
}
