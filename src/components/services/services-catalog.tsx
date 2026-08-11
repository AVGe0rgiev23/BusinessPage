import { Plus } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * ServicesCatalog — the full catalogue, in four themed groups.
 *
 * Restyled to the same enclosed-panel treatment as the homepage services
 * index, so a visitor arriving from the home page sees the same object in more
 * detail rather than a different design of the same list.
 *
 * The group number is the navigational device here. Twelve services across four
 * groups needs structure a visitor can hold in their head, and a numbered
 * heading with a rule does that better than four more centred titles.
 */
interface Service {
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
        title: "Email automation",
        body: "Sort, route, and reply to routine email automatically, so messages get answered quickly and nothing slips through the cracks.",
      },
      {
        title: "Document processing",
        body: "Pull the data out of invoices, contracts, and forms without anyone re-typing it — fewer errors and hours back every week.",
      },
      {
        title: "Workflow automation",
        body: "Connect the steps of a process end to end so work moves on its own, instead of waiting on manual handoffs between people and tools.",
      },
      {
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
        title: "AI assistants",
        body: "A helper that answers questions and takes action against your own data and systems, so customers and staff get answers without waiting on someone.",
      },
      {
        title: "AI chatbots",
        body: "A conversational front door for your site or product that qualifies leads, guides visitors, and hands off to a person only when it needs to.",
      },
      {
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
        title: "CRM integrations",
        body: "Keep customer records accurate and in sync across every tool you use, so your team stops working from stale or conflicting data.",
      },
      {
        title: "API integrations",
        body: "Make the software you already rely on talk to each other cleanly, so data flows automatically instead of being moved by hand.",
      },
      {
        title: "AI-powered dashboards",
        body: "Live views of the numbers that matter, with plain-language summaries — so you can see what's happening and act without digging through reports.",
      },
    ],
  },
  {
    id: "custom-products",
    name: "Custom products",
    blurb:
      "When nothing off-the-shelf fits, we design and build the product itself — and the software we build for you is yours under the project agreement.",
    services: [
      {
        title: "Custom SaaS products",
        body: "A full product built from first idea to launch when existing software can't do what you need — and you want to own the result rather than rent it.",
      },
      {
        title: "Bespoke AI solutions",
        body: "Have a problem that doesn't fit a category? We scope and build a solution around it, using AI only where it genuinely earns its place.",
      },
    ],
  },
];

export function ServicesCatalog() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-20 md:gap-28">
          {GROUPS.map((group, groupIndex) => {
            const headingId = `${group.id}-heading`;
            return (
              <section key={group.id} aria-labelledby={headingId}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular font-mono text-eyebrow text-accent"
                    >
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <Eyebrow>Group</Eyebrow>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-border"
                    />
                  </div>

                  <div className="mt-7 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-16">
                    <h2
                      id={headingId}
                      className="max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
                    >
                      {group.name}
                    </h2>
                    <p className="mt-4 max-w-[54ch] text-pretty text-body-lg text-text-secondary lg:mt-0">
                      {group.blurb}
                    </p>
                  </div>
                </Reveal>

                <RevealGroup
                  as="ul"
                  className="mt-10 grid overflow-hidden rounded-xl border border-border bg-bg-surface md:grid-cols-2"
                  selector=":scope > li"
                >
                  {group.services.map((service, i) => {
                    const isLastRow =
                      i >= group.services.length - (group.services.length % 2 || 2);
                    return (
                      <li
                        key={service.title}
                        className={`group/item border-b border-border transition-colors duration-[--duration-fast] last:border-b-0 hover:bg-bg-elevated/50 md:even:border-l ${
                          isLastRow ? "md:border-b-0" : ""
                        } ${
                          group.services.length % 2 === 1 &&
                          i === group.services.length - 1
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-4 p-6 md:gap-5 md:p-7">
                          <Plus
                            aria-hidden="true"
                            className="mt-1 size-3.5 shrink-0 text-text-muted transition-[transform,color] duration-[--duration-base] ease-[--ease-out] group-hover/item:rotate-90 group-hover/item:text-accent"
                          />
                          <div>
                            <h3 className="text-h4 font-semibold text-text-primary">
                              {service.title}
                            </h3>
                            <p className="mt-1.5 max-w-[52ch] text-pretty text-small text-text-secondary">
                              {service.body}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </RevealGroup>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
