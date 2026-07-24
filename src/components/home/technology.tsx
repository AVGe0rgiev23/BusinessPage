import Link from "next/link";
import { Braces, Layers, Database, Sparkles, Cloud, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const STACK = [
  {
    icon: Braces,
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    icon: Layers,
    label: "Frameworks & runtime",
    items: ["React", "Next.js", "Node.js"],
  },
  {
    icon: Database,
    label: "Data",
    items: ["PostgreSQL", "Redis", "Vector databases"],
  },
  {
    icon: Sparkles,
    label: "AI & LLM tooling",
    items: ["LLM APIs", "RAG pipelines", "Embeddings", "Agent frameworks"],
  },
  {
    icon: Cloud,
    label: "Cloud & infrastructure",
    items: ["Vercel", "AWS", "Docker", "CI/CD"],
  },
];

export function Technology() {
  return (
    <Section id="technology" aria-labelledby="technology-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Our stack
          </p>
          <h2
            id="technology-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Built on modern, proven engineering.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We work with a well-supported, widely adopted stack — the same
            tooling behind serious software products, chosen for reliability and
            longevity rather than novelty.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.label} delay={(i % 3) * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="text-eyebrow font-mono uppercase tracking-wider text-text-secondary">
                      {group.label}
                    </h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-bg px-3 py-1 text-small text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/technologies"
            className={`group inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
          >
            Explore our technologies
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
