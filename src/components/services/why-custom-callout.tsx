import { getTranslations } from "next-intl/server";
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
  { id: "ownership" },
  { id: "flexibility" },
  { id: "scalability" },
  { id: "noUnnecessaryLock" },
] as const;

export async function WhyCustomCallout() {
  const t = await getTranslations("services");
  return (
    <Section aria-labelledby="why-custom-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <Eyebrow>{t("whyCustomCallout.eyebrow")}</Eyebrow>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>

            <h2
              id="why-custom-heading"
              className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
            >
              {t("whyCustomCallout.title")}
            </h2>

            <p className="mt-6 max-w-[54ch] text-pretty text-body-lg text-text-secondary">
              {t("whyCustomCallout.first")}
            </p>
            <p className="mt-4 max-w-[54ch] text-pretty text-body text-text-secondary">
              {t("whyCustomCallout.second")}
            </p>
            <p className="mt-4 max-w-[54ch] text-pretty text-body text-text-secondary">
              {t("whyCustomCallout.third")}
            </p>

            <Link
              href="/process"
              className={cn(arrowLink, "mt-8", focusRing)}
            >
              {t("whyCustomCallout.link")}
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
                key={point.id}
                className="group border-b border-border py-6"
              >
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-5 shrink-0 bg-border-hover transition-[width,background-color] duration-[--duration-base] ease-[--ease-out] group-hover:w-8 group-hover:bg-accent"
                  />
                  <div>
                    <h3 className="text-h4 font-semibold text-text-primary">
                      {t(`whyCustomCallout.points.${point.id}.label`)}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-pretty text-small text-text-secondary">
                      {t(`whyCustomCallout.points.${point.id}.desc`)}
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
