import { Search, Wrench, Gauge, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * Selected work — honest placeholder grid.
 *
 * AGility has no client case studies yet, so this section is deliberately, and
 * visibly, a set of empty slots. The cards read as "coming soon" placeholders —
 * never as real or implied clients. The category labels describe the KIND of
 * work we do, not any specific engagement.
 *
 * TODO: replace each placeholder card with a real, published case study once a
 * client has agreed to share it — link each to its own `/work/<slug>` page and
 * remove the border-dashed placeholder treatment.
 */
const PLACEHOLDERS = [
  {
    category: "Operations automation",
    body: "A real project will live here once it's shipped and our client is happy to share it — the manual process, what we automated, and the hours it gave back.",
  },
  {
    category: "Customer workflows",
    body: "The kind of build that answers leads and handles follow-up without anyone chasing it by hand. The story goes here when there's a real one to tell.",
  },
  {
    category: "Internal tooling",
    body: "Custom software a growing team runs on every day. We'll show the before, the after, and the numbers — with permission, never invented.",
  },
];

const ANATOMY = [
  {
    icon: Search,
    label: "The problem",
    body: "The process that was costing time or money, and what it was costing.",
  },
  {
    icon: Wrench,
    label: "What we built",
    body: "The software we shipped, and how it fits the tools the client already used.",
  },
  {
    icon: Gauge,
    label: "The result",
    body: "The measurable outcome — in real numbers, shared with the client's blessing.",
  },
  {
    icon: ShieldCheck,
    label: "What they own",
    body: "The code and data that stayed theirs, with no lock-in to us or a platform.",
  },
];

export function SelectedWork() {
  return (
    <Section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Selected work
          </p>
          <h2
            id="selected-work-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            Case studies are on the way.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            We&apos;d rather leave these slots honestly empty than fill them with
            stock photos and invented results. When a client is happy to share a
            project, it goes here — and every claim in it will be real.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {PLACEHOLDERS.map((item, i) => (
            <Reveal key={item.category} delay={(i % 3) * 0.08}>
              <li className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-bg p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-eyebrow font-mono uppercase tracking-wider text-text-secondary">
                    Case study
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-eyebrow font-mono uppercase tracking-wider text-accent">
                    Coming soon
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  className="mt-5 aspect-[16/10] rounded-xl border border-dashed border-border bg-bg-surface"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)",
                  }}
                />
                <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                  {item.category}
                </h3>
                <p className="mt-2 text-body text-text-secondary">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-border bg-bg p-6 md:p-8">
            <p className="text-eyebrow font-mono uppercase tracking-wider text-text-secondary">
              What each one will show
            </p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ANATOMY.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.label} className="flex flex-col">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-body font-medium text-text-primary">
                      {step.label}
                    </p>
                    <p className="mt-1 text-small text-text-secondary">
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
