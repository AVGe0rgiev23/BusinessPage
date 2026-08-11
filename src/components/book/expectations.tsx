import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

const ITEMS: Point[] = [
  {
    title: "30 minutes over Zoom",
    body: "A focused call at a time that suits you. Camera optional — whatever you're comfortable with.",
  },
  {
    title: "Free, with no obligation",
    body: "No invoice and no commitment. If we're not the right fit, we'll say so and point you elsewhere.",
  },
  {
    title: "We look at where you're losing time and money",
    body: "Walk us through the workflow that frustrates you most. We'll dig into what it's really costing you.",
  },
  {
    title: "An honest answer on whether custom software is worth it",
    body: "Sometimes the right move is a small fix — or nothing at all. We'll tell you straight, either way.",
  },
];

export function Expectations() {
  return (
    <Section aria-labelledby="expect-heading" className="pt-0">
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <Eyebrow>The call</Eyebrow>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <h2
            id="expect-heading"
            className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
          >
            What to expect on the call
          </h2>
          <p className="mt-5 max-w-[54ch] text-pretty text-body-lg text-text-secondary">
            It&apos;s a conversation, not a pitch. Here&apos;s exactly how the 30
            minutes go.
          </p>
        </Reveal>

        <PointList items={ITEMS} columns={2} numbered className="mt-14" />
      </Container>
    </Section>
  );
}
