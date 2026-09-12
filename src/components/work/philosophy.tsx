import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

const PRINCIPLES: Point[] = [
  {
    title: "Start with the problem",
    body: "Every project begins with what's actually costing you — the hours lost, the errors, the bottleneck. The technology is chosen to fit that, never the other way around.",
  },
  {
    title: "Ownership you can point to",
    body: "I design projects so you keep appropriate ownership and control of your software, your data, and your infrastructure, according to the delivery model you choose — and I'm precise about which is which.",
  },
  {
    title: "Ship in small increments",
    body: "You see working software early and often, so you can steer the direction while it's still cheap to change — not after the budget is spent.",
  },
  {
    title: "Code built to be read",
    body: "Clear, documented, tested code that the next engineer — me or yours — can pick up and extend without starting over.",
  },
  {
    title: "Honest by default",
    body: "Straight answers on scope, timelines, and trade-offs — including the times a simpler, cheaper tool is the right call for you.",
  },
  {
    title: "Close communication",
    body: "You talk directly to the person writing your software, and you get quick, plain-spoken answers when something comes up.",
  },
];

export function Philosophy() {
  return (
    <Section id="philosophy" aria-labelledby="philosophy-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="How I build"
          headingId="philosophy-heading"
          title="The principles behind every build."
          lede="There's no wall of client logos yet — AGility is early, and I won't pretend otherwise. What I can show you is exactly how I work, so you can judge me on the things that decide whether software is worth trusting."
        />

        <PointList
          items={PRINCIPLES}
          columns={2}
          numbered
          className="mt-16 md:mt-20"
        />
      </Container>
    </Section>
  );
}
