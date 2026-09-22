import { getTranslations } from "next-intl/server";
import { ClientMessages } from "@/i18n/client-messages";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactAside } from "@/components/contact/contact-aside";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  const t = await getTranslations("contact");
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow={t("page.eyebrow")}
        title={t("page.title")}
        subtitle={t("page.subtitle")}
      />

      <Section aria-labelledby="contact-heading" className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Form — the primary conversion action */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2
                  id="contact-heading"
                  className="text-h2 font-semibold text-text-primary"
                >
                  {t("page.formTitle")}
                </h2>
                <p className="mt-4 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
                  {t("page.formLede")}
                </p>
                <div className="mt-8">
                  <ClientMessages paths={["contact.form", "contact.errors"]}>
                    <ContactForm />
                  </ClientMessages>
                </div>
              </Reveal>
            </div>

            {/* Alternative paths */}
            <aside aria-labelledby="contact-alt-heading" className="lg:col-span-1">
              <Reveal delay={90}>
                <ContactAside />
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
