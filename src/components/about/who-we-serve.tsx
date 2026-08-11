import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

/**
 * WhoWeServe — the audience AGility is built for (SMBs and growing companies
 * with repetitive workflows), plus the sanctioned geography (Europe-based,
 * available worldwide) and an HONEST, generic team statement.
 *
 * No fabricated people, bios, headcount, founding year, or history. The team
 * treatment speaks as "we" / "a small team" and leaves a clearly-marked TODO
 * slot for real member content — see the comment below.
 */
const AUDIENCE: Point[] = [
  {
    title: "Small & mid-sized businesses",
    body: "Big enough to feel the cost of manual work, small enough that a week of reclaimed hours changes what you can take on.",
  },
  {
    title: "Growing companies",
    body: "Scaling faster than your tools, where the workarounds that got you here are quietly becoming the thing holding you back.",
  },
  {
    title: "Repetitive workflows",
    body: "Wherever the same steps get done by hand over and over — the busywork that’s ready to be handed off to software.",
  },
];

export function WhoWeServe() {
  return (
    <Section
      id="who-we-serve"
      aria-labelledby="who-we-serve-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Who we serve"
          headingId="who-we-serve-heading"
          title="Built for growing businesses, wherever you are."
          lede="We work best with businesses that have real, repetitive work to hand off. We're based in Europe and work with clients worldwide."
        />

        <PointList items={AUDIENCE} className="mt-16 md:mt-20" />

        {/*
          The team — honest, generic statement only. NO fabricated names, bios,
          photos, headcount, or founding year.

          TODO: When real team content is approved, replace the generic
          statement below with actual team members (name, role, short bio,
          optional photo/GitHub/LinkedIn). Until then, this stays generic on
          purpose — do not invent people.
        */}
        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-xl border border-border bg-bg p-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12 md:p-10">
            <h3 className="text-h3 font-semibold text-text-primary">
              The team behind it
            </h3>
            <p className="max-w-[58ch] text-pretty text-body-lg text-text-secondary">
              AGility is a small, hands-on team. You work directly with the
              people building your software — the same people who answer when
              you have a question. No account managers, no handoffs.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
