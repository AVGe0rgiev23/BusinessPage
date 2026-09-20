import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * WhyCustom — the custom vs. low-code comparison.
 *
 * This used to be six more bordered cards sitting next to a wall of prose. It
 * is a *comparison*, so it is now built as one: a real matrix, six dimensions,
 * two columns, hairline ruled.
 *
 * ── Accuracy constraint, do not loosen ──────────────────────────────────────
 * Every cell below is taken near-verbatim from copy that was already on this
 * page. Nothing about low-code platforms is asserted here that the site did not
 * already say in prose. A comparison table is a persuasive format and it would
 * be very easy to start inventing weaknesses for the other column — don't. If a
 * claim cannot be traced to existing approved copy, it does not go in the
 * table.
 *
 * The honest caveat ("low-code tools have their place, and I'll tell you when
 * one is the right call") is kept directly underneath, where it belongs. It is
 * the most trust-building sentence in the section.
 */
const DIMENSIONS = [
  { id: "ownership" },
  { id: "flexibility" },
  { id: "scalability" },
  { id: "lock" },
  { id: "integrations" },
  { id: "performance" },
] as const;

export async function WhyCustom() {
  const t = await getTranslations("home.whyCustom");
  return (
    <Section id="why-custom" aria-labelledby="why-custom-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={t("heading.eyebrow")}
          headingId="why-custom-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <Reveal className="mt-16 md:mt-20">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {t("table.caption")}
            </caption>
            <thead className="sr-only md:not-sr-only">
              <tr>
                <th
                  scope="col"
                  className="w-[18%] border-b border-border pb-4 font-mono text-eyebrow font-normal uppercase text-text-muted"
                >
                  <span className="sr-only">{t("table.dimension")}</span>
                </th>
                <th
                  scope="col"
                  className="w-[41%] border-b border-accent-line pb-4 pl-6 font-mono text-eyebrow font-normal uppercase text-accent"
                >
                  {t("table.customColumn")}
                </th>
                <th
                  scope="col"
                  className="w-[41%] border-b border-border pb-4 pl-6 font-mono text-eyebrow font-normal uppercase text-text-muted"
                >
                  {t("table.lowCodeColumn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((row) => (
                <tr
                  key={row.id}
                  className="group block border-b border-border py-6 md:table-row md:py-0"
                >
                  <th
                    scope="row"
                    className="block font-mono text-eyebrow font-normal uppercase text-text-primary md:table-cell md:w-[18%] md:py-6 md:pr-6 md:align-top md:text-text-secondary md:transition-colors md:group-hover:text-text-primary"
                  >
                    {t(`dimensions.${row.id}.dimension`)}
                  </th>
                  {/*
                    The custom column carries a faint copper wash and a copper
                    left rule so the eye knows which side of the comparison the
                    page is arguing for, without shouting about it.
                  */}
                  <td className="block pt-3 md:table-cell md:border-l md:border-accent-line md:bg-accent-subtle/40 md:py-6 md:pl-6 md:align-top md:transition-colors md:group-hover:bg-accent-subtle">
                    <span className="mb-1 block font-mono text-eyebrow uppercase text-accent md:hidden">
                      {t("table.customShort")}
                    </span>
                    <span className="text-body text-text-primary">
                      {t(`dimensions.${row.id}.custom`)}
                    </span>
                  </td>
                  <td className="block pt-3 md:table-cell md:border-l md:border-border md:py-6 md:pl-6 md:align-top">
                    <span className="mb-1 block font-mono text-eyebrow uppercase text-text-muted md:hidden">
                      {t("table.lowCodeShort")}
                    </span>
                    <span className="text-body text-text-secondary">
                      {t(`dimensions.${row.id}.lowCode`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* The caveat. Two columns of prose, deliberately set narrower than the
            table above so the section closes rather than continuing. */}
        <Reveal className="mt-14 grid max-w-5xl gap-x-14 gap-y-5 md:grid-cols-2">
          <p className="text-pretty text-body text-text-secondary">
            {t("caveat.first")}
          </p>
          <p className="text-pretty text-body text-text-secondary">
            {t("caveat.second")}
          </p>
          <div className="md:col-span-2">
            <Link
              href="/services"
              className={cn(arrowLink, focusRing)}
            >
              {t("approachLink")}
              <ArrowRight
                className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
