import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * DeliveryModels — the shared "one build, three ways to work together" section.
 *
 * This is a central commercial message, so it is deliberately written once and
 * reused (Home + Services) rather than re-stated in slightly different words on
 * each page. Terminology here is the site's canonical wording for the three
 * models: "fully managed", "client-owned", "hybrid".
 *
 * Deliberate accuracy constraints — do NOT loosen these when editing copy:
 *   - No model is labelled "recommended". The client chooses; AGility advises.
 *   - Software ownership, infrastructure ownership, and operational
 *     responsibility are kept as SEPARATE ideas (see the `owns` / `operates`
 *     rows), because a client can own the software while AGility operates it,
 *     or own the infrastructure while AGility maintains what runs on it.
 *   - Ownership is always framed as "according to the project agreement" —
 *     website copy cannot make the legal guarantee on its own.
 *
 * ── Why a matrix rather than three cards ────────────────────────────────────
 * Someone reading this is doing exactly one thing: comparing. Three cards force
 * them to hold column two in their head while they read column three. A matrix
 * with row-aligned fields lets them read *across* — "who holds the accounts?" —
 * which is the actual question. CSS subgrid keeps the four bands aligned no
 * matter how much text each model needs, so the comparison survives copy edits.
 *
 * Server Component. Renders `<h2>` + `<h3>` per model, so it must sit on a page
 * that already has its own `<h1>`.
 */
/*
  The copy for each model lives in the catalog (`shared.deliveryModels.models`).
  Each has a name, a tagline and a body, plus two deliberately separate facts:
    owns      — who holds the infrastructure and third-party accounts;
    operates  — who runs, monitors, and maintains it day to day.
*/
const MODELS = [
  { id: "fullyManaged" },
  { id: "clientOwned" },
  { id: "hybrid" },
] as const;

interface DeliveryModelsProps {
  /** Section landmark id; the labelling `<h2>` gets `${id}-heading`. */
  id?: string;
  /** Two-digit index shown in the section rule. */
  index?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Optional background utility (e.g. "bg-bg-surface") for section alternation. */
  className?: string;
}

export async function DeliveryModels({
  id = "delivery-models",
  index,
  eyebrow,
  heading,
  intro,
  className,
}: DeliveryModelsProps) {
  const t = await getTranslations("shared.deliveryModels");
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} className={className}>
      <Container>
        <SectionHeading
          index={index}
          eyebrow={eyebrow ?? t("eyebrow")}
          headingId={headingId}
          title={heading ?? t("heading")}
          lede={intro ?? t("intro")}
        />

        <RevealGroup
          as="ul"
          className={cn(
            "mt-16 grid gap-y-12 md:mt-20",
            // Four aligned bands: heading, description, infrastructure, operation.
            "lg:grid-cols-3 lg:gap-x-0 lg:gap-y-0 lg:grid-rows-[auto_auto_auto_auto]"
          )}
          selector=":scope > li"
        >
          {MODELS.map((model, i) => (
            <li
              key={model.id}
              className={cn(
                "group border-t border-border pt-8",
                "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-7 lg:pr-8",
                // Column rules rather than card borders. The models are facets
                // of one offer, and enclosing each in its own box says the
                // opposite.
                i > 0 && "lg:border-l lg:border-l-border lg:pl-8"
              )}
            >
              <div>
                <h3 className="text-h3 font-semibold text-text-primary">
                  {t(`models.${model.id}.name`)}
                </h3>
                <p className="mt-2 text-body font-medium text-accent">
                  {t(`models.${model.id}.tagline`)}
                </p>
              </div>

              <p className="mt-4 text-pretty text-body text-text-secondary lg:mt-0">
                {t(`models.${model.id}.body`)}
              </p>

              {/*
                Ownership and operation kept visibly separate — they are
                different questions, and conflating them is the single easiest
                way for this page to become inaccurate.
              */}
              <dl className="mt-6 border-t border-border pt-5 lg:mt-0">
                <dt className="font-mono text-eyebrow uppercase text-text-muted">
                  {t("infrastructureLabel")}
                </dt>
                <dd className="mt-2 text-small text-text-secondary">
                  {t(`models.${model.id}.owns`)}
                </dd>
              </dl>

              <dl className="mt-5 lg:mt-0">
                <dt className="font-mono text-eyebrow uppercase text-text-muted">
                  {t("runsLabel")}
                </dt>
                <dd className="mt-2 text-small text-text-secondary">
                  {t(`models.${model.id}.operates`)}
                </dd>
              </dl>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 border-t border-border pt-8">
          <p className="max-w-[80ch] text-pretty text-body text-text-secondary">
            {t.rich("footer", {
              em: (chunks) => (
                <span className="text-text-primary">{chunks}</span>
              ),
            })}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
