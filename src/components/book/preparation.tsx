import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const whoItsFor = [
  "Growing businesses buried in repetitive, manual work",
  "Teams copy-pasting between tools, inboxes, and spreadsheets",
  "Owners who suspect software could help but aren't sure where to start",
];

const howToPrepare = [
  "Nothing formal — no slides or documents needed",
  "Think of the one task your team dreads most",
  "Bring any tools or numbers you already track (optional)",
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body text-text-secondary">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
            <Check aria-hidden="true" className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Preparation() {
  return (
    <Section aria-labelledby="prepare-heading" className="pt-0">
      <Container>
        <Reveal>
          <h2
            id="prepare-heading"
            className="max-w-2xl text-h2 font-semibold text-text-primary"
          >
            Before we meet
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
            Come as you are. A quick read on who this is for and the little that
            helps us make the most of your time.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg-surface p-6 md:p-8">
              <h3 className="text-h3 font-semibold text-text-primary">
                Who it&apos;s for
              </h3>
              <CheckList items={whoItsFor} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border border-border bg-bg-surface p-6 md:p-8">
              <h3 className="text-h3 font-semibold text-text-primary">
                How to prepare
              </h3>
              <CheckList items={howToPrepare} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
