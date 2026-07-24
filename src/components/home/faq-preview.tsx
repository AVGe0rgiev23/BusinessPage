import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const FAQS = [
  {
    q: "How do you price a project?",
    a: "Every project is scoped and quoted individually, because every business is different. After a short discovery conversation, we give you a clear, fixed proposal — so you know the investment before any work begins, with no surprise hourly bills.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope, but most focused automations or tools land in a matter of weeks rather than months. We work in increments and get something useful in your hands early, rather than disappearing for a quarter.",
  },
  {
    q: "Who owns the code you build?",
    a: "You do — completely. The code, the data, and the software are yours to keep, host, and extend however you like. You're never locked into us or into a platform you don't control.",
  },
  {
    q: "What happens after launch?",
    a: "We stay involved. We offer ongoing support to maintain, monitor, and improve what we've built, and to extend it as your business grows. You're never left holding software you can't maintain.",
  },
  {
    q: "Low-code or custom — which do I need?",
    a: "It depends on the job, and we'll be honest about it. Low-code tools can be a fine starting point, but for processes that are central to your business, custom software gives you the ownership, flexibility, and scalability to grow without hitting a ceiling.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Almost always. A big part of what we do is connecting the systems you already rely on — CRMs, inboxes, spreadsheets, and internal tools — so they finally work together instead of in isolation.",
  },
];

export function FaqPreview() {
  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Questions, answered.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            The things business owners ask us most before getting started.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <Accordion>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q}>
                <AccordionTrigger
                  className={`py-5 text-body font-medium text-text-primary hover:no-underline ${focusRing}`}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-2xl text-body text-text-secondary">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/faq"
            className={`group inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
          >
            Read all FAQs
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
