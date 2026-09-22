import { getTranslations } from "next-intl/server";
import { PRICING } from "@/lib/pricing";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Pricing — the published price list.
 *
 * These numbers used to live inside the FAQ accordion, behind an answer that
 * said "we don't publish standard rates". That is a defensible position for an
 * agency with a sales team and a terrible one for a solo operator: the visitor
 * who cannot find a number assumes the number is bad, and leaves rather than
 * asks. Publishing bands costs nothing and disqualifies the wrong enquiries
 * before they reach the inbox.
 *
 * ── Accuracy constraint, do not loosen ──────────────────────────────────────
 * The bands and the guarantee are commercial commitments, not marketing copy.
 * Change them only when the actual offer changes. The numbers live in
 * `src/lib/pricing.ts` and feed both this section and the FAQ answer "How does
 * pricing work?", so the two cannot disagree. No superlatives and no
 * exclamation marks: a price list is the one place on a website where a flat
 * tone is the persuasive one.
 *
 * Set as a ledger rather than three pricing cards. Cards imply tiers you choose
 * between, with the middle one highlighted; these are three different shapes of
 * engagement, and a hairline-ruled list says that without the false hierarchy.
 */
const TIERS = [
  { id: "pilot" },
  { id: "project" },
  { id: "support" },
] as const;

export async function Pricing() {
  const t = await getTranslations("home.pricing");
  return (
    <Section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="07"
          eyebrow={t("heading.eyebrow")}
          headingId="pricing-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="ul"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > li"
        >
          {TIERS.map((tier) => (
            <li
              key={tier.id}
              className="group grid gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline md:py-9"
            >
              <h3 className="text-h3 font-semibold text-text-primary">
                {t(`tiers.${tier.id}.name`)}
              </h3>

              <p className="max-w-[54ch] text-pretty text-body text-text-secondary">
                {t(`tiers.${tier.id}.body`)}
              </p>

              {/* Price last in the DOM but pinned right on desktop: the name is
                  what a visitor scans for, the number is what they stop on. */}
              <p className="md:text-right">
                <span className="tabular block text-h3 font-semibold text-text-primary transition-colors duration-[--duration-fast] group-hover:text-accent">
                  {t(`tiers.${tier.id}.price`, PRICING[tier.id])}
                </span>
                <span className="mt-1.5 block font-mono text-eyebrow uppercase text-text-muted">
                  {t(`tiers.${tier.id}.basis`)}
                </span>
              </p>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <div className="max-w-[62ch] border-l-2 border-accent pl-6">
            <p className="font-mono text-eyebrow uppercase text-accent">
              {t("guarantee.label")}
            </p>
            <p className="mt-4 text-pretty text-body-lg text-text-primary">
              {t("guarantee.promise")}
            </p>
            <p className="mt-4 text-pretty text-body text-text-secondary">
              {t("guarantee.note")}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
