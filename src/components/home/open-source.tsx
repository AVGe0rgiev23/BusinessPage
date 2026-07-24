import { ArrowUpRight, GitBranch, Star, Code2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const POINTS = [
  {
    icon: Code2,
    text: "We publish tools and libraries we build for our own work.",
  },
  {
    icon: GitBranch,
    text: "We contribute back to the projects our software is built on.",
  },
  {
    icon: Star,
    text: "You can see how we write code before you ever hire us.",
  },
];

export function OpenSource() {
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-bg">
            <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:p-12">
              <div>
                <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
                  Open source
                </p>
                <h2
                  id="open-source-heading"
                  className="mt-4 text-balance text-h2 font-semibold text-text-primary"
                >
                  We build in the open.
                </h2>
                <p className="mt-5 text-pretty text-body-lg text-text-secondary">
                  Good engineering doesn&apos;t hide. A lot of our work lives on
                  GitHub — the tools we rely on, the contributions we make, and
                  the standards we hold ourselves to when no one&apos;s watching.
                </p>
                <ul className="mt-8 flex flex-col gap-4">
                  {POINTS.map((point) => {
                    const Icon = point.icon;
                    return (
                      <li key={point.text} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="text-body text-text-secondary">
                          {point.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  /* TODO: real GitHub URL */
                  render={
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  className={`group mt-9 h-12 rounded-full px-7 text-base hover:bg-accent-hover ${focusRing}`}
                >
                  <GithubIcon className="size-5" aria-hidden="true" />
                  View our GitHub
                  <ArrowUpRight
                    className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>

              <div
                aria-hidden="true"
                className="relative hidden aspect-square items-center justify-center rounded-2xl border border-border bg-bg-surface md:flex"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-60"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(90,110,255,0.18), transparent 75%)",
                  }}
                />
                <GithubIcon className="relative size-28 text-text-primary/90" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
