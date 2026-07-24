import {
  ShieldCheck,
  KeyRound,
  Gauge,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    body: "Proven, widely adopted tools have fewer surprises, better support, and a large community that has already solved the hard problems.",
  },
  {
    icon: KeyRound,
    title: "Ownership",
    body: "You get standard, well-understood code and infrastructure — not a proprietary black box — so you're never locked to us or to a single vendor.",
  },
  {
    icon: Gauge,
    title: "Performance",
    body: "Software tuned to your workload runs faster and costs less to operate than a general-purpose platform doing everything for everyone.",
  },
  {
    icon: Wrench,
    title: "Long-term maintainability",
    body: "Popular, well-documented tools are straightforward for any competent engineer to pick up later, so your software stays maintainable long after launch.",
  },
];

export function WhyThisStack() {
  return (
    <Section aria-labelledby="why-stack-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Why this stack
          </p>
          <h2
            id="why-stack-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Why we build on these tools
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We&apos;re not attached to any single tool for its own sake. We pick
            technology that&apos;s widely used, actively maintained, and
            well-documented, because that&apos;s what keeps software reliable and
            affordable to run over time.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(i % 2) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {reason.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-pretty text-body text-text-secondary">
            None of this makes any one tool universally &ldquo;best.&rdquo; It
            makes for a dependable default that we adjust whenever a project
            calls for something else — the right stack is always the one that
            fits your goals.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
