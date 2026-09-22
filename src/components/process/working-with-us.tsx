import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

/**
 * WorkingWithUs — the "what working together is actually like" section for the
 * Process page. Draws on the honest trust pillars (fast communication,
 * transparent development, long-term support, ownership on your terms) with an
 * experiential, day-to-day framing, distinct from the values framing used on
 * the About page.
 */
const PILLARS = [
  { id: "fastCommunication" },
  { id: "transparentDevelopment" },
  { id: "supportTerms" },
  { id: "ownershipTerms" },
] as const;

export async function WorkingWithUs() {
  const t = await getTranslations("process.workingWithUs");
  return (
    <Section
      id="working-with-us"
      aria-labelledby="working-with-us-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="02"
          eyebrow={t("heading.eyebrow")}
          headingId="working-with-us-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <PointList
          items={PILLARS.map((pillar) => ({
            title: t(`pillars.${pillar.id}.title`),
            body: t(`pillars.${pillar.id}.body`),
          }))}
          columns={2}
          className="mt-16 md:mt-20"
        />
      </Container>
    </Section>
  );
}
