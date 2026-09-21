import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * ServicesCatalog — the full catalogue, in four themed groups.
 *
 * Restyled to the same enclosed-panel treatment as the homepage services
 * index, so a visitor arriving from the home page sees the same object in more
 * detail rather than a different design of the same list.
 *
 * The group number is the navigational device here. Twelve services across four
 * groups needs structure a visitor can hold in their head, and a numbered
 * heading with a rule does that better than four more centred titles.
 */
/*
  Structure lives here, words live in the catalog (`services.catalog`):
    id    — key into `catalog.groups` / `catalog.services`;
    slug  — the English anchor used for the section's DOM id, kept stable so
            in-page links and the rendered markup do not change per language.
*/
const GROUPS = [
  { id: "automateRepetitiveWork", slug: "automate-repetitive-work", services: [{ id: "emailAutomation" }, { id: "documentProcessing" }, { id: "workflowAutomation" }, { id: "internalCompanyTools" }] },
  { id: "talkCustomersScale", slug: "talk-to-customers-at-scale", services: [{ id: "aiAssistants" }, { id: "aiChatbots" }, { id: "customerSupportSystems" }] },
  { id: "connectSystems", slug: "connect-your-systems", services: [{ id: "crmIntegrations" }, { id: "apiIntegrations" }, { id: "aiPoweredDashboards" }] },
  { id: "customProducts", slug: "custom-products", services: [{ id: "customSaasProducts" }, { id: "bespokeAiSolutions" }] },
] as const;

export async function ServicesCatalog() {
  const t = await getTranslations("services");
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-20 md:gap-28">
          {GROUPS.map((group, groupIndex) => {
            const headingId = `${group.slug}-heading`;
            return (
              <section key={group.slug} aria-labelledby={headingId}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular font-mono text-eyebrow text-accent"
                    >
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <Eyebrow>{t("catalog.groupLabel")}</Eyebrow>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-border"
                    />
                  </div>

                  <div className="mt-7 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-16">
                    <h2
                      id={headingId}
                      className="max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
                    >
                      {t(`catalog.groups.${group.id}.name`)}
                    </h2>
                    <p className="mt-4 max-w-[54ch] text-pretty text-body-lg text-text-secondary lg:mt-0">
                      {t(`catalog.groups.${group.id}.blurb`)}
                    </p>
                  </div>
                </Reveal>

                <RevealGroup
                  as="ul"
                  className="mt-10 grid overflow-hidden rounded-xl border border-border bg-bg-surface md:grid-cols-2"
                  selector=":scope > li"
                >
                  {group.services.map((service, i) => {
                    const isLastRow =
                      i >= group.services.length - (group.services.length % 2 || 2);
                    return (
                      <li
                        key={service.id}
                        className={`group/item border-b border-border transition-colors duration-[--duration-fast] last:border-b-0 hover:bg-bg-elevated/50 md:even:border-l ${
                          isLastRow ? "md:border-b-0" : ""
                        } ${
                          group.services.length % 2 === 1 &&
                          i === group.services.length - 1
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-4 p-6 md:gap-5 md:p-7">
                          <Plus
                            aria-hidden="true"
                            className="mt-1 size-3.5 shrink-0 text-text-muted transition-[transform,color] duration-[--duration-base] ease-[--ease-out] group-hover/item:rotate-90 group-hover/item:text-accent"
                          />
                          <div>
                            <h3 className="text-h4 font-semibold text-text-primary">
                              {t(`catalog.services.${service.id}.title`)}
                            </h3>
                            <p className="mt-1.5 max-w-[52ch] text-pretty text-small text-text-secondary">
                              {t(`catalog.services.${service.id}.body`)}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </RevealGroup>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
