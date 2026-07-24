import {
  Mail,
  ScanText,
  Workflow,
  LayoutDashboard,
  Bot,
  MessageSquare,
  Headset,
  Users,
  Plug,
  BarChart3,
  Package,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

interface Service {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface ServiceGroup {
  id: string;
  name: string;
  blurb: string;
  services: Service[];
}

const GROUPS: ServiceGroup[] = [
  {
    id: "automate-repetitive-work",
    name: "Automate repetitive work",
    blurb:
      "The copy-paste, the re-typing, the chasing — the work your team does over and over that a computer should be doing instead.",
    services: [
      {
        icon: Mail,
        title: "Email automation",
        body: "Sort, route, and reply to routine email automatically, so messages get answered quickly and nothing slips through the cracks.",
      },
      {
        icon: ScanText,
        title: "Document processing",
        body: "Pull the data out of invoices, contracts, and forms without anyone re-typing it — fewer errors and hours back every week.",
      },
      {
        icon: Workflow,
        title: "Workflow automation",
        body: "Connect the steps of a process end to end so work moves on its own, instead of waiting on manual handoffs between people and tools.",
      },
      {
        icon: LayoutDashboard,
        title: "Internal company tools",
        body: "Replace the spreadsheets and manual rituals your team leans on with an app built around exactly how you actually work.",
      },
    ],
  },
  {
    id: "talk-to-customers-at-scale",
    name: "Talk to customers at scale",
    blurb:
      "Answer more people, faster, without adding headcount — and keep a person in the loop for the conversations that need one.",
    services: [
      {
        icon: Bot,
        title: "AI assistants",
        body: "A helper that answers questions and takes action against your own data and systems, so customers and staff get answers without waiting on someone.",
      },
      {
        icon: MessageSquare,
        title: "AI chatbots",
        body: "A conversational front door for your site or product that qualifies leads, guides visitors, and hands off to a person only when it needs to.",
      },
      {
        icon: Headset,
        title: "Customer-support systems",
        body: "Triage, draft, and resolve routine tickets automatically, so your team spends its time on the conversations that genuinely need a human.",
      },
    ],
  },
  {
    id: "connect-your-systems",
    name: "Connect your systems",
    blurb:
      "Stop moving data by hand between the tools you already pay for, and make sure everyone is working from the same, current picture.",
    services: [
      {
        icon: Users,
        title: "CRM integrations",
        body: "Keep customer records accurate and in sync across every tool you use, so your team stops working from stale or conflicting data.",
      },
      {
        icon: Plug,
        title: "API integrations",
        body: "Make the software you already rely on talk to each other cleanly, so data flows automatically instead of being moved by hand.",
      },
      {
        icon: BarChart3,
        title: "AI-powered dashboards",
        body: "Live views of the numbers that matter, with plain-language summaries — so you can see what's happening and act without digging through reports.",
      },
    ],
  },
  {
    id: "custom-products",
    name: "Custom products",
    blurb:
      "When nothing off-the-shelf fits, we design and build the product itself — and you own what we build.",
    services: [
      {
        icon: Package,
        title: "Custom SaaS products",
        body: "A full product built from first idea to launch when existing software can't do what you need — and you want to own the result.",
      },
      {
        icon: BrainCircuit,
        title: "Bespoke AI solutions",
        body: "Have a problem that doesn't fit a category? We scope and build a solution around it, using AI only where it genuinely earns its place.",
      },
    ],
  },
];

export function ServicesCatalog() {
  return (
    <Section className="bg-bg-surface">
      <Container>
        <div className="space-y-16 md:space-y-24">
          {GROUPS.map((group) => {
            const headingId = `${group.id}-heading`;
            return (
              <section key={group.id} aria-labelledby={headingId}>
                <Reveal className="max-w-2xl">
                  <h2
                    id={headingId}
                    className="text-balance text-h2 font-semibold text-text-primary"
                  >
                    {group.name}
                  </h2>
                  <p className="mt-3 text-pretty text-body text-text-secondary">
                    {group.blurb}
                  </p>
                </Reveal>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((service, i) => {
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
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
