import { ArrowUpRight, GitBranch, GitPullRequest, ScrollText } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { githubUrl } from "@/lib/site-config";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const PROOF = [
  {
    icon: GitBranch,
    title: "Tools we build",
    body: "The libraries and utilities we write to make our own work faster, published so anyone can read, use, and pressure-test them.",
  },
  {
    icon: GitPullRequest,
    title: "Contributions we make",
    body: "Fixes and improvements sent back to the open-source projects our software is built on — because the work should get better, not just ours.",
  },
  {
    icon: ScrollText,
    title: "Standards we hold",
    body: "How we structure, document, and review code, out in the open. Not a claim in a pitch deck — something you can go and check for yourself.",
  },
];

export function GithubProjects() {
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-bg-elevated text-text-primary">
            <GithubIcon className="size-7" aria-hidden="true" />
          </span>
          <p className="mt-6 text-eyebrow font-mono uppercase tracking-wider text-accent">
            Open source
          </p>
          <h2
            id="open-source-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            See how we build before you ever hire us.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            Good engineering doesn&apos;t hide. A lot of our work lives on GitHub
            — the tools we rely on, the contributions we make, and the standards
            we hold ourselves to when no one&apos;s watching.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {PROOF.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <Button
            render={
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" />
            }
            className={`group h-12 rounded-full px-7 text-base hover:bg-accent-hover ${focusRing}`}
          >
            <GithubIcon className="size-5" aria-hidden="true" />
            View our GitHub
            <ArrowUpRight
              className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
