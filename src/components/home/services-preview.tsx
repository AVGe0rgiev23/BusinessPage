import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Plus } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * ServicesPreview — the capability index.
 *
 * Eleven services used to mean eleven bordered cards with eleven icon chips,
 * which is the densest concentration of the repeated-card problem anywhere on
 * the site. Now it is a single enclosing panel divided by internal hairlines:
 * one container, eleven rows.
 *
 * That change alone removes ten borders and eleven icons from the page, and it
 * makes the list scannable — the point of a capability index is that a visitor
 * can find the thing that sounds like their problem in a couple of seconds.
 */
const SERVICES = [
  { id: "aiAssistants" },
  { id: "chatbots" },
  { id: "customerSupportSystems" },
  { id: "emailAutomation" },
  { id: "documentProcessing" },
  { id: "internalTools" },
  { id: "crmIntegrations" },
  { id: "workflowAutomation" },
  { id: "aiDashboards" },
  { id: "apiIntegrations" },
  { id: "customSaas" },
] as const;

export async function ServicesPreview() {
  const t = await getTranslations("home.servicesPreview");
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow={t("heading.eyebrow")}
          headingId="services-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid overflow-hidden rounded-xl border border-border bg-bg md:mt-20 md:grid-cols-2"
          selector=":scope > li"
        >
          {SERVICES.map((service, i) => (
            <li
              key={service.id}
              className={cn(
                "group relative border-b border-border transition-colors duration-[--duration-fast] hover:bg-bg-elevated/50",
                // Vertical divider between the two columns, and no bottom rule
                // on the row(s) that finish the panel.
                "md:even:border-l",
                i >= SERVICES.length - 1 && "md:col-span-2 md:border-b-0",
                i === SERVICES.length - 2 && "md:border-b"
              )}
            >
              <div className="flex items-start gap-4 p-6 md:gap-5 md:p-7">
                <Plus
                  aria-hidden="true"
                  className="mt-1 size-3.5 shrink-0 text-text-muted transition-[transform,color] duration-[--duration-base] ease-[--ease-out] group-hover:rotate-90 group-hover:text-accent"
                />
                <div>
                  <h3 className="text-h4 font-semibold text-text-primary">
                    {t(`services.${service.id}.title`)}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-pretty text-small text-text-secondary">
                    {t(`services.${service.id}.body`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <Link
            href="/services"
            className={cn(arrowLink, focusRing)}
          >
            {t("exploreAll")}
            <ArrowRight
              className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
