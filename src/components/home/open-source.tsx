import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { githubUrl } from "@/lib/site-config";

/**
 * OpenSource — proof that the engineering claim is checkable.
 *
 * The old version put a 112px GitHub logo in a bordered square with a radial
 * glow behind it, taking up half the section to say nothing the button beneath
 * it didn't already say. It is now a two-column split where the right side
 * carries the three actual points, hairline-ruled.
 *
 * Sits on the sunken background — the darkest surface on the site — so this and
 * the Connect band beneath it read as a single quieter passage between the
 * argument and the closing FAQ.
 */
const POINTS = [
  "We publish tools and libraries we build for our own work.",
  "We contribute back to the projects our software is built on.",
  "You can see how we write code before you ever hire us.",
];

export function OpenSource() {
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                09
              </span>
              <Eyebrow>Open source</Eyebrow>
            </div>

            <h2
              id="open-source-heading"
              className="mt-7 max-w-[14ch] text-balance text-h2 font-semibold text-text-primary"
            >
              We build in the open.
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

          <RevealGroup
            as="ul"
            className="border-t border-border lg:pt-2"
            selector=":scope > li"
          >
            {POINTS.map((point) => (
              <li
                key={point}
                className="border-b border-border py-6 text-pretty text-body text-text-secondary"
              >
                {point}
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
