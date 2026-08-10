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
