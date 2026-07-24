import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Headset,
  Mail,
  FileText,
  Wrench,
  Users,
  Workflow,
  BarChart3,
  Plug,
  Boxes,
  ArrowRight,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const SERVICES = [
  {
    icon: Sparkles,
    title: "AI assistants",
    body: "Purpose-built helpers that answer questions and take action against your own data and tools.",
  },
  {
    icon: MessageSquare,
    title: "Chatbots",
    body: "Conversational front doors for your website or product that qualify, guide, and route.",
  },
  {
    icon: Headset,
    title: "Customer-support systems",
    body: "Triage, draft, and resolve routine tickets so your team handles only what needs a human.",
  },
  {
    icon: Mail,
    title: "Email automation",
    body: "Sort, respond to, and follow up on messages automatically, without letting anything slip.",
  },
  {
    icon: FileText,
    title: "Document processing",
    body: "Pull structured data out of invoices, contracts, and forms — no manual re-keying.",
  },
  {
    icon: Wrench,
    title: "Internal tools",
    body: "Dashboards and admin apps built around your exact workflow, not a generic template.",
  },
  {
    icon: Users,
    title: "CRM integrations",
    body: "Keep your customer records accurate and in sync across every system you rely on.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    body: "Connect the steps of a process end to end so work moves without manual handoffs.",
  },
  {
    icon: BarChart3,
    title: "AI dashboards",
    body: "Live views of the numbers that matter, with plain-language summaries you can act on.",
  },
  {
    icon: Plug,
    title: "API integrations",
    body: "Make the software you already pay for work together, cleanly and reliably.",
  },
  {
    icon: Boxes,
    title: "Custom SaaS",
    body: "Full products — from first idea to launch — when off-the-shelf software doesn't fit.",
  },
];

export function ServicesPreview() {
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            What we build
          </p>
          <h2
            id="services-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Custom-built for the way you work.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            These are examples, not a fixed menu. Every solution is designed
            around your business — your tools, your process, your goals.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.06}>
                <li className="flex h-full items-start gap-4 rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-elevated text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-body-lg font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-small text-text-secondary">
                      {service.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/services"
            className={`group inline-flex items-center gap-2 rounded-md text-body font-medium text-accent transition-colors hover:text-accent-hover ${focusRing}`}
          >
            Explore all services
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
