import { MessageSquare, Eye, HeartHandshake, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * Principles — the values behind AGility, built on the honest trust pillars
 * (fast communication, transparent development, long-term support, you own
 * your code). Written in a values / "why we hold this" voice, distinct from the
 * day-to-day experiential framing of the Process page's WorkingWithUs section.
 * Server Component; `<h2>` heading + `<h3>` per principle.
 */
const PRINCIPLES = [
  {
    icon: MessageSquare,
    title: "Fast communication",
    body: "The best software comes from a tight loop between the people who understand the business and the people writing the code. So we keep that loop short: you talk to us directly, and you get straight answers quickly.",
  },
  {
    icon: Eye,
    title: "Transparent development",
    body: "Trust is earned by being seen, not by asking for it. We keep scope, timelines, and progress in the open, so you always know what you’re paying for and why — no inflated claims, no black boxes.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term support",
    body: "Software isn’t finished at launch; that’s where it starts earning. We commit to maintaining and growing what we build, because our reputation lives in how it performs a year later, not on demo day.",
  },
  {
    icon: ShieldCheck,
    title: "You own your code",
    body: "We think ownership is a right, not an upsell. The code, the data, and the freedom to take them anywhere are yours from the start — and holding ourselves to that keeps us honest about earning the work.",
  },
];

export function Principles() {
  return (
    <Section id="principles" aria-labelledby="principles-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            What we stand for
          </p>
          <h2
            id="principles-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            The promises we actually keep.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We&apos;d rather earn trust with a handful of things we genuinely do
            than a page of claims. These four are the ones we hold ourselves to,
            on every project.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={(i % 2) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover md:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {principle.body}
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
