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
  {
    title: "AI assistants",
    body: "Purpose-built helpers that answer questions and take action against your own data and tools.",
  },
  {
    title: "Chatbots",
    body: "Conversational front doors for your website or product that qualify, guide, and route.",
  },
  {
    title: "Customer-support systems",
    body: "Triage, draft, and resolve routine tickets so your team handles only what needs a human.",
  },
  {
    title: "Email automation",
    body: "Sort, respond to, and follow up on messages automatically, without letting anything slip.",
  },
  {
    title: "Document processing",
    body: "Pull structured data out of invoices, contracts, and forms — no manual re-keying.",
  },
  {
    title: "Internal tools",
    body: "Dashboards and admin apps built around your exact workflow, not a generic template.",
  },
  {
    title: "CRM integrations",
    body: "Keep your customer records accurate and in sync across every system you rely on.",
  },
  {
    title: "Workflow automation",
    body: "Connect the steps of a process end to end so work moves without manual handoffs.",
  },
  {
    title: "AI dashboards",
    body: "Live views of the numbers that matter, with plain-language summaries you can act on.",
  },
  {
    title: "API integrations",
    body: "Make the software you already pay for work together, cleanly and reliably.",
  },
  {
    title: "Custom SaaS",
    body: "Full products — from first idea to launch — when off-the-shelf software doesn't fit.",
  },
];

export function ServicesPreview() {
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow="What I build"
          headingId="services-heading"
          title="Custom-built for the way you work."
          lede="These are examples, not a fixed menu. Every project is designed around your business — your tools, your process, your goals."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid overflow-hidden rounded-xl border border-border bg-bg md:mt-20 md:grid-cols-2"
          selector=":scope > li"
        >
          {SERVICES.map((service, i) => (
            <li
              key={service.title}
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
                    {service.title}
                  </h3>
                  <p className="mt-1.5 max-w-[46ch] text-pretty text-small text-text-secondary">
                    {service.body}
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
            Explore all services
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
