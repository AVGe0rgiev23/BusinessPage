import {
  Braces,
  Layers,
  Server,
  Database,
  Sparkles,
  Cloud,
  Plug,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

interface StackGroup {
  icon: LucideIcon;
  label: string;
  items: string[];
}

const STACK: StackGroup[] = [
  {
    icon: Braces,
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    icon: Layers,
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Server,
    label: "Backend & APIs",
    items: ["Node.js", "REST APIs", "GraphQL", "Webhooks"],
  },
  {
    icon: Workflow,
    label: "Background jobs & workflow infrastructure",
    items: [
      "Trigger.dev",
      "Queues",
      "Scheduled jobs",
      "Retries & concurrency controls",
      "Background workers",
    ],
  },
  {
    icon: Database,
    label: "Data & storage",
    items: ["PostgreSQL", "Redis", "Vector databases", "Object storage"],
  },
  {
    icon: Sparkles,
    label: "AI & LLM tooling",
    items: [
      "LLM APIs",
      "RAG pipelines",
      "Embeddings",
      "Vector search",
      "Agents",
      "Function calling",
    ],
  },
  {
    icon: Cloud,
    label: "Infrastructure & cloud",
    items: ["Vercel", "AWS", "Docker", "CI/CD", "Edge functions"],
  },
  {
    icon: Plug,
    label: "Integrations",
    items: [
      "CRMs",
      "Payments",
      "Email & messaging",
      "Calendars",
      "Third-party APIs",
    ],
  },
];

export function TechStack() {
  return (
    <Section
      id="stack"
      aria-labelledby="stack-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            The stack
          </p>
          <h2
            id="stack-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            What we build with
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            A well-supported, widely adopted toolset — the same tooling behind
            serious software products. Think of it as a toolkit, not a template:
            we choose the stack per project, and nothing on this list is
            mandatory.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal
                key={group.label}
                delay={(i % 3) * 0.08}
                className="h-full"
              >
                <li className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
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
                        className="rounded-full border border-border bg-bg-surface px-3 py-1 text-small text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-pretty text-body text-text-secondary">
            Long-running work — document processing, AI pipelines, scheduled
            syncs — runs on background-job infrastructure that handles retries,
            queues, concurrency, and monitoring, using a managed platform such as
            Trigger.dev Cloud or infrastructure that&apos;s hosted for the
            project. Where any of it lives, and whose accounts it runs under,
            depends on the delivery model you choose — not on the tools
            themselves.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
