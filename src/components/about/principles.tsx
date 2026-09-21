import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

/**
 * Principles — the values behind AGility, built on the honest trust pillars
 * (fast communication, transparent development, long-term support, ownership on
 * your terms). Written in a values / "why this is held to" voice, distinct from the
 * day-to-day experiential framing of the Process page's WorkingWithUs section.
 */
const PRINCIPLES = [
  { id: "fastCommunication" },
  { id: "transparentDevelopment" },
  { id: "longTermSupport" },
  { id: "ownershipTerms" },
] as const;

export async function Principles() {
  const t = await getTranslations("about.principles");
  return (
    <Section id="principles" aria-labelledby="principles-heading">
      <Container>
        <SectionHeading
          index="03"
          eyebrow={t("heading.eyebrow")}
          headingId="principles-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <PointList
          items={PRINCIPLES.map((principle) => ({
            title: t(`items.${principle.id}.title`),
            body: t(`items.${principle.id}.body`),
          }))}
          columns={2}
          className="mt-16 md:mt-20"
        />
      </Container>
    </Section>
  );
}
