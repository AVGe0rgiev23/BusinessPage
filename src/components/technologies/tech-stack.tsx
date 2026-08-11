import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * TechStack — the full toolset, as a spec sheet.
 *
 * Eight categories in a two-column definition list: category on the left, tools
 * on the right, hairline-ruled. The homepage shows an abridged five-group
 * version in the same shape, so this reads as the full reference rather than a
 * different page's take on the same facts.
 */
interface StackGroup {
  label: string;
  items: string[];
}

const STACK: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "REST APIs", "GraphQL", "Webhooks"],
  },
  {
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
    label: "Data & storage",
    items: ["PostgreSQL", "Redis", "Vector databases", "Object storage"],
  },
  {
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
    label: "Infrastructure & cloud",
    items: ["Vercel", "AWS", "Docker", "CI/CD", "Edge functions"],
  },
  {
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
    <Section id="stack" aria-labelledby="stack-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="The stack"
          headingId="stack-heading"
          title="What we build with"
          lede="A well-supported, widely adopted toolset — the same tooling behind serious software products. Think of it as a toolkit, not a template: we choose the stack per project, and nothing on this list is mandatory."
        />

        <RevealGroup
          as="dl"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > div"
        >
          {STACK.map((group) => (
            <div
              key={group.label}
              className="grid gap-x-10 gap-y-4 border-b border-border py-7 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-baseline lg:gap-x-16"
            >
              <dt className="max-w-[26ch] font-mono text-eyebrow uppercase text-text-secondary">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border bg-bg-surface px-2.5 py-1 text-small text-text-primary transition-colors duration-[--duration-fast] hover:border-border-hover"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
