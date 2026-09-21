import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { PointList } from "@/components/shared/point-list";

/**
 * HowWeBuild — how AGility thinks about building software: custom vs low-code
 * (using the sanctioned, defensible framing near-verbatim), code ownership, and
 * building around how a business actually runs. Two-column editorial layout
 * with a sticky argument beside the principles.
 */
const PRINCIPLES = [
  { id: "builtAroundProcess" },
  { id: "ownershipDefinedClearly" },
  { id: "growsAsGrow" },
  { id: "portableDesign" },
] as const;

export async function HowWeBuild() {
  const t = await getTranslations("about.howWeBuild");
  const shared = await getTranslations("shared");
  return (
    <Section id="how-we-build" aria-labelledby="how-we-build-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                02
              </span>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </div>

            <h2
              id="how-we-build-heading"
              className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
            >
              {t("title")}
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              {shared("codeFirst")}
            </p>
            <p className="mt-4 max-w-[52ch] text-pretty text-body text-text-secondary">
              {t("second")}
            </p>
            <p className="mt-4 max-w-[52ch] text-pretty text-body text-text-secondary">
              {t("third")}
            </p>
          </Reveal>

          <PointList
            items={PRINCIPLES.map((principle) => ({
              title: t(`principles.${principle.id}.title`),
              body: t(`principles.${principle.id}.body`),
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
