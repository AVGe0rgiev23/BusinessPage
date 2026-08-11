import Link from "next/link";
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
 * The honest caveat ("low-code tools have their place, and we'll tell you when
 * one is the right call") is kept directly underneath, where it belongs. It is
 * the most trust-building sentence in the section.
 */
const DIMENSIONS = [
  {
    dimension: "Ownership",
    custom: "Yours under the project agreement.",
    lowCode: "A per-seat licence on a builder you don't control.",
  },
  {
    dimension: "Flexibility",
    custom: "Does exactly what your business needs.",
    lowCode: "Only what a drag-and-drop builder happens to support.",
  },
  {
    dimension: "Scalability",
    custom: "Handles more volume, users, and complexity as you grow.",
    lowCode: "Growth eventually meets a platform ceiling.",
  },
  {
    dimension: "Lock-in",
    custom: "Standard, portable technology wherever it's practical.",
    lowCode: "Your core process hinges on one builder's pricing and roadmap.",
  },
  {
    dimension: "Integrations",
    custom: "Deep connections to your systems, with real control.",
    lowCode: "Whatever the pre-packaged connectors happen to allow.",
  },
  {
    dimension: "Performance",
    custom: "Tuned to your workload.",
    lowCode: "A general-purpose platform doing everything for everyone.",
  },
];

export function WhyCustom() {
  return (
    <Section id="why-custom" aria-labelledby="why-custom-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Custom vs. low-code"
          headingId="why-custom-heading"
          title="Own your software. Don't rent your workflow."
          lede="We're code-first: the processes your business runs on get built as software, rather than assembled inside a proprietary visual workflow builder. That buys you flexibility, clearer ownership, and room to grow."
        />

        <Reveal className="mt-16 md:mt-20">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Custom software compared with low-code platforms across ownership,
              flexibility, scalability, lock-in, integrations and performance.
            </caption>
            <thead className="sr-only md:not-sr-only">
              <tr>
                <th
                  scope="col"
                  className="w-[18%] border-b border-border pb-4 font-mono text-eyebrow font-normal uppercase text-text-muted"
                >
                  <span className="sr-only">Dimension</span>
                </th>
                <th
                  scope="col"
                  className="w-[41%] border-b border-accent-line pb-4 pl-6 font-mono text-eyebrow font-normal uppercase text-accent"
                >
                  Custom software
                </th>
                <th
                  scope="col"
                  className="w-[41%] border-b border-border pb-4 pl-6 font-mono text-eyebrow font-normal uppercase text-text-muted"
                >
                  Low-code platform
                </th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((row) => (
                <tr
                  key={row.dimension}
                  className="group block border-b border-border py-6 md:table-row md:py-0"
                >
                  <th
                    scope="row"
                    className="block font-mono text-eyebrow font-normal uppercase text-text-primary md:table-cell md:w-[18%] md:py-6 md:pr-6 md:align-top md:text-text-secondary md:transition-colors md:group-hover:text-text-primary"
                  >
                    {row.dimension}
                  </th>
                  {/*
                    The custom column carries a faint copper wash and a copper
                    left rule so the eye knows which side of the comparison the
                    page is arguing for, without shouting about it.
                  */}
                  <td className="block pt-3 md:table-cell md:border-l md:border-accent-line md:bg-accent-subtle/40 md:py-6 md:pl-6 md:align-top md:transition-colors md:group-hover:bg-accent-subtle">
                    <span className="mb-1 block font-mono text-eyebrow uppercase text-accent md:hidden">
                      Custom
                    </span>
                    <span className="text-body text-text-primary">
                      {row.custom}
                    </span>
                  </td>
                  <td className="block pt-3 md:table-cell md:border-l md:border-border md:py-6 md:pl-6 md:align-top">
                    <span className="mb-1 block font-mono text-eyebrow uppercase text-text-muted md:hidden">
                      Low-code
                    </span>
                    <span className="text-body text-text-secondary">
                      {row.lowCode}
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
            Low-code tools have their place, and we&apos;ll tell you honestly
            when one is the right call — including when it means a smaller
            project for us. But as a process becomes central to how you make
            money, owning it tends to pay off.
          </p>
          <p className="text-pretty text-body text-text-secondary">
            We use third-party services ourselves — cloud hosting, databases, AI
            providers. Nobody builds without them. The difference is that we
            avoid unnecessary platform lock-in and stick to standard, portable
            technology wherever it&apos;s practical.
          </p>
          <div className="md:col-span-2">
            <Link
              href="/services"
              className={cn(arrowLink, focusRing)}
            >
              How we approach a build
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
