import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList, type Point } from "@/components/shared/point-list";

/**
 * WhoWeServe — the audience AGility is built for (SMBs and growing companies
 * with repetitive workflows), plus the sanctioned geography (Europe-based,
 * available worldwide) and an honest statement of who is behind it.
 *
 * No fabricated people, bios, headcount, founding year, or history. AGility is
 * one person, and the block at the foot of this section says so in as many
 * words — it used to say "a small, hands-on team", which was the single most
 * misleading sentence on the site.
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
          eyebrow="Who I serve"
          headingId="who-we-serve-heading"
          title="Built for growing businesses, wherever you are."
          lede="I work best with businesses that have real, repetitive work to hand off. I'm based in Europe and work with clients worldwide."
        />

        <PointList items={AUDIENCE} className="mt-16 md:mt-20" />

        {/*
          Who is behind it — one person, stated plainly. NO fabricated names,
          bios, photos, headcount, or founding year, and no drift back toward
          the plural: "team" here would be a claim about capacity that is not
          true, and it is the exact claim a buyer would feel misled about later.
        */}
        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-xl border border-border bg-bg p-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12 md:p-10">
            <h3 className="text-h3 font-semibold text-text-primary">
              Who&apos;s behind it
            </h3>
            <p className="max-w-[58ch] text-pretty text-body-lg text-text-secondary">
              AGility is one person. You work directly with me — the same person
              who writes your software and answers when you have a question. No
              account managers, no handoffs, and no one to pass you along to.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
