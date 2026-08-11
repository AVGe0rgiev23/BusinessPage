import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * EngineeringPractice — the invisible standards.
 *
 * Set as a specification list: monospace uppercase headings over hairline
 * rules, three up. It sits directly beneath `Philosophy`, which uses the shared
 * `PointList`, so it deliberately takes a different shape — two adjacent
 * sections of six short titled paragraphs would otherwise read as one long
 * undifferentiated list twelve items deep.
 */
const PRACTICES = [
  {
    title: "Reviewed, not rushed",
    body: "Changes are reviewed before they ship. A second set of eyes catches problems while they're still cheap to fix.",
  },
  {
    title: "Tested where it counts",
    body: "Automated tests cover the parts of your software you can't afford to have break, so updates don't quietly undo what already worked.",
  },
  {
    title: "Handled with care",
    body: "Least-privilege access, secrets kept out of the code, and your data treated as something to protect — not an afterthought.",
  },
  {
    title: "Documented as we go",
    body: "What we build comes with the notes to run and change it, so you're never held hostage by one person's memory.",
  },
  {
    title: "Shipped through a pipeline",
    body: "Automated checks and deploys make releases repeatable and boring — the way releases should be — instead of a manual nail-biter.",
  },
  {
    title: "Measured, then tuned",
    body: "We check how software actually performs before optimising, and fix the things your users and your bill genuinely feel.",
  },
];

export function EngineeringPractice() {
  return (
    <Section
      id="engineering-practice"
      aria-labelledby="engineering-heading"
      className="border-t border-border bg-bg-surface"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Engineering practice"
          headingId="engineering-heading"
          title="The standards behind the software."
          lede="The difference between software that runs for years and software you regret is mostly invisible — it lives in how it's built. Here's what that looks like on our side."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
          selector=":scope > li"
        >
          {PRACTICES.map((practice, i) => (
            <li key={practice.title} className="group border-t border-border pt-5">
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-eyebrow text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-eyebrow uppercase text-text-primary">
                  {practice.title}
                </h3>
              </div>
              <p className="mt-3 max-w-[44ch] text-pretty text-small text-text-secondary">
                {practice.body}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
