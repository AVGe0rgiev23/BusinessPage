import { Clock, MessageSquare, ShieldCheck, Video } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: Video,
    title: "30 minutes over Zoom",
    body: "A focused call at a time that suits you. Camera optional — whatever you're comfortable with.",
  },
  {
    icon: ShieldCheck,
    title: "Free, with no obligation",
    body: "No invoice and no commitment. If we're not the right fit, we'll say so and point you elsewhere.",
  },
  {
    icon: MessageSquare,
    title: "We look at where you're losing time and money",
    body: "Walk us through the workflow that frustrates you most. We'll dig into what it's really costing you.",
  },
  {
    icon: Clock,
    title: "An honest answer on whether custom software is worth it",
    body: "Sometimes the right move is a small fix — or nothing at all. We'll tell you straight, either way.",
  },
];

export function Expectations() {
  return (
    <Section aria-labelledby="expect-heading" className="pt-0">
      <Container>
        <Reveal>
          <h2
            id="expect-heading"
            className="max-w-2xl text-h2 font-semibold text-text-primary"
          >
            What to expect on the call
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
            It&apos;s a conversation, not a pitch. Here&apos;s exactly how the
            30 minutes go.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, body }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-bg-surface p-6 md:p-7">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
