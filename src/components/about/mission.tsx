import { Clock, TrendingDown, Zap } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * Mission — the outcomes-first statement of why AGility exists. Deliberately
 * editorial (narrative + a slim three-outcome strip) so it reads differently
 * from the card-heavy home `Outcomes` section rather than duplicating it.
 * Server Component; `<h2>` heading.
 */
const OUTCOMES = [
  { icon: Clock, label: "Save time" },
  { icon: TrendingDown, label: "Cut costs" },
  { icon: Zap, label: "Move faster" },
];

export function Mission() {
  return (
    <Section id="mission" aria-labelledby="mission-heading">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Our mission
          </p>
          <h2
            id="mission-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            We sell outcomes, not software.
          </h2>
          <div className="mt-6 flex flex-col gap-5 text-pretty text-body-lg text-text-secondary">
            <p>
              Businesses don&apos;t wake up wanting &ldquo;AI&rdquo; or
              &ldquo;automation.&rdquo; They wake up thinking we&apos;re wasting
              hours, we&apos;re drowning in email, our leads aren&apos;t getting
              answered, we&apos;re paying good people to copy and paste. AGility
              exists to fix that. The technology is simply how we do it.
            </p>
            <p>
              So we start from the result: the hours you get back, the costs you
              stop paying, the speed you gain on the work that actually makes you
              money. If a project can&apos;t be tied to one of those, it
              isn&apos;t worth building — and we&apos;ll tell you so plainly,
              even when it means talking ourselves out of work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {OUTCOMES.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <li
                  key={outcome.label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-bg-surface px-5 py-4"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-body font-medium text-text-primary">
                    {outcome.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
