import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Outcomes — what changes once the manual work is gone.
 *
 * Deliberately built on a *vertical* rule grid, where the section above it uses
 * horizontal rules and the one below uses a single enclosing panel. Section
 * variety here is structural, not decorative: three consecutive lists of six
 * things need three genuinely different shapes, or the page reads as one
 * endless grid no matter how nicely each cell is styled.
 *
 * The oversized numerals are the graphic element. No icons — a clock glyph next
 * to "Reclaimed time" is decoration pretending to be information.
 */
const OUTCOMES = [
  { id: "reclaimedTime" },
  { id: "lowerOperatingCosts" },
  { id: "fasterExecution" },
  { id: "fewerRepetitiveTasks" },
  { id: "betterCustomerExperience" },
  { id: "higherProductivity" },
] as const;

export async function Outcomes() {
  const t = await getTranslations("home.outcomes");
  return (
    <Section id="outcomes" aria-labelledby="outcomes-heading">
      <Container>
        <SectionHeading
          index="02"
          eyebrow={t("heading.eyebrow")}
          headingId="outcomes-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        {/*
          Column dividers are drawn with left borders on the items themselves
          rather than a background grid, so they survive reflow at every
          breakpoint without leaving orphaned lines beside a short final row.
        */}
        <RevealGroup
          as="ul"
          className="mt-16 grid border-t border-border sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
          selector=":scope > li"
        >
          {OUTCOMES.map((outcome, i) => (
            <li
              key={outcome.id}
              className={cn(
                "group relative border-b border-border py-9",
                /*
                  Each position states its border AND both paddings at every
                  breakpoint. Specifying only what changes looks tidier but is
                  a trap: at `lg` the two-up `even` rules still match items 4
                  and 6, so they keep a left border and left padding they
                  should have lost, and the second row ends up visibly
                  indented against the first.
                */
                "sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(odd)]:pr-10",
                "sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-10 sm:[&:nth-child(even)]:pr-0",
                "lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n+1)]:pr-10",
                "lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+2)]:pl-10 lg:[&:nth-child(3n+2)]:pr-10",
                "lg:[&:nth-child(3n+3)]:border-l lg:[&:nth-child(3n+3)]:pl-10 lg:[&:nth-child(3n+3)]:pr-0"
              )}
            >
              <span
                aria-hidden="true"
                className="tabular block font-mono text-h3 font-light text-text-muted/70 transition-colors duration-[--duration-base] group-hover:text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-h4 font-semibold text-text-primary">
                {t(`items.${outcome.id}.title`)}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-pretty text-body text-text-secondary">
                {t(`items.${outcome.id}.body`)}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
