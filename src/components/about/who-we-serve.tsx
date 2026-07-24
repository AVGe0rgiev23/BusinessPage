import { Users, TrendingUp, Repeat } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * WhoWeServe — the audience AGility is built for (SMBs and growing companies
 * with repetitive workflows), plus the geography sanctioned by BUILD_PLAN
 * (Europe-based, available worldwide) and an HONEST, generic team statement.
 *
 * No fabricated people, bios, headcount, founding year, or history. The team
 * treatment speaks as "we"/"a small team" and leaves a clearly-marked TODO
 * slot for real member content — see the comment below.
 *
 * Server Component; `<h2>` heading + `<h3>` per audience + a `<h3>` for the team.
 */
const AUDIENCE = [
  {
    icon: Users,
    title: "Small & mid-sized businesses",
    body: "Big enough to feel the cost of manual work, small enough that a week of reclaimed hours changes what you can take on.",
  },
  {
    icon: TrendingUp,
    title: "Growing companies",
    body: "Scaling faster than your tools, where the workarounds that got you here are quietly becoming the thing holding you back.",
  },
  {
    icon: Repeat,
    title: "Repetitive workflows",
    body: "Wherever the same steps get done by hand over and over — the busywork that’s ready to be handed off to software.",
  },
];

export function WhoWeServe() {
  return (
    <Section id="who-we-serve" aria-labelledby="who-we-serve-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Who we serve
          </p>
          <h2
            id="who-we-serve-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Built for growing businesses, wherever you are.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We work best with businesses that have real, repetitive work to hand
            off. We&apos;re based in Europe and work with clients worldwide.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-3">
          {AUDIENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
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

        {/*
          The team — honest, generic statement only. NO fabricated names, bios,
          photos, headcount, or founding year.

          TODO: When real team content is approved, replace the generic
          statement below with actual team members (name, role, short bio,
          optional photo/GitHub/LinkedIn). Until then, this stays generic on
          purpose — do not invent people.
        */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-bg-surface p-8 text-center md:p-10">
            <h3 className="text-h3 font-semibold text-text-primary">
              The team behind it
            </h3>
            <p className="mt-3 text-pretty text-body-lg text-text-secondary">
              AGility is a small, hands-on team. You work directly with the
              people building your software — the same people who answer when you
              have a question. No account managers, no handoffs.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
