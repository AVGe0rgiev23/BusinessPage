import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { initLocale } from "@/i18n/init-locale";
import { contactEmail } from "@/lib/site-config";
import { routeMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "privacy");
}

const linkClass =
  "rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const paragraph = "text-pretty text-body text-text-secondary";

/*
  Structure lives here, words live in the catalog (`privacy.sections`). Every
  entry is a literal catalog key, so the type system checks that each exists.
  A section renders, in order: its heading, an optional `lead` line, an
  optional bulleted `items` list, then its paragraphs. Paragraphs may carry
  <mail>{email}</mail> (the contact address) and <cpdp>…</cpdp> (the Bulgarian
  data protection commission's site).
*/
const SECTIONS = [
  {
    id: "controller",
    heading: "sections.controller.heading",
    paragraphs: ["sections.controller.p1"],
  },
  {
    id: "collected",
    heading: "sections.collected.heading",
    lead: "sections.collected.lead",
    items: [
      "sections.collected.items.name",
      "sections.collected.items.email",
      "sections.collected.items.company",
      "sections.collected.items.workingModel",
      "sections.collected.items.message",
      "sections.collected.items.language",
    ],
    paragraphs: ["sections.collected.p1"],
  },
  {
    id: "purpose",
    heading: "sections.purpose.heading",
    paragraphs: ["sections.purpose.p1", "sections.purpose.p2"],
  },
  {
    id: "processors",
    heading: "sections.processors.heading",
    lead: "sections.processors.lead",
    items: [
      "sections.processors.items.vercel",
      "sections.processors.items.resend",
      "sections.processors.items.google",
    ],
    paragraphs: ["sections.processors.p1"],
  },
  {
    id: "retention",
    heading: "sections.retention.heading",
    paragraphs: ["sections.retention.p1", "sections.retention.p2"],
  },
  {
    id: "rights",
    heading: "sections.rights.heading",
    lead: "sections.rights.lead",
    items: [
      "sections.rights.items.access",
      "sections.rights.items.correct",
      "sections.rights.items.delete",
      "sections.rights.items.object",
    ],
    paragraphs: ["sections.rights.p1", "sections.rights.p2"],
  },
  {
    id: "changes",
    heading: "sections.changes.heading",
    paragraphs: ["sections.changes.p1"],
  },
] as const;

/**
 * Privacy notice.
 *
 * Plain on purpose: a legal page is read, not scanned for a call to action, so
 * there is no CTA band and no motion. The heading column mirrors the ledger
 * index used elsewhere so the page still belongs to the site.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("privacy");

  const values = {
    email: contactEmail,
    mail: (chunks: React.ReactNode) => (
      <a href={`mailto:${contactEmail}`} className={linkClass}>
        {chunks}
      </a>
    ),
    cpdp: (chunks: React.ReactNode) => (
      <a
        href="https://www.cpdp.bg"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {chunks}
      </a>
    ),
  };

  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      >
        <Eyebrow>{t("page.updated")}</Eyebrow>
      </PageHeader>

      <Section className="pt-16 md:pt-20 lg:pt-24">
        <Container>
          <div className="flex flex-col">
            {SECTIONS.map((section, i) => (
              <section
                key={section.id}
                aria-labelledby={`privacy-${section.id}`}
                className="grid gap-4 border-t border-border py-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="tabular font-mono text-eyebrow text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    id={`privacy-${section.id}`}
                    className="text-h3 font-semibold text-text-primary"
                  >
                    {t(section.heading)}
                  </h2>
                </div>

                <div className="flex max-w-[68ch] flex-col gap-4">
                  {"items" in section ? (
                    <>
                      <p className={paragraph}>{t(section.lead)}</p>
                      <ul className="flex list-disc flex-col gap-2 pl-5">
                        {section.items.map((item) => (
                          <li key={item} className={paragraph}>
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {section.paragraphs.map((p) => (
                    <p key={p} className={paragraph}>
                      {t.rich(p, values)}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
