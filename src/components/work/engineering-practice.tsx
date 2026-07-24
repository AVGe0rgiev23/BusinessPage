import {
  GitPullRequest,
  FlaskConical,
  LockKeyhole,
  FileText,
  Rocket,
  Gauge,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

const PRACTICES = [
  {
    icon: GitPullRequest,
    title: "Reviewed, not rushed",
    body: "Changes are reviewed before they ship. A second set of eyes catches problems while they're still cheap to fix.",
  },
  {
    icon: FlaskConical,
    title: "Tested where it counts",
    body: "Automated tests cover the parts of your software you can't afford to have break, so updates don't quietly undo what already worked.",
  },
  {
    icon: LockKeyhole,
    title: "Handled with care",
    body: "Least-privilege access, secrets kept out of the code, and your data treated as something to protect — not an afterthought.",
  },
  {
    icon: FileText,
    title: "Documented as we go",
    body: "What we build comes with the notes to run and change it, so you're never held hostage by one person's memory.",
  },
  {
    icon: Rocket,
    title: "Shipped through a pipeline",
    body: "Automated checks and deploys make releases repeatable and boring — the way releases should be — instead of a manual nail-biter.",
  },
  {
    icon: Gauge,
    title: "Measured, then tuned",
    body: "We check how software actually performs before optimising, and fix the things your users and your bill genuinely feel.",
  },
];

export function EngineeringPractice() {
  return (
    <Section id="engineering-practice" aria-labelledby="engineering-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            Engineering practice
          </p>
          <h2
            id="engineering-heading"
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            The standards behind the software.
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            The difference between software that runs for years and software you
            regret is mostly invisible — it lives in how it&apos;s built. Here&apos;s
            what that looks like on our side.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((practice, i) => {
            const Icon = practice.icon;
            return (
              <Reveal key={practice.title} delay={(i % 3) * 0.08}>
                <li className="h-full rounded-2xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {practice.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary">
                    {practice.body}
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
