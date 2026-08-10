import { ServerCog, KeyRound, Handshake, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * DeliveryModels — the shared "one build, three ways to work together" section.
 *
 * This is a central commercial message, so it is deliberately written once and
 * reused (Home + Services) rather than re-stated in slightly different words on
 * each page. Terminology here is the site's canonical wording for the three
 * models: "fully managed", "client-owned", "hybrid".
 *
 * Deliberate accuracy constraints — do NOT loosen these when editing copy:
 *   - No model is labelled "recommended". The client chooses; we advise.
 *   - Software ownership, infrastructure ownership, and operational
 *     responsibility are kept as SEPARATE ideas (see the `owns` / `operates`
 *     rows), because a client can own the software while we operate it, or own
 *     the infrastructure while we maintain what runs on it.
 *   - Ownership is always framed as "according to the project agreement" —
 *     website copy cannot make the legal guarantee on its own.
 *
 * Server Component. Renders `<h2>` + `<h3>` per model, so it must sit on a page
 * that already has its own `<h1>`.
 */
interface Model {
  icon: LucideIcon;
  name: string;
  tagline: string;
  body: string;
  /** Who holds the infrastructure and third-party accounts. */
  owns: string;
  /** Who runs, monitors, and maintains it day to day. */
  operates: string;
}

const MODELS: Model[] = [
  {
    icon: ServerCog,
    name: "Fully managed",
    tagline: "You run the business. We run the software.",
    body: "We build the system and operate it for you — hosting, deployments, monitoring, maintenance, and ongoing improvements. You just use the software, through whatever interface makes sense: an app, a dashboard, email, Slack, or an API.",
    owns: "AGility operates the production environment on your behalf",
    operates: "AGility",
  },
  {
    icon: KeyRound,
    name: "Client-owned",
    tagline: "You own and operate it.",
    body: "We build and deploy the system into infrastructure and accounts you control, then hand over the agreed source code, configuration, and documentation. Your team — or another provider you choose — takes it from there.",
    owns: "You hold the cloud, data, and third-party accounts",
    operates: "Your team, or a provider you appoint",
  },
  {
    icon: Handshake,
    name: "Hybrid",
    tagline: "You own the infrastructure. We keep it running.",
    body: "Your company owns the environment, the data, and the third-party accounts, while we keep developing, deploying, monitoring, and improving the software inside it. We work with the technical permissions the job needs, and no more.",
    owns: "You hold the cloud, data, and third-party accounts",
    operates: "AGility, with authorised access to your environment",
  },
];

interface DeliveryModelsProps {
  /** Section landmark id; the labelling `<h2>` gets `${id}-heading`. */
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Optional background utility (e.g. "bg-bg-surface") for section alternation. */
  className?: string;
  /** Card surface. Defaults to the surface colour; pass "bg-bg" on tinted sections. */
  cardClassName?: string;
}

export function DeliveryModels({
  id = "delivery-models",
  eyebrow = "Your software. Your choice.",
  heading = "One build. Three ways to work together.",
  intro = "We don't force every client into the same delivery model. We can run the system for you, deploy it into infrastructure you control, or manage software running inside your own environment. We'll recommend the approach that fits your technical, operational, and security requirements — but you choose how you want to work with us.",
  className,
  cardClassName = "bg-bg-surface",
}: DeliveryModelsProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} className={className}>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-4 text-balance text-h2 font-semibold text-text-primary"
          >
            {heading}
          </h2>
          <p className="mt-5 text-pretty text-body-lg text-text-secondary">
            {intro}
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-4 lg:grid-cols-3">
          {MODELS.map((model, i) => {
            const Icon = model.icon;
            return (
              <Reveal key={model.name} delay={(i % 3) * 0.08} className="h-full">
                <li
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-border p-6 transition-colors hover:border-border-hover md:p-8",
                    cardClassName
                  )}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-text-primary">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-body font-medium text-text-primary">
                    {model.tagline}
                  </p>
                  <p className="mt-3 text-body text-text-secondary">
                    {model.body}
                  </p>

                  {/* Ownership and operation kept visibly separate — they are
                      different questions, and conflating them is the single
                      easiest way for this page to become inaccurate. */}
                  <dl className="mt-6 grid gap-3 border-t border-border pt-6 text-small">
                    <div>
                      <dt className="text-eyebrow font-mono uppercase tracking-wider text-text-secondary">
                        Infrastructure &amp; accounts
                      </dt>
                      <dd className="mt-1 text-text-secondary">{model.owns}</dd>
                    </div>
                    <div>
                      <dt className="text-eyebrow font-mono uppercase tracking-wider text-text-secondary">
                        Runs &amp; maintains it
                      </dt>
                      <dd className="mt-1 text-text-secondary">
                        {model.operates}
                      </dd>
                    </div>
                  </dl>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-pretty text-body text-text-secondary">
            In every model, the custom software we build for you is intended to
            be yours under the project agreement, and your data stays your data.
            What changes is who holds the infrastructure and who keeps it
            running.{" "}
            <span className="text-text-primary">
              Not sure which fits? We&apos;ll recommend a setup based on your
              technical team, security and compliance requirements, budget, and
              how much you want to manage yourself.
            </span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
