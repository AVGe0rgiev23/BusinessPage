import { Target, ShieldCheck, Blocks, Code2, Eye, MessageSquare } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const PRINCIPLES = [
  {
    icon: Target,
    title: "Start with the problem",
    body: "Every project begins with what's actually costing you — the hours lost, the errors, the bottleneck. The technology is chosen to fit that, never the other way around.",
  },
  {
    icon: ShieldCheck,
    title: "You own everything",
    body: "The code, the data, and the accounts all belong to you. Nothing we build ties you to us or to a platform you can't walk away from.",
  },
  {
    icon: Blocks,
    title: "Ship in small increments",
    body: "You see working software early and often, so you can steer the direction while it's still cheap to change — not after the budget is spent.",
  },
  {
    icon: Code2,
    title: "Code built to be read",
    body: "Clear, documented, tested code that the next engineer — ours or yours — can pick up and extend without starting over.",
  },
  {
    icon: Eye,
    title: "Honest by default",
    body: "Straight answers on scope, timelines, and trade-offs — including the times a simpler, cheaper tool is the right call for you.",
  },
  {
    icon: MessageSquare,
    title: "Close communication",
    body: "You talk directly to the people writing your software, and you get quick, plain-spoken answers when something comes up.",
  },
];

export function Philosophy() {
  return (
    <Section id="philosophy" aria-labelledby="philosophy-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            How we build
          </p>
          <h2
            id="philosophy-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            The principles behind every build.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We don&apos;t have a wall of client logos yet — we&apos;re early, and
            we won&apos;t pretend otherwise. What we can show you is exactly how we
            work, so you can judge us on the things that decide whether software is
            worth trusting.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={(i % 3) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
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
