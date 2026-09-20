import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * WhyCustomCallout — the services-page version of the custom-vs-off-the-shelf
 * argument.
 *
 * Shorter than the homepage comparison table on purpose: by the time someone is
 * this far into the services page they have already seen the catalogue and are
 * weighing an approach, not being introduced to one. Four points, hairline
 * ruled, with the honest caveat kept in full.
 */
const POINTS = [
  {
    label: "Ownership",
    desc: "The custom software is yours under the project agreement — not rented from a builder you don't control.",
  },
  {
    label: "Flexibility",
    desc: "It does exactly what your business needs, not just what a drag-and-drop builder happens to support.",
  },
  {
    label: "Scalability",
    desc: "It grows with your volume and complexity instead of hitting a platform ceiling.",
  },
  {
    label: "No unnecessary lock-in",
    desc: "Standard, portable technology wherever practical — so your core process isn't hostage to one builder's pricing.",
  },
];

export function WhyCustomCallout() {
  return (
    <Section aria-labelledby="why-custom-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <Eyebrow>Custom vs. off-the-shelf</Eyebrow>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>

            <h2
              id="why-custom-heading"
              className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
            >
              Why custom, not off-the-shelf
            </h2>

            <p className="mt-6 max-w-[54ch] text-pretty text-body-lg text-text-secondary">
              I&apos;m code-first: the processes your business runs on get
              built as software, rather than assembled inside a proprietary
              visual workflow builder. That buys you flexibility, clearer
              ownership, and room to grow.
            </p>
            <p className="mt-4 max-w-[54ch] text-pretty text-body text-text-secondary">
              Off-the-shelf tools and low-code platforms have their place, and
              I&apos;ll tell you honestly when one is the right fit — including
              when it means a smaller project for me. But as a process becomes
              central to how you make money, owning it tends to pay off more
              than renting it from a builder that can change its pricing or shut
              down.
            </p>
            <p className="mt-4 max-w-[54ch] text-pretty text-body text-text-secondary">
              I use third-party services myself — cloud hosting, databases, AI
              providers. The point isn&apos;t to avoid them, it&apos;s to avoid
              unnecessary lock-in and keep what I build portable.
            </p>

            <Link
              href="/process"
              className={cn(arrowLink, "mt-8", focusRing)}
            >
              See how I work
              <ArrowRight
                className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <RevealGroup
            as="ul"
            className="border-t border-border lg:pt-1"
            selector=":scope > li"
          >
            {POINTS.map((point) => (
              <li
                key={point.label}
                className="group border-b border-border py-6"
              >
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-5 shrink-0 bg-border-hover transition-[width,background-color] duration-[--duration-base] ease-[--ease-out] group-hover:w-8 group-hover:bg-accent"
                  />
                  <div>
                    <h3 className="text-h4 font-semibold text-text-primary">
                      {point.label}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-pretty text-small text-text-secondary">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
