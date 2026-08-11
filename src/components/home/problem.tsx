import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Problem — the cost-of-busywork audit.
 *
 * Previously six identical bordered cards, each with an icon chip. Six icons
 * for six kinds of tedium added nothing: a clipboard glyph does not help anyone
 * understand that copy-pasting between systems is expensive.
 *
 * Rebuilt as a ledger — numbered, hairline-ruled rows in a two-column layout.
 * It reads like the findings section of an audit, which is exactly the register
 * this content wants, and it lets the eye scan the six headlines in one pass
 * instead of traversing a grid.
 */
const PAINS = [
  {
    title: "Hours lost to repetitive tasks",
    body: "The same manual steps, run again and again — time your team can't spend on the work that actually grows the business.",
  },
  {
    title: "An inbox that never empties",
    body: "Enquiries, follow-ups, and routine replies handled by hand, one message at a time, while more keep arriving.",
  },
  {
    title: "Leads that go cold",
    body: "When no one answers fast enough, interested buyers move on. Every slow reply is revenue quietly walking out the door.",
  },
  {
    title: "Copy-pasting between systems",
    body: "Staff moving the same data between tools that were never built to talk to each other — paid work that produces nothing new.",
  },
  {
    title: "Manual data entry",
    body: "Typing numbers into spreadsheets and forms by hand: slow, tedious, and one keystroke away from an expensive mistake.",
  },
  {
    title: "Reports assembled by hand",
    body: "Hours each week pulling figures together into a document that's already out of date by the time it's finished.",
  },
];

export function Problem() {
  return (
    <Section
      id="problem"
      aria-labelledby="problem-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="01"
          eyebrow="The problem"
          headingId="problem-heading"
          title="The busywork is costing you more than you think."
          lede="Most businesses don't lose money in one big leak — they lose it in a hundred small ones. Repetitive, manual work spread across the week, paid for in salaried hours and missed opportunities."
        />

        <RevealGroup as="ul" className="mt-16 md:mt-20" selector=":scope > li">
          {PAINS.map((pain, i) => (
            <li
              key={pain.title}
              className="group relative border-t border-border last:border-b"
            >
              {/*
                A copper edge that grows from the top on hover. It costs one
                pseudo-element, needs no layout shift, and gives a plain list
                row the sense of being a live target — the kind of small,
                precise response that makes an interface feel built rather
                than assembled.
              */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-[--duration-base] ease-[--ease-out] group-hover:scale-y-100"
              />
              <div className="grid gap-x-10 gap-y-2 py-7 transition-colors duration-[--duration-fast] group-hover:bg-bg-elevated/40 md:grid-cols-[3.5rem_minmax(0,24ch)_minmax(0,1fr)] md:items-baseline md:px-5 lg:gap-x-14">
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-eyebrow text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h4 font-semibold text-text-primary">
                  {pain.title}
                </h3>
                <p className="text-pretty text-body text-text-secondary">
                  {pain.body}
                </p>
              </div>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
