import { ArrowUpRight, GitBranch, Star, Code2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { githubUrl } from "@/lib/site-config";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * EngineeringInTheOpen — the About-page tie to GitHub / open-source, framed
 * around trust: seeing how we work before you hire us. Reuses the shared
 * `GithubIcon` (imported read-only). Server Component; `<h2>` heading + `<h3>`
 * per point.
 */
const POINTS = [
  {
    icon: Star,
    title: "Judge the work, not the pitch",
    body: "You can read how we write code before you ever sign anything. That’s a fairer basis for a decision than a polished sales deck.",
  },
  {
    icon: Code2,
    title: "Tools we actually use",
    body: "We publish the libraries and utilities we build for our own projects, held to the same standard as the software we ship to clients.",
  },
  {
    icon: GitBranch,
    title: "Contributing back",
    body: "A lot of what we build stands on open-source work, so we give back to the projects our software depends on.",
  },
];

export function EngineeringInTheOpen() {
  return (
    <Section
      id="in-the-open"
      aria-labelledby="in-the-open-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-bg">
            <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:p-12">
              <div>
                <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
                  In the open
                </p>
                <h2
                  id="in-the-open-heading"
                  className="mt-4 text-balance text-h2 font-semibold text-text-primary"
                >
                  See how we work before you hire us.
                </h2>
                <p className="mt-5 text-pretty text-body-lg text-text-secondary">
                  We can&apos;t point you at fake five-star reviews, and we
                  wouldn&apos;t want to. Instead, much of our work lives on
                  GitHub — the tools we rely on, the contributions we make, and
                  the standards we hold to when no one&apos;s watching.
                </p>
                <ul className="mt-8 flex flex-col gap-4">
                  {POINTS.map((point) => {
                    const Icon = point.icon;
                    return (
                      <li key={point.title} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="text-body text-text-secondary">
                          <span className="font-medium text-text-primary">
                            {point.title}.
                          </span>{" "}
                          {point.body}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  render={
                    <a
                      href={githubUrl}
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
