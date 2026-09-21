import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * Mission — the outcomes-first statement of why AGility exists.
 *
 * Deliberately the most text-led section on the site: no list, no grid, just a
 * generous measure of prose with the three outcomes as a closing strip. It is
 * the one place where the company gets to simply say what it thinks, and
 * chopping that into cards would undercut it.
 */
const OUTCOMES = ["saveTime", "cutCosts", "scaleFaster"] as const;

export async function Mission() {
  const t = await getTranslations("about.mission");
  return (
    <Section id="mission" aria-labelledby="mission-heading">
      <Container>
        <Reveal className="max-w-[68ch]">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="tabular font-mono text-eyebrow text-accent"
            >
              01
            </span>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>

          <h2
            id="mission-heading"
            className="mt-7 max-w-[16ch] text-balance text-h2 font-semibold text-text-primary"
          >
            {t("title")}
          </h2>

          <div className="mt-7 flex flex-col gap-5 text-pretty text-body-lg text-text-secondary">
            <p>
              {t("first")}
            </p>
            <p>
              {t("second")}
            </p>
          </div>
        </Reveal>

        {/* The three outcomes as a rule-separated strip. These were the home
            hero headline until it was rewritten to lead with the buyer's
            problem instead; they still work here, where the surrounding prose
            has already earned them. */}
        <RevealGroup
          as="ul"
          className="mt-14 grid border-t border-border sm:grid-cols-3"
          selector=":scope > li"
        >
          {OUTCOMES.map((outcome, i) => (
            <li
              key={outcome}
              className={`border-b border-border py-6 sm:py-8 ${
                i > 0 ? "sm:border-l sm:pl-8" : ""
              } ${i < OUTCOMES.length - 1 ? "sm:pr-8" : ""}`}
            >
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-text-muted"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-h3 font-semibold text-text-primary">
                {t(`outcomes.${outcome}`)}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
