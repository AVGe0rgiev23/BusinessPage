import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { PointList, type Point } from "@/components/shared/point-list";
import { githubUrl } from "@/lib/site-config";

const PROOF: Point[] = [
  {
    title: "Tools we build",
    body: "The libraries and utilities we write to make our own work faster, published so anyone can read, use, and pressure-test them.",
  },
  {
    title: "Contributions we make",
    body: "Fixes and improvements sent back to the open-source projects our software is built on — because the work should get better, not just ours.",
  },
  {
    title: "Standards we hold",
    body: "How we structure, document, and review code, out in the open. Not a claim in a pitch deck — something you can go and check for yourself.",
  },
];

export function GithubProjects() {
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                02
              </span>
              <Eyebrow>Open source</Eyebrow>
            </div>

            <h2
              id="open-source-heading"
              className="mt-7 max-w-[16ch] text-balance text-h2 font-semibold text-text-primary"
            >
              See how we build before you ever hire us.
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              Good engineering doesn&apos;t hide. A lot of our work lives on
              GitHub — the tools we rely on, the contributions we make, and the
              standards we hold ourselves to when no one&apos;s watching.
            </p>

            <Button
              size="lg"
              variant="secondary"
              render={
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" />
              }
              className={cn("group mt-9", focusRing)}
            >
              <GithubIcon className="size-5" aria-hidden="true" />
              View our GitHub
              <ArrowUpRight
                className="text-text-muted transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </Reveal>

          <PointList items={PROOF} className="lg:pt-1" />
        </div>
      </Container>
    </Section>
  );
}
