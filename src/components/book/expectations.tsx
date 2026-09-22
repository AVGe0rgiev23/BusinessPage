import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

const ITEMS = [
  { id: "thirtyMinutes" },
  { id: "freeNoObligation" },
  { id: "whereLosingTime" },
  { id: "honestAnswer" },
] as const;

export async function Expectations() {
  const t = await getTranslations("book.expectations");
  return (
    <Section aria-labelledby="expect-heading" className="pt-0">
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <h2
            id="expect-heading"
            className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[54ch] text-pretty text-body-lg text-text-secondary">
            {t("lede")}
          </p>
        </Reveal>

        <PointList
          items={ITEMS.map((item) => ({
            title: t(`items.${item.id}.title`),
            body: t(`items.${item.id}.body`),
          }))}
          columns={2}
          numbered
          className="mt-14"
        />
      </Container>
    </Section>
  );
}
