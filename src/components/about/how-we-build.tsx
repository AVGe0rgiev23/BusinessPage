import { Blocks, ShieldCheck, TrendingUp, Network } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * HowWeBuild — how AGility thinks about building software: custom vs low-code
 * (using BUILD_PLAN's sanctioned, defensible framing near-verbatim), code
 * ownership, and building around how a business actually runs. Two-column
 * editorial layout with a compact principles list — distinct framing from the
 * home `WhyCustom` card grid. Server Component; `<h2>` + `<h3>` per principle.
 */
const PRINCIPLES = [
  {
    icon: Blocks,
    title: "Built around your process",
    body: "Off-the-shelf tools make you bend how you work to fit their assumptions. We do the opposite — shaping the software to the way you already run, then removing the friction you’d learned to live with.",
  },
  {
    icon: ShieldCheck,
    title: "Yours to own outright",
    body: "The code and the data belong to you. No per-seat rent on a platform you don’t control, and no rug-pull when a vendor changes its pricing or shuts down.",
  },
  {
    icon: TrendingUp,
    title: "Grows as you grow",
    body: "Custom software has room to handle more volume, more users, and more complexity — instead of hitting the ceiling a general-purpose builder puts on everyone.",
  },
  {
    icon: Network,
    title: "No builder to depend on",
    body: "Your business doesn’t hang on a third-party workflow tool staying online, supported, and affordable. What runs your operation is yours to keep running.",
  },
];

export function HowWeBuild() {
  return (
    <Section
      id="how-we-build"
      aria-labelledby="how-we-build-heading"
      className="bg-bg-surface"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
              How we build
            </p>
            <h2
              id="how-we-build-heading"
              className="mt-4 text-balance text-h2 font-semibold text-text-primary"
            >
              We build around how your business actually runs.
            </h2>
            <p className="mt-5 text-pretty text-body-lg text-text-secondary">
              We build custom software instead of relying primarily on low-code
              automation platforms. This gives you greater flexibility,
              ownership, scalability, and eliminates dependence on third-party
              workflow builders.
            </p>
            <p className="mt-4 text-pretty text-body text-text-secondary">
              Low-code tools are genuinely useful, and when one is the right
              answer we&apos;ll say so. But the more a process matters to your
              business, the more it pays to own it outright — rather than rent it
              from a platform that can change its rules, its pricing, or its
              availability overnight.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((principle, i) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={(i % 2) * 0.08}>
                  <li className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-body text-text-secondary">
                      {principle.body}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
