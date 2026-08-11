import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

/**
 * WorkingWithUs — the "what working with us is actually like" section for the
 * Process page. Draws on the honest trust pillars (fast communication,
 * transparent development, long-term support, ownership on your terms) with an
 * experiential, day-to-day framing, distinct from the values framing used on
 * the About page.
 */
const PILLARS: Point[] = [
  {
    title: "Fast communication",
    body: "You talk to the people building your software, not a layer of account managers relaying messages. Quick replies, straight answers, and a channel that stays open the whole way through.",
  },
  {
    title: "Transparent development",
    body: "Clear scope, honest timelines, and progress you can see as it happens. You always know what you’re paying for, what it’s doing, and where the project stands this week — not a vague reassurance that it’s going fine.",
  },
  {
    title: "Support on your terms",
    body: "We don’t disappear at launch — but we don’t insist on staying, either. We can maintain, refine, and extend what we built for as long as it’s useful to you, or hand it over cleanly so your team runs it. Support is an option you choose, not a condition of working with us.",
  },
  {
    title: "Ownership on your terms",
    body: "The custom software we build for you is yours under the project agreement, and your data stays yours. You decide how much we operate: we can run the system, maintain it inside infrastructure you own, or hand it over entirely. We build with portability in mind, so moving on is always a real option — we’d just rather earn the reason to stay.",
  },
];

export function WorkingWithUs() {
  return (
    <Section
      id="working-with-us"
      aria-labelledby="working-with-us-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Working together"
          headingId="working-with-us-heading"
          title="What working with us is actually like."
          lede="The process above is the shape of a project. This is how it feels to be in one — the standards we hold ourselves to when you trust us to build software your business depends on."
        />

        <PointList items={PILLARS} columns={2} className="mt-16 md:mt-20" />
      </Container>
    </Section>
  );
}
