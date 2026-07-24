import { Search, PenTool, Hammer, Rocket, LifeBuoy, ListChecks, Eye } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * ProcessSteps — the full, detailed engagement path for the Process page.
 *
 * Expands the five-card home preview (`home/process-preview.tsx`) into a
 * numbered, step-by-step walkthrough. Each step spells out three things:
 * what happens, what the client walks away with, and the transparency angle
 * (you always know where things stand).
 *
 * Copy strings use real typographic characters and are rendered as JSX
 * expressions ({step.lead}), so no entity escaping is needed.
 *
 * Server Component. Renders `<h2>` for the section heading and `<h3>` per step
 * so the page heading order stays h1 → h2 → h3.
 */
const STEPS = [
  {
    icon: Search,
    title: "Discovery",
    lead: "We sit down with you to find the expensive problem — where the hours disappear, where money quietly leaks, where growth keeps stalling. We map how the work actually flows today, and we agree on what a win looks like in real numbers before anyone writes a line of code.",
    deliverable:
      "A clear, written picture of the problem, the opportunity, and the outcome we’re aiming for — yours to keep whether or not we build it together.",
    transparency:
      "You define what success means up front, so the project is never measured against a moving target.",
  },
  {
    icon: PenTool,
    title: "Scoping & design",
    lead: "We turn the problem into a concrete plan: what we’ll build, how it fits the tools you already use, what it will cost, and how long it will take. The solution is designed around your process — not the other way around.",
    deliverable:
      "A scope, a timeline, and a fixed picture of what “done” means, so you can decide with full information and no surprises.",
    transparency:
      "You approve the plan and the price before the build starts. No open-ended invoices, no scope quietly creeping in later.",
  },
  {
    icon: Hammer,
    title: "Build",
    lead: "We develop in short, focused increments and put working software in front of you as it takes shape — not months of silence followed by one big reveal.",
    deliverable:
      "Regular, visible progress you can actually try, plus the chance to steer while changes are still cheap and easy to make.",
    transparency:
      "You have a direct line to the people writing the code and a live view of where the project stands at any moment.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    lead: "We roll the software out carefully, test it against real work rather than a demo, and make sure your team is comfortable using it from day one.",
    deliverable:
      "A launch that doesn’t disrupt the business, with your people trained and the software already earning its keep.",
    transparency:
      "You know exactly what’s changing, when it goes live, and how to reach us the moment anything needs attention.",
  },
  {
    icon: LifeBuoy,
    title: "Support & iterate",
    lead: "We stay on after launch to maintain, refine, and extend the software as your business changes. The first version is a starting point, not the finish line.",
    deliverable:
      "Software that keeps pace with your business — and a team that already knows your systems inside out when the next opportunity appears.",
    transparency:
      "Ongoing, honest communication about what’s worth building next — and, just as often, what isn’t.",
  },
];

export function ProcessSteps() {
  return (
    <Section id="steps" aria-labelledby="steps-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            The path
          </p>
          <h2
            id="steps-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            From an expensive problem to working software.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            No black boxes. Five clear stages, each with a purpose you can point
            to — so from the first call to long after launch, you always know
            what&apos;s happening and why.
          </p>
        </Reveal>

        <ol className="mt-16 flex flex-col gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={(i % 2) * 0.06}>
                <li className="rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                    {/* Step marker + title */}
                    <div className="flex items-center gap-4 md:w-64 md:shrink-0 md:flex-col md:items-start md:gap-5">
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-bg-elevated text-accent">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <span
                          aria-hidden="true"
                          className="font-mono text-small text-text-secondary"
                        >
                          Step 0{i + 1}
                        </span>
                        <h3 className="mt-1 text-h3 font-semibold text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Detail */}
                    <div className="flex-1">
                      <p className="text-body text-text-secondary">
                        {step.lead}
                      </p>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-border bg-bg p-5">
                          <p className="flex items-center gap-2 text-eyebrow font-mono uppercase tracking-wider text-accent">
                            <ListChecks className="size-4" aria-hidden="true" />
                            What you walk away with
                          </p>
                          <p className="mt-2 text-small text-text-secondary">
                            {step.deliverable}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-bg p-5">
                          <p className="flex items-center gap-2 text-eyebrow font-mono uppercase tracking-wider text-accent">
                            <Eye className="size-4" aria-hidden="true" />
                            How you stay in the loop
                          </p>
                          <p className="mt-2 text-small text-text-secondary">
                            {step.transparency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
