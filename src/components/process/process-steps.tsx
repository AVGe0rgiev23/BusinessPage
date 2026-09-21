import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * ProcessSteps — the full, detailed engagement path for the Process page.
 *
 * Expands the five-step home preview (`home/process-preview.tsx`) into a
 * walkthrough. Each step spells out three things: what happens, what the client
 * walks away with, and the transparency angle.
 *
 * Laid out as a numbered document with a hanging step column rather than five
 * bordered cards each containing two more bordered sub-cards. The old version
 * nested a card inside a card inside a card — three levels of border for one
 * paragraph of text — which is exactly the reflex this redesign exists to break.
 * Here the two supporting facts hang off a hairline instead.
 *
 * Copy strings use real typographic characters and are rendered as JSX
 * expressions, so no entity escaping is needed.
 */
const STEPS = [
  { id: "discovery" },
  { id: "scopingDesign" },
  { id: "build" },
  { id: "deploy" },
  { id: "supportIterate" },
] as const;

export async function ProcessSteps() {
  const t = await getTranslations("process.steps");
  return (
    <Section id="steps" aria-labelledby="steps-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow={t("heading.eyebrow")}
          headingId="steps-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="ol"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > li"
        >
          {STEPS.map((step, i) => (
            <li key={step.id} className="group border-b border-border py-10">
              <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                {/* Hanging step column */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span
                    aria-hidden="true"
                    className="tabular font-mono text-eyebrow uppercase text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
                  >
                    {t("stepLabel", { number: String(i + 1).padStart(2, "0") })}
                  </span>
                  <h3 className="mt-3 text-h3 font-semibold text-text-primary">
                    {t(`items.${step.id}.title`)}
                  </h3>
                </div>

                <div>
                  <p className="max-w-[68ch] text-pretty text-body text-text-secondary">
                    {t(`items.${step.id}.lead`)}
                  </p>

                  {/* The two supporting facts hang off a rule rather than
                      sitting in nested boxes. */}
                  <dl className="mt-7 grid gap-x-10 gap-y-5 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-eyebrow uppercase text-text-muted">
                        {t("labels.deliverable")}
                      </dt>
                      <dd className="mt-2 text-pretty text-small text-text-secondary">
                        {t(`items.${step.id}.deliverable`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-eyebrow uppercase text-text-muted">
                        {t("labels.transparency")}
                      </dt>
                      <dd className="mt-2 text-pretty text-small text-text-secondary">
                        {t(`items.${step.id}.transparency`)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
