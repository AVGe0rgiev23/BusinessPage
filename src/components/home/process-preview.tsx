import Link from "next/link";
import { Search, PenTool, Hammer, Rocket, LifeBuoy, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const STEPS = [
  {
    icon: Search,
    title: "Discovery",
    body: "We map where the time and money are going, and agree on what a win looks like before any code is written.",
  },
  {
    icon: PenTool,
    title: "Design",
    body: "We plan the solution and how it fits your existing tools, so there are no surprises once the build begins.",
  },
  {
    icon: Hammer,
    title: "Build",
    body: "We develop in focused increments, sharing progress as we go so you always know exactly where things stand.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    body: "We roll it out carefully, test it against real work, and make sure your team is comfortable using it.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    body: "We stay on to maintain, refine, and extend the software as your business changes over time.",
  },
];

export function ProcessPreview() {
  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            How we work
          </p>
          <h2
            id="process-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            A clear path from problem to production.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            No black boxes. You&apos;ll know what&apos;s happening at every stage
            — and why it matters for your business.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.06} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-small text-text-muted"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-small text-text-secondary">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/process"
            className={`group inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
          >
            See our full process
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
