import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * WhyAgility — the trust section.
 *
 * A sticky heading column beside a scrolling list. This is the only section on
 * the site that uses that shape, which is the point: by this scroll depth the
 * visitor has passed a ledger, a grid, a panel, a table, a rail and a matrix,
 * and a seventh variation on "grid of things" would undo all of it.
 *
 * No icons and no numbers here. This is the section that has to feel like a
 * person talking, so it is set as plain, well-spaced prose with a copper rule
 * marking each claim.
 */
const REASONS = [
  {
    title: "Built with modern AI",
    body: "We use current AI and language-model tooling where it earns its place — to solve real problems, not as a label on the box.",
  },
  {
    title: "Fully custom software",
    body: "Everything is built for your business specifically. No forcing your process to fit someone else's template.",
  },
  {
    title: "Ownership on your terms",
    body: "The custom software is yours under the project agreement, and your data stays yours. You decide whether we operate it or you run it yourself.",
  },
  {
    title: "Fast communication",
    body: "Direct access to the people building your software, and quick, straight answers when you need them.",
  },
  {
    title: "Support, if you want it",
    body: "We can stay on to maintain and grow what we build — or hand it over properly so your team runs it. Ongoing support is an option, not an obligation.",
  },
  {
    title: "Transparent development",
    body: "Clear scope, honest timelines, and visible progress — you always know what you're paying for and why.",
  },
];

export function WhyAgility() {
  return (
    <Section
      id="why-agility"
      aria-labelledby="why-agility-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                08
              </span>
              <Eyebrow>Why AGility</Eyebrow>
            </div>
            <h2
              id="why-agility-heading"
              className="mt-7 text-balance text-h2 font-semibold text-text-primary"
            >
              A partner, not just a vendor.
            </h2>
            <p className="mt-6 max-w-[46ch] text-pretty text-body-lg text-text-secondary">
              We keep it honest. No inflated claims — just the things that
              genuinely matter when you trust a team to build software your
              business depends on.
            </p>
          </Reveal>

          <RevealGroup as="ul" className="grid" selector=":scope > li">
            {REASONS.map((reason) => (
              <li
                key={reason.title}
                className="group border-t border-border py-8 first:border-t-0 first:pt-0 lg:py-9"
              >
                <div className="flex gap-5">
                  {/* A short copper rule instead of an icon chip. It marks the
                      item, extends on hover, and carries no false meaning. */}
                  <span
                    aria-hidden="true"
                    className="mt-3.5 h-px w-6 shrink-0 bg-border-hover transition-[width,background-color] duration-[--duration-base] ease-[--ease-out] group-hover:w-10 group-hover:bg-accent"
                  />
                  <div>
                    <h3 className="text-h3 font-semibold text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 max-w-[54ch] text-pretty text-body text-text-secondary">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
