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

/**
 * EngineeringInTheOpen — the About-page tie to GitHub / open source, framed
 * around trust: seeing how we work before you hire us.
 *
 * The 112px GitHub logo in a bordered square with an indigo glow behind it is
 * gone. It was the last surviving piece of the old palette in the codebase, and
 * it occupied half the section to communicate "GitHub" — which the button below
 * it already said, in words.
 */
const POINTS: Point[] = [
  {
    title: "Judge the work, not the pitch",
    body: "You can read how we write code before you ever sign anything. That’s a fairer basis for a decision than a polished sales deck.",
  },
  {
    title: "Tools we actually use",
    body: "We publish the libraries and utilities we build for our own projects, held to the same standard as the software we ship to clients.",
  },
  {
    title: "Contributing back",
    body: "A lot of what we build stands on open-source work, so we give back to the projects our software depends on.",
  },
];

export function EngineeringInTheOpen() {
  return (
    <Section
      id="in-the-open"
      aria-labelledby="in-the-open-heading"
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
                04
              </span>
              <Eyebrow>In the open</Eyebrow>
            </div>

            <h2
              id="in-the-open-heading"
              className="mt-7 max-w-[16ch] text-balance text-h2 font-semibold text-text-primary"
            >
              See how we work before you hire us.
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              We can&apos;t point you at fake five-star reviews, and we
              wouldn&apos;t want to. Instead, much of our work lives on GitHub —
              the tools we rely on, the contributions we make, and the standards
              we hold to when no one&apos;s watching.
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

          <PointList items={POINTS} className="lg:pt-1" />
        </div>
      </Container>
    </Section>
  );
}
