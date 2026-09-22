import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { initLocale } from "@/i18n/init-locale";
import { Link } from "@/i18n/navigation";
import { PRICING } from "@/lib/pricing";
import { routeMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { FaqGroup, type FaqItem } from "@/components/faq/faq-group";
import { FaqCta } from "@/components/faq/faq-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "faq");
}

const linkClass =
  "rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * Answers that need more than one paragraph are rendered as their own blocks.
 * `FaqGroup` wraps a plain string in a styled `<p>` for us, but styles
 * multi-part answers only at the container level — so multi-paragraph answers
 * carry their own spacing classes.
 */
const paragraph = "text-body text-text-secondary";

/*
  Structure lives here, words live in the catalog (`faq`). Every item is a set
  of literal catalog keys, so the type system checks that each one exists:
    text       — a one-paragraph answer (FaqGroup wraps it in a <p>);
    paragraphs — several paragraphs; they may contain links (<book>…</book>) and
                 the published prices ({pilot}, {project}, {support});
    models     — the delivery-models answer: an intro, a bulleted list, an outro.
  `id` keys the group's headings in the catalog; `slug` is the English anchor
  used for the section's DOM id, so in-page links do not change per language.
*/
const GROUPS = [
  {
    id: "workingTogether",
    slug: "working-together",
    index: "01",
    className: undefined,
    items: [
      { q: "items.kindBusinessesWork.q", text: "items.kindBusinessesWork.a" },
      { q: "items.buildCustomSoftware.q", paragraphs: ["items.buildCustomSoftware.a.p1", "items.buildCustomSoftware.a.p2"] },
      { q: "items.workToolsSystems.q", text: "items.workToolsSystems.a" },
      { q: "items.technicalProblem.q", text: "items.technicalProblem.a" },
      { q: "items.alreadyHaveHouse.q", text: "items.alreadyHaveHouse.a" },
      { q: "items.getStarted.q", paragraphs: ["items.getStarted.a.p1", "items.getStarted.a.p2"] },
    ],
  },
  {
    id: "pricingTimelines",
    slug: "pricing-timelines",
    index: "02",
    className: "border-t border-border bg-bg-surface",
    items: [
      { q: "items.pricingWork.q", paragraphs: ["items.pricingWork.a.p1", "items.pricingWork.a.p2"] },
      { q: "items.chargeFixedPrice.q", text: "items.chargeFixedPrice.a" },
      { q: "items.whoPaysInfrastructure.q", paragraphs: ["items.whoPaysInfrastructure.a.p1", "items.whoPaysInfrastructure.a.p2"] },
      { q: "items.longProjectTake.q", text: "items.longProjectTake.a" },
      { q: "items.consultationReallyFree.q", text: "items.consultationReallyFree.a" },
      { q: "items.sureExactlyNeed.q", text: "items.sureExactlyNeed.a" },
    ],
  },
  {
    id: "deliveryOwnership",
    slug: "delivery-ownership",
    index: "03",
    className: "border-t border-border",
    items: [
      { q: "items.whereSoftwareRun.q", models: "items.whereSoftwareRun.a" },
      { q: "items.whoOwnsSoftware.q", paragraphs: ["items.whoOwnsSoftware.a.p1", "items.whoOwnsSoftware.a.p2"] },
      { q: "items.useExistingOpenai.q", text: "items.useExistingOpenai.a" },
      { q: "items.workInsideCloud.q", text: "items.workInsideCloud.a" },
      { q: "items.ownTriggerDev.q", paragraphs: ["items.ownTriggerDev.a.p1", "items.ownTriggerDev.a.p2"] },
      { q: "items.agilityManageTrigger.q", text: "items.agilityManageTrigger.a" },
    ],
  },
  {
    id: "afterLaunch",
    slug: "after-launch",
    index: "04",
    className: "border-t border-border bg-bg-surface",
    items: [
      { q: "items.happensAfterLaunch.q", text: "items.happensAfterLaunch.a" },
      { q: "items.stopWorkingAgility.q", paragraphs: ["items.stopWorkingAgility.a.p1", "items.stopWorkingAgility.a.p2"] },
      { q: "items.wantAnotherDeveloper.q", text: "items.wantAnotherDeveloper.a" },
      { q: "items.handleSecurity.q", paragraphs: ["items.handleSecurity.a.p1", "items.handleSecurity.a.p2", "items.handleSecurity.a.p3"] },
    ],
  },
] as const;

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("faq");
  const price = await getTranslations("home.pricing");

  // The prices come from one source (src/lib/pricing.ts), formatted by the same
  // template the Pricing section uses, so the two can never disagree.
  const values = {
    pilot: price("tiers.pilot.price", PRICING.pilot),
    project: price("tiers.project.price", PRICING.project),
    support: price("tiers.support.price", PRICING.support),
  };
  const tags = {
    book: (chunks: React.ReactNode) => (
      <Link href="/book" className={linkClass}>
        {chunks}
      </Link>
    ),
    contact: (chunks: React.ReactNode) => (
      <Link href="/contact" className={linkClass}>
        {chunks}
      </Link>
    ),
    pricing: (chunks: React.ReactNode) => (
      <Link href="/#pricing" className={linkClass}>
        {chunks}
      </Link>
    ),
  };

  type Item = (typeof GROUPS)[number]["items"][number];
  const toItem = (item: Item): FaqItem => {
    if ("text" in item) return { q: t(item.q), a: t(item.text) };
    if ("paragraphs" in item) {
      return {
        q: t(item.q),
        a: (
          <div className="flex flex-col gap-4">
            {item.paragraphs.map((key) => (
              <p key={key} className={paragraph}>
                {t.rich(key, { ...tags, ...values })}
              </p>
            ))}
          </div>
        ),
      };
    }
    return {
      q: t(item.q),
      a: (
        <div className="flex flex-col gap-4">
          <p className={paragraph}>{t("items.whereSoftwareRun.a.intro")}</p>
          <ul className="flex list-disc flex-col gap-3 pl-5">
            {(["managed", "clientOwned", "hybrid"] as const).map((model) => (
              <li key={model} className={paragraph}>
                <span className="font-medium text-text-primary">
                  {t(`items.whereSoftwareRun.a.${model}.label`)}
                </span>{" "}
                {t(`items.whereSoftwareRun.a.${model}.text`)}
              </li>
            ))}
          </ul>
          <p className={paragraph}>{t("items.whereSoftwareRun.a.outro")}</p>
        </div>
      ),
    };
  };

  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />
      {GROUPS.map((group) => (
        <FaqGroup
          key={group.id}
          id={group.slug}
          index={group.index}
          eyebrow={t(`groups.${group.id}.eyebrow`)}
          heading={t(`groups.${group.id}.heading`)}
          items={group.items.map(toItem)}
          className={group.className}
        />
      ))}
      <FaqCta />
    </main>
  );
}
