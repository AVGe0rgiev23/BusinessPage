import {
  Sparkles,
  Code2,
  ShieldCheck,
  MessageSquare,
  HeartHandshake,
  Eye,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const REASONS = [
  {
    icon: Sparkles,
    title: "Built with modern AI",
    body: "We use current AI and language-model tooling where it earns its place — to solve real problems, not as a label on the box.",
  },
  {
    icon: Code2,
    title: "Fully custom software",
    body: "Everything is built for your business specifically. No forcing your process to fit someone else's template.",
  },
  {
    icon: ShieldCheck,
    title: "You own your code",
    body: "The software we build belongs to you — the code, the data, and the freedom to take it anywhere.",
  },
  {
    icon: MessageSquare,
    title: "Fast communication",
    body: "Direct access to the people building your software, and quick, straight answers when you need them.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term support",
    body: "We don't disappear at launch. We maintain and grow what we build alongside your business.",
  },
  {
    icon: Eye,
    title: "Transparent development",
    body: "Clear scope, honest timelines, and visible progress — you always know what you're paying for and why.",
  },
];

export function WhyAgility() {
  return (
    <Section id="why-agility" aria-labelledby="why-agility-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Why AGility
          </p>
          <h2
            id="why-agility-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            A partner, not just a vendor.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We keep it honest. No inflated claims — just the things that
            genuinely matter when you trust a team to build software your
            business depends on.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(i % 3) * 0.08}>
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
      </Container>
    </Section>
  );
}
