import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

const REASONS: Point[] = [
  {
    title: "Reliability",
    body: "Proven, widely adopted tools have fewer surprises, better support, and a large community that has already solved the hard problems.",
  },
  {
    title: "Portability",
    body: "Standard, well-understood code and infrastructure rather than a proprietary black box. I use third-party providers like everyone does — the point is that moving off one shouldn't mean a rewrite.",
  },
  {
    title: "Performance",
    body: "Software tuned to your workload runs faster and costs less to operate than a general-purpose platform doing everything for everyone.",
  },
  {
    title: "Long-term maintainability",
    body: "Popular, well-documented tools are straightforward for any competent engineer to pick up later, so your software stays maintainable long after launch.",
  },
];

export function WhyThisStack() {
  return (
    <Section
      aria-labelledby="why-stack-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Why this stack"
          headingId="why-stack-heading"
          title="Why I build on these tools"
          lede="I'm not attached to any single tool for its own sake. I pick technology that's widely used, actively maintained, and well-documented, because that's what keeps software reliable and affordable to run over time."
        />

        <PointList items={REASONS} columns={2} className="mt-16 md:mt-20" />

        <Reveal className="mt-12">
          <p className="max-w-[72ch] text-pretty text-body text-text-secondary">
            None of this makes any one tool universally &ldquo;best.&rdquo; It
            makes for a dependable default that I adjust whenever a project
            calls for something else — the right stack is always the one that
            fits your goals.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
