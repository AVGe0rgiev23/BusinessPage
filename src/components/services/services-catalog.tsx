import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Plus } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { SERVICE_PRICES, type ServiceId } from "@/lib/pricing";
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

/*
  Proof: a project of the operator's own that shows the service working, as a
  live demo to try or a public repository to read. Like the Work page, none of
  it is client work, and the price note above the catalog says so. A service
  with no public proof yet shows no link rather than a weak one, and a link
  must never point at something private or unfinished-looking (Istra Luxe
  stays off until its owner agrees to be shown).
*/
type Proof = { name: string; href: string; kind: "live" | "code" };

const SUPPORTAI_LIVE: Proof = { name: "SupportAI", href: "https://supportai-beta.vercel.app", kind: "live" };
const SUPPORTAI_CODE: Proof = { name: "SupportAI", href: "https://github.com/AVGe0rgiev23/AIsupport", kind: "code" };
const LEADGENIUS_CODE: Proof = { name: "LeadGenius", href: "https://github.com/AVGe0rgiev23/AI-Consulting", kind: "code" };

const PROOF: Record<ServiceId, readonly Proof[]> = {
  emailAutomation: [LEADGENIUS_CODE],
  documentProcessing: [],
  workflowAutomation: [SUPPORTAI_CODE],
  internalCompanyTools: [{ name: "AGility OS", href: "https://github.com/AVGe0rgiev23/AGility-system-", kind: "code" }],
  aiAssistants: [SUPPORTAI_LIVE],
  aiChatbots: [
    SUPPORTAI_LIVE,
    { name: "Alpine Gear chatbot", href: "https://github.com/AVGe0rgiev23/AI-Chat-Bot---Demo-version-", kind: "code" },
  ],
  customerSupportSystems: [SUPPORTAI_LIVE],
  crmIntegrations: [],
  apiIntegrations: [LEADGENIUS_CODE],
  aiPoweredDashboards: [{ name: "AI Data Analyst", href: "https://github.com/AVGe0rgiev23/ai-data-analyst", kind: "code" }],
  customSaasProducts: [SUPPORTAI_CODE],
  bespokeAiSolutions: [LEADGENIUS_CODE],
};

/** Up to 1,000 documents a month on the document-processing yearly fee. */
const DOCUMENTS_PER_MONTH = 1000;

export async function ServicesCatalog() {
  const t = await getTranslations("services");

  const setupPrice = (id: ServiceId) => {
    const p = SERVICE_PRICES[id];
    return "per" in p && p.per === "connection"
      ? t("catalog.price.fromPerConnection", { setup: p.setup })
      : t("catalog.price.from", { setup: p.setup });
  };
  const runningFee = (id: ServiceId) => {
    const p = SERVICE_PRICES[id];
    const { fee } = p;
    if (fee.kind === "yearly") {
      return "per" in p && p.per === "documents"
        ? t("catalog.price.yearlyDocuments", { amount: fee.amount, count: DOCUMENTS_PER_MONTH })
        : t("catalog.price.yearly", { amount: fee.amount });
    }
    if (fee.kind === "monthly") return t("catalog.price.monthly", { amount: fee.amount });
    return "from" in fee
      ? t("catalog.price.careFrom", { amount: fee.amount })
      : t("catalog.price.care", { amount: fee.amount });
  };

  return (
    <Section>
      <Container>
        <Reveal>
          <p className="max-w-[72ch] text-pretty text-small text-text-secondary">
            {t("catalog.priceNote")}
          </p>
        </Reveal>
        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
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
                            <p className="mt-4 font-mono text-small text-text-primary">
                              {setupPrice(service.id)}
                              <span className="text-text-muted"> · {runningFee(service.id)}</span>
                            </p>
                            {PROOF[service.id].length > 0 ? (
                              <ul className="mt-2 flex flex-wrap gap-x-4">
                                {PROOF[service.id].map((proof) => (
                                  <li key={proof.href}>
                                    <a
                                      href={proof.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={cn(
                                        "-mx-2 inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-small font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-hover",
                                        focusRing
                                      )}
                                    >
                                      {proof.kind === "live"
                                        ? t("catalog.proof.live", { name: proof.name })
                                        : t("catalog.proof.code", { name: proof.name })}
                                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
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
