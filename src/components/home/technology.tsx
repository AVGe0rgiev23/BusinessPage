import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Technology — the stack, as a spec sheet.
 *
 * A definition list: category on the left, the tools under it on the right,
 * separated by hairlines. This is how a technical reference document would
 * present the same information, and it is far quicker to scan than five
 * bordered cards each with its own icon.
 *
 * The chips are the one place on the site where the same small pill shape
 * repeats many times — which is fine, because here the repetition *is* the
 * information. They are a set of like things.
 */
const STACK = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frameworks & runtime",
    items: ["React", "Next.js", "Node.js"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Redis", "Vector databases"],
  },
  {
    label: "AI & LLM tooling",
    items: ["LLM APIs", "RAG pipelines", "Embeddings", "Agent frameworks"],
  },
  {
    label: "Cloud & infrastructure",
    items: ["Vercel", "AWS", "Docker", "CI/CD"],
  },
];

export function Technology() {
  return (
    <Section id="technology" aria-labelledby="technology-heading">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Our stack"
          headingId="technology-heading"
          title="Built on modern, proven engineering."
          lede="We work with a well-supported, widely adopted stack — the same tooling behind serious software products, chosen for reliability and longevity rather than novelty."
        />

        <RevealGroup
          as="dl"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > div"
        >
          {STACK.map((group) => (
            <div
              key={group.label}
              className="grid gap-x-10 gap-y-4 border-b border-border py-7 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-baseline lg:gap-x-16"
            >
              <dt className="font-mono text-eyebrow uppercase text-text-secondary">
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

        <div className="mt-10">
          <Link
            href="/technologies"
            className={cn(arrowLink, focusRing)}
          >
            Explore our technologies
            <ArrowRight
              className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
