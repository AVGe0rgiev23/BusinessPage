import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

const REASONS = [
  { id: "reliability" },
  { id: "portability" },
  { id: "performance" },
  { id: "longTermMaintainability" },
] as const;

export async function WhyThisStack() {
  const t = await getTranslations("technologies.whyThisStack");
  return (
    <Section
      aria-labelledby="why-stack-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="02"
          eyebrow={t("heading.eyebrow")}
          headingId="why-stack-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <PointList
          items={REASONS.map((reason) => ({
            title: t(`reasons.${reason.id}.title`),
            body: t(`reasons.${reason.id}.body`),
          }))}
          columns={2}
          className="mt-16 md:mt-20"
        />

        <Reveal className="mt-12">
          <p className="max-w-[72ch] text-pretty text-body text-text-secondary">
            {t("closing")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
