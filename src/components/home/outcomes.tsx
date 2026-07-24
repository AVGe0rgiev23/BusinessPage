import {
  Clock,
  TrendingDown,
  Zap,
  ListChecks,
  Smile,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const OUTCOMES = [
  {
    icon: Clock,
    title: "Reclaimed time",
    body: "The routine work runs on its own, handing your team back hours every week for the things only people can do.",
  },
  {
    icon: TrendingDown,
    title: "Lower operating costs",
    body: "Fewer hours spent on manual tasks means the same output for less — and headroom to grow without growing overhead.",
  },
  {
    icon: Zap,
    title: "Faster execution",
    body: "Work that used to wait in a queue happens the moment it's triggered. Quotes, replies, and handoffs stop stalling.",
  },
  {
    icon: ListChecks,
    title: "Fewer repetitive tasks",
    body: "The copy-paste, the re-typing, the chasing — handled automatically, consistently, and without anyone having to remember.",
  },
  {
    icon: Smile,
    title: "A better customer experience",
    body: "Faster answers and fewer dropped balls. Customers feel the difference long before they know software is behind it.",
  },
  {
    icon: TrendingUp,
    title: "Higher productivity",
    body: "Your people spend their day on judgement, relationships, and growth instead of shuffling data between screens.",
  },
];

export function Outcomes() {
  return (
    <Section id="outcomes" aria-labelledby="outcomes-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            The outcome
          </p>
          <h2
            id="outcomes-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Software that gives you the hours back.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We start from the result you want, not the technology. Here&apos;s
            what changes once the manual work is off your team&apos;s plate.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((outcome, i) => {
            const Icon = outcome.icon;
            return (
              <Reveal key={outcome.title} delay={(i % 3) * 0.08}>
                <li className="group h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {outcome.body}
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
