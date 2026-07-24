import Link from "next/link";
import {
  ShieldCheck,
  Settings,
  TrendingUp,
  Blocks,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const POINTS: { icon: LucideIcon; label: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    label: "Ownership",
    desc: "The software is yours to keep, run, and change — not rented from a platform you don't control.",
  },
  {
    icon: Settings,
    label: "Flexibility",
    desc: "It does exactly what your business needs, not just what a drag-and-drop builder happens to support.",
  },
  {
    icon: TrendingUp,
    label: "Scalability",
    desc: "It grows with your volume and complexity instead of hitting a platform ceiling.",
  },
  {
    icon: Blocks,
    label: "No third-party lock-in",
    desc: "Your business doesn't depend on a workflow builder staying online, supported, and affordable.",
  },
];

export function WhyCustomCallout() {
  return (
    <Section aria-labelledby="why-custom-heading">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-border bg-bg-surface p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
              <div>
                <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
                  Custom vs. off-the-shelf
                </p>
                <h2
                  id="why-custom-heading"
                  className="mt-4 text-balance text-h2 font-semibold text-text-primary"
                >
                  Why custom, not off-the-shelf
                </h2>
                <p className="mt-5 text-pretty text-body-lg text-text-secondary">
                  We build custom software instead of relying primarily on
                  low-code automation platforms. This gives you greater
                  flexibility, ownership, scalability, and eliminates dependence
                  on third-party workflow builders.
                </p>
                <p className="mt-4 text-pretty text-body text-text-secondary">
                  Off-the-shelf tools and low-code platforms have their place,
                  and we&apos;ll tell you honestly when one is the right fit. But
                  as a process becomes central to how you make money, owning it
                  tends to pay off more than renting it from a builder that can
                  change its pricing or shut down.
                </p>
                <Link
                  href="/process"
                  className={`group mt-6 inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
                >
                  See how we work
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <ul className="grid gap-3">
                {POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li
                      key={point.label}
                      className="flex items-start gap-3 rounded-xl border border-border bg-bg p-4"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-body font-medium text-text-primary">
                          {point.label}
                        </p>
                        <p className="mt-0.5 text-small text-text-secondary">
                          {point.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
