import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/*
  "How does pricing work?" used to be the first item here. It has been removed
  rather than reworded: the numbers now sit in the Pricing section further up
  the page, and an accordion answer is exactly the wrong place for the one
  thing every visitor is looking for. Do not add it back — update `Pricing`
  instead.
*/
const FAQS = [
  { id: "longProjectTake" },
  { id: "whoOwnsSoftware" },
  { id: "whereSoftwareRun" },
  { id: "happensAfterLaunch" },
  { id: "lowCodeCustom" },
  { id: "workToolsAlready" },
] as const;

/**
 * FaqPreview.
 *
 * The accordion sits in a wide column beside the heading rather than centred in
 * a narrow one. Questions are the last real objection-handling step before the
 * closing CTA, so they get room to breathe and a comfortable reading measure
 * for the answers.
 */
export async function FaqPreview() {
  const t = await getTranslations("home.faqPreview");
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="11"
              eyebrow={t("heading.eyebrow")}
              headingId="faq-heading"
              title={t("heading.title")}
              lede={t("heading.lede")}
              layout="stacked"
            />

            <Reveal className="mt-8">
              <Link
                href="/faq"
                className={cn(arrowLink, focusRing)}
              >
                {t("readAll")}
                <ArrowRight
                  className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <Accordion>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id}>
                  <AccordionTrigger>{t(`items.${faq.id}.q`)}</AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-[68ch] text-body text-text-secondary">
                      {t(`items.${faq.id}.a`)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
