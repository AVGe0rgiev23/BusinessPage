import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

const PRINCIPLES = [
  { id: "startProblem" },
  { id: "ownershipPoint" },
  { id: "shipSmallIncrements" },
  { id: "codeBuiltRead" },
  { id: "honestDefault" },
  { id: "closeCommunication" },
] as const;

export async function Philosophy() {
  const t = await getTranslations("work.philosophy");
  return (
    <Section id="philosophy" aria-labelledby="philosophy-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow={t("heading.eyebrow")}
          headingId="philosophy-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <PointList
          items={PRINCIPLES.map((principle) => ({
            title: t(`principles.${principle.id}.title`),
            body: t(`principles.${principle.id}.body`),
          }))}
          columns={2}
          numbered
          className="mt-16 md:mt-20"
        />
      </Container>
    </Section>
  );
}
