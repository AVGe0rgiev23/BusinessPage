import {
  Repeat,
  Inbox,
  Timer,
  ClipboardList,
  Database,
  FileText,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const PAINS = [
  {
    icon: Repeat,
    title: "Hours lost to repetitive tasks",
    body: "The same manual steps, run again and again — time your team can't spend on the work that actually grows the business.",
  },
  {
    icon: Inbox,
    title: "An inbox that never empties",
    body: "Enquiries, follow-ups, and routine replies handled by hand, one message at a time, while more keep arriving.",
  },
  {
    icon: Timer,
    title: "Leads that go cold",
    body: "When no one answers fast enough, interested buyers move on. Every slow reply is revenue quietly walking out the door.",
  },
  {
    icon: ClipboardList,
    title: "Copy-pasting between systems",
    body: "Staff moving the same data between tools that were never built to talk to each other — paid work that produces nothing new.",
  },
  {
    icon: Database,
    title: "Manual data entry",
    body: "Typing numbers into spreadsheets and forms by hand: slow, tedious, and one keystroke away from an expensive mistake.",
  },
  {
    icon: FileText,
    title: "Reports assembled by hand",
    body: "Hours each week pulling figures together into a document that's already out of date by the time it's finished.",
  },
];

export function Problem() {
  return (
    <Section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-bg-surface"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            The busywork is costing you more than you think.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            Most businesses don&apos;t lose money in one big leak — they lose it
            in a hundred small ones. Repetitive, manual work spread across the
            week, paid for in salaried hours and missed opportunities.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <Reveal key={pain.title} delay={(i % 3) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {pain.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
