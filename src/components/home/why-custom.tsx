import Link from "next/link";
import {
  ShieldCheck,
  Settings,
  TrendingUp,
  Blocks,
  Network,
  Gauge,
  ArrowRight,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Ownership",
    body: "The custom software we build for you is yours under the project agreement — not a per-seat licence on a builder you don't control.",
  },
  {
    icon: Settings,
    title: "Flexibility",
    body: "It does exactly what your business needs — not just what a drag-and-drop builder happens to support.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    body: "Built to handle more volume, more users, and more complexity as you grow, without hitting a platform ceiling.",
  },
  {
    icon: Blocks,
    title: "No unnecessary lock-in",
    body: "We build on standard, portable technologies wherever practical, so your core process doesn't hinge on one proprietary builder's pricing or roadmap.",
  },
  {
    icon: Network,
    title: "Better integrations",
    body: "Connect deeply to the systems you already use, with the control that pre-packaged connectors rarely give you.",
  },
  {
    icon: Gauge,
    title: "Performance",
    body: "Software tuned to your workload runs faster and more reliably than a general-purpose platform doing everything for everyone.",
  },
];

export function WhyCustom() {
  return (
    <Section id="why-custom" aria-labelledby="why-custom-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
              Custom vs. low-code
            </p>
            <h2
              id="why-custom-heading"
              className="mt-4 text-balance text-h2 font-semibold text-text-primary"
            >
              Own your software. Don&apos;t rent your workflow.
            </h2>
            <p className="mt-5 text-pretty text-body-lg text-text-secondary">
              We&apos;re code-first: the processes your business runs on get
              built as software, rather than assembled inside a proprietary
              visual workflow builder. That buys you flexibility, clearer
              ownership, and room to grow.
            </p>
            <p className="mt-4 text-pretty text-body text-text-secondary">
              Low-code tools have their place, and we&apos;ll tell you honestly
              when one is the right call — including when it means a smaller
              project for us. But as a process becomes central to how you make
              money, owning it tends to pay off.
            </p>
            <p className="mt-4 text-pretty text-body text-text-secondary">
              We use third-party services ourselves — cloud hosting, databases,
              AI providers. Nobody builds without them. The difference is that we
              avoid unnecessary platform lock-in and stick to standard, portable
              technology wherever it&apos;s practical.
            </p>
            <Link
              href="/services"
              className={`group mt-6 inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
            >
              How we approach a build
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
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
        </div>
      </Container>
    </Section>
  );
}
