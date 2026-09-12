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

/*
  These points used to claim published tools and libraries, and contributions
  sent back upstream. Neither has happened yet, and both are checkable in about
  fifteen seconds by the one kind of visitor most worth impressing. They were
  removed rather than hedged — the same edit was made to the home page's
  `home/open-source.tsx`, and the two must stay in step.

  What is left is what a GitHub profile genuinely evidences: readable code,
  a commit history, and the standards visible in both.
*/
const PROOF: Point[] = [
  {
    title: "Code you can read",
    body: "The repositories themselves, not screenshots of them. You can look at how something is actually put together before you decide whether to trust me with yours.",
  },
  {
    title: "History you can check",
    body: "Commits in order, so you can see how a project was really built rather than how it got described afterwards.",
  },
  {
    title: "Standards I hold",
    body: "How I structure, document, and review code, out in the open. Not a claim in a pitch deck — something you can go and check for yourself.",
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
              See how I build before you ever hire me.
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              Good engineering doesn&apos;t hide. My GitHub is the repositories
              themselves — the code, the commit history, and the standards I
              hold myself to when no one&apos;s watching.
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
              View my GitHub
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
