import { MessageSquare, Eye, HeartHandshake, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * WorkingWithUs — the "what working with us is actually like" section for the
 * Process page. Draws on the honest trust pillars (fast communication,
 * transparent development, long-term support, you own your code) with an
 * experiential, day-to-day framing (distinct from the values framing used on
 * the About page). Server Component; `<h2>` heading + `<h3>` per pillar.
 */
const PILLARS = [
  {
    icon: MessageSquare,
    title: "Fast communication",
    body: "You talk to the people building your software, not a layer of account managers relaying messages. Quick replies, straight answers, and a channel that stays open the whole way through.",
  },
  {
    icon: Eye,
    title: "Transparent development",
    body: "Clear scope, honest timelines, and progress you can see as it happens. You always know what you’re paying for, what it’s doing, and where the project stands this week — not a vague reassurance that it’s going fine.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term support",
    body: "We don’t disappear at launch. We stay on to maintain, refine, and extend what we built, so the software keeps working for you as the business moves and grows.",
  },
  {
    icon: ShieldCheck,
    title: "You own your code",
    body: "The software, the code, and the data are yours — full stop. No lock-in, no hostage situation, no platform you can’t leave. You could take everything elsewhere tomorrow, though we’d rather earn the reason to stay.",
  },
];

export function WorkingWithUs() {
  return (
    <Section
      id="working-with-us"
      aria-labelledby="working-with-us-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Working together
          </p>
          <h2
            id="working-with-us-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            What working with us is actually like.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            The process above is the shape of a project. This is how it feels to
            be in one — the standards we hold ourselves to when you trust us to
            build software your business depends on.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={(i % 2) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover md:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {pillar.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
