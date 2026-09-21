import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

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
const AUDIENCE = [
  { id: "smallMidSized" },
  { id: "growingCompanies" },
  { id: "repetitiveWorkflows" },
] as const;

export async function WhoWeServe() {
  const t = await getTranslations("about.whoWeServe");
  return (
    <Section
      id="who-we-serve"
      aria-labelledby="who-we-serve-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="05"
          eyebrow={t("heading.eyebrow")}
          headingId="who-we-serve-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <PointList
          items={AUDIENCE.map((audience) => ({
            title: t(`audience.${audience.id}.title`),
            body: t(`audience.${audience.id}.body`),
          }))}
          className="mt-16 md:mt-20"
        />

        {/*
          Who is behind it — one person, stated plainly. NO fabricated names,
          bios, photos, headcount, or founding year, and no drift back toward
          the plural: "team" here would be a claim about capacity that is not
          true, and it is the exact claim a buyer would feel misled about later.
        */}
        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-xl border border-border bg-bg p-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12 md:p-10">
            <h3 className="text-h3 font-semibold text-text-primary">
              {t("behind.title")}
            </h3>
            <p className="max-w-[58ch] text-pretty text-body-lg text-text-secondary">
              {t("behind.body")}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
