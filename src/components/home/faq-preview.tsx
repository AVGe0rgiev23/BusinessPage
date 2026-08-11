import Link from "next/link";
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

const FAQS = [
  {
    q: "How does pricing work?",
    a: "Every project is scoped and quoted individually. After a short discovery conversation you get a clear proposal — typically a fixed price for a defined build, with anything ongoing (managed operation, maintenance, infrastructure and AI usage) set out separately so you can see exactly what you're committing to.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. A focused automation can be a matter of weeks; a larger internal tool or custom product takes longer. We work in increments and get something useful into your hands early, rather than disappearing for a quarter.",
  },
  {
    q: "Who owns the software?",
    a: "The custom software we build specifically for you is intended to be yours under the project agreement, and your data stays your data. Third-party services — cloud hosting, AI providers, and the like — remain subject to their own providers' terms, and who holds those accounts depends on the delivery model you choose.",
  },
  {
    q: "Where does the software run?",
    a: "That's your call. We can operate the whole system for you as a managed service, deploy it into infrastructure and accounts you control, or keep building and maintaining software that runs inside your own environment. We'll recommend the model that fits your team, budget, and security requirements.",
  },
  {
    q: "What happens after launch?",
    a: "One of three things, depending on what you want: we keep operating the system for you, we maintain and improve it while your team owns the infrastructure, or we hand it over with the documentation your team needs to run it. Ongoing support is an option, not a requirement.",
  },
  {
    q: "Low-code or custom — which do I need?",
    a: "It depends on the job, and we'll be honest about it. If an existing tool solves your problem more cheaply and safely, we'll say so. But for processes that are central to how you make money, custom software gives you the ownership, flexibility, and room to grow that a drag-and-drop builder rarely does.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Almost always. A big part of what we do is connecting the systems you already rely on — CRMs, inboxes, spreadsheets, and internal tools — so they finally work together instead of in isolation.",
  },
];

/**
 * FaqPreview.
 *
 * The accordion sits in a wide column beside the heading rather than centred in
 * a narrow one. Questions are the last real objection-handling step before the
 * closing CTA, so they get room to breathe and a comfortable reading measure
 * for the answers.
 */
export function FaqPreview() {
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="10"
              eyebrow="FAQ"
              headingId="faq-heading"
              title="Questions, answered."
              lede="The things business owners ask us most before getting started."
              layout="stacked"
            />

            <Reveal className="mt-8">
              <Link
                href="/faq"
                className={cn(arrowLink, focusRing)}
              >
                Read all FAQs
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
                <AccordionItem key={faq.q}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-[68ch] text-body text-text-secondary">
                      {faq.a}
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
