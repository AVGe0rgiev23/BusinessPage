import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * ProcessSteps — the full, detailed engagement path for the Process page.
 *
 * Expands the five-step home preview (`home/process-preview.tsx`) into a
 * walkthrough. Each step spells out three things: what happens, what the client
 * walks away with, and the transparency angle.
 *
 * Laid out as a numbered document with a hanging step column rather than five
 * bordered cards each containing two more bordered sub-cards. The old version
 * nested a card inside a card inside a card — three levels of border for one
 * paragraph of text — which is exactly the reflex this redesign exists to break.
 * Here the two supporting facts hang off a hairline instead.
 *
 * Copy strings use real typographic characters and are rendered as JSX
 * expressions, so no entity escaping is needed.
 */
const STEPS = [
  {
    title: "Discovery",
    lead: "I sit down with you to find the expensive problem — where the hours disappear, where money quietly leaks, where growth keeps stalling. I map how the work actually flows today, and we settle on what a win looks like in real numbers before anyone writes a line of code.",
    deliverable:
      "A clear, written picture of the problem, the opportunity, and the outcome you’re aiming for — yours to keep whether or not the build goes ahead.",
    transparency:
      "You define what success means up front, so the project is never measured against a moving target.",
  },
  {
    title: "Scoping & design",
    lead: "I turn the problem into a concrete plan: what gets built, how it fits the tools you already use, what it will cost, and how long it will take. This is also where the delivery model gets settled — run by me, run by you, or a hybrid — so the architecture is designed for it from the start rather than retrofitted later.",
    deliverable:
      "A scope, a timeline, an agreed operating model, and a clear picture of what “done” means, so you can decide with full information and no surprises.",
    transparency:
      "You approve the plan and the price before the build starts. No open-ended invoices, no scope quietly creeping in later.",
  },
  {
    title: "Build",
    lead: "I develop in short, focused increments and put working software in front of you as it takes shape — not months of silence followed by one big reveal.",
    deliverable:
      "Regular, visible progress you can actually try, plus the chance to steer while changes are still cheap and easy to make.",
    transparency:
      "You have a direct line to the person writing the code and a live view of where the project stands at any moment.",
  },
  {
    title: "Deploy",
    lead: "I deploy the system using the operating model you’ve chosen — fully managed by me, into infrastructure you own, or a hybrid of the two. I configure the infrastructure, integrations, monitoring, and access it needs, test it against real work rather than a demo, and make sure everyone knows how it runs.",
    deliverable:
      "A launch that doesn’t disrupt the business, running where you decided it should run, with your people trained and the software already earning its keep.",
    transparency:
      "You know exactly what’s changing, when it goes live, who holds which accounts and access, and how to reach me the moment anything needs attention.",
  },
  {
    title: "Support & iterate",
    lead: "Ongoing support is optional, and it takes whichever form suits you. I can operate the system for you, keep maintaining and improving it while your team owns the infrastructure, or hand it over so your team runs it independently. The first version is a starting point, not the finish line.",
    deliverable:
      "Either software that keeps pace with your business, maintained by someone who already knows your systems inside out — or a clean handover with the documentation your team needs to run it without me.",
    transparency:
      "Ongoing, honest communication about what’s worth building next — and, just as often, what isn’t.",
  },
];

export function ProcessSteps() {
  return (
    <Section id="steps" aria-labelledby="steps-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="The path"
          headingId="steps-heading"
          title="From an expensive problem to working software."
          lede="No black boxes. Five clear stages, each with a purpose you can point to — so from the first call to long after launch, you always know what's happening and why."
        />

        <RevealGroup
          as="ol"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > li"
        >
          {STEPS.map((step, i) => (
            <li key={step.title} className="group border-b border-border py-10">
              <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                {/* Hanging step column */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span
                    aria-hidden="true"
                    className="tabular font-mono text-eyebrow uppercase text-text-muted transition-colors duration-[--duration-fast] group-hover:text-accent"
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h3 font-semibold text-text-primary">
                    {step.title}
                  </h3>
                </div>

                <div>
                  <p className="max-w-[68ch] text-pretty text-body text-text-secondary">
                    {step.lead}
                  </p>

                  {/* The two supporting facts hang off a rule rather than
                      sitting in nested boxes. */}
                  <dl className="mt-7 grid gap-x-10 gap-y-5 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-eyebrow uppercase text-text-muted">
                        What you walk away with
                      </dt>
                      <dd className="mt-2 text-pretty text-small text-text-secondary">
                        {step.deliverable}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-eyebrow uppercase text-text-muted">
                        How you stay in the loop
                      </dt>
                      <dd className="mt-2 text-pretty text-small text-text-secondary">
                        {step.transparency}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
