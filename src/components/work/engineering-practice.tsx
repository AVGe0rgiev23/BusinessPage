import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * EngineeringPractice — the invisible standards.
 *
 * Set as a specification list: monospace uppercase headings over hairline
 * rules, three up. It sits directly beneath `Philosophy`, which uses the shared
 * `PointList`, so it deliberately takes a different shape — two adjacent
 * sections of six short titled paragraphs would otherwise read as one long
 * undifferentiated list twelve items deep.
 */
const PRACTICES = [
  { id: "reviewedRushed" },
  { id: "testedWhereCounts" },
  { id: "handledCare" },
  { id: "documentedAsGo" },
  { id: "shippedThroughPipeline" },
  { id: "measuredThenTuned" },
] as const;

export async function EngineeringPractice() {
  const t = await getTranslations("work.engineeringPractice");
  return (
    <Section
      id="engineering-practice"
      aria-labelledby="engineering-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow={t("heading.eyebrow")}
          headingId="engineering-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
          selector=":scope > li"
        >
          {PRACTICES.map((practice, i) => (
            <li key={practice.id} className="group border-t border-border pt-5">
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-eyebrow text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-eyebrow uppercase text-text-primary">
                  {t(`practices.${practice.id}.title`)}
                </h3>
              </div>
              <p className="mt-3 max-w-[44ch] text-pretty text-small text-text-secondary">
                {t(`practices.${practice.id}.body`)}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
