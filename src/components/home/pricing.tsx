import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Pricing — the published price list.
 *
 * These numbers used to live inside the FAQ accordion, behind an answer that
 * said "we don't publish standard rates". That is a defensible position for an
 * agency with a sales team and a terrible one for a solo operator: the visitor
 * who cannot find a number assumes the number is bad, and leaves rather than
 * asks. Publishing bands costs nothing and disqualifies the wrong enquiries
 * before they reach the inbox.
 *
 * ── Accuracy constraint, do not loosen ──────────────────────────────────────
 * The bands and the guarantee are commercial commitments, not marketing copy.
 * Change them only when the actual offer changes, and change them in the FAQ
 * answer (`app/faq/page.tsx`, "How does pricing work?") in the same edit — the
 * two must never disagree. No superlatives and no exclamation marks: a price
 * list is the one place on a website where a flat tone is the persuasive one.
 *
 * Set as a ledger rather than three pricing cards. Cards imply tiers you choose
 * between, with the middle one highlighted; these are three different shapes of
 * engagement, and a hairline-ruled list says that without the false hierarchy.
 */
const TIERS = [
  {
    name: "Pilot",
    price: "€600–900",
    basis: "Fixed price",
    body: "One narrow process, scoped tightly and shipped. The way to find out whether this works for your business without committing to a full project.",
  },
  {
    name: "Full workflow project",
    price: "€1,800–4,500",
    basis: "Fixed price",
    body: "A whole workflow built end to end — the systems it touches, the edge cases, the hand-offs. Priced from the agreed scope, so the cost is known before the build starts.",
  },
  {
    name: "Ongoing support",
    price: "€350–800",
    basis: "Per month",
    body: "Maintenance, improvements, and new features on software already running. An option after a project, never a condition of one.",
  },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Pricing"
          headingId="pricing-heading"
          title="What it costs, before you ask."
          lede="Real ranges, not a request to get in touch for a quote. Where a project lands inside a band depends on scope, and the exact figure is set out in the proposal before any work starts."
        />

        <RevealGroup
          as="ul"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > li"
        >
          {TIERS.map((tier) => (
            <li
              key={tier.name}
              className="group grid gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline md:py-9"
            >
              <h3 className="text-h3 font-semibold text-text-primary">
                {tier.name}
              </h3>

              <p className="max-w-[54ch] text-pretty text-body text-text-secondary">
                {tier.body}
              </p>

              {/* Price last in the DOM but pinned right on desktop: the name is
                  what a visitor scans for, the number is what they stop on. */}
              <p className="md:text-right">
                <span className="tabular block text-h3 font-semibold text-text-primary transition-colors duration-[--duration-fast] group-hover:text-accent">
                  {tier.price}
                </span>
                <span className="mt-1.5 block font-mono text-eyebrow uppercase text-text-muted">
                  {tier.basis}
                </span>
              </p>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <div className="max-w-[62ch] border-l-2 border-accent pl-6">
            <p className="font-mono text-eyebrow uppercase text-accent">
              The guarantee
            </p>
            <p className="mt-4 text-pretty text-body-lg text-text-primary">
              If it doesn&apos;t do what the proposal says it will, you
              don&apos;t pay for it.
            </p>
            <p className="mt-4 text-pretty text-body text-text-secondary">
              Infrastructure and AI API usage are separate from these figures
              and depend on the delivery model you choose. Which of them apply
              to you is written into the proposal, itemised, before you commit.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
