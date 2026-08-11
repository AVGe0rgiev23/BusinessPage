import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

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
 * ── Why a matrix rather than three cards ────────────────────────────────────
 * Someone reading this is doing exactly one thing: comparing. Three cards force
 * them to hold column two in their head while they read column three. A matrix
 * with row-aligned fields lets them read *across* — "who holds the accounts?" —
 * which is the actual question. CSS subgrid keeps the four bands aligned no
 * matter how much text each model needs, so the comparison survives copy edits.
 *
 * Server Component. Renders `<h2>` + `<h3>` per model, so it must sit on a page
 * that already has its own `<h1>`.
 */
interface Model {
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
    name: "Fully managed",
    tagline: "You run the business. We run the software.",
    body: "We build the system and operate it for you — hosting, deployments, monitoring, maintenance, and ongoing improvements. You just use the software, through whatever interface makes sense: an app, a dashboard, email, Slack, or an API.",
    owns: "AGility operates the production environment on your behalf",
    operates: "AGility",
  },
  {
    name: "Client-owned",
    tagline: "You own and operate it.",
    body: "We build and deploy the system into infrastructure and accounts you control, then hand over the agreed source code, configuration, and documentation. Your team — or another provider you choose — takes it from there.",
    owns: "You hold the cloud, data, and third-party accounts",
    operates: "Your team, or a provider you appoint",
  },
  {
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
  /** Two-digit index shown in the section rule. */
  index?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Optional background utility (e.g. "bg-bg-surface") for section alternation. */
  className?: string;
}

export function DeliveryModels({
  id = "delivery-models",
  index,
  eyebrow = "Your software. Your choice.",
  heading = "One build. Three ways to work together.",
  intro = "We don't force every client into the same delivery model. We can run the system for you, deploy it into infrastructure you control, or manage software running inside your own environment. We'll recommend the approach that fits your technical, operational, and security requirements — but you choose how you want to work with us.",
  className,
}: DeliveryModelsProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} className={className}>
      <Container>
        <SectionHeading
          index={index}
          eyebrow={eyebrow}
          headingId={headingId}
          title={heading}
          lede={intro}
        />

        <RevealGroup
          as="ul"
          className={cn(
            "mt-16 grid gap-y-12 md:mt-20",
            // Four aligned bands: heading, description, infrastructure, operation.
            "lg:grid-cols-3 lg:gap-x-0 lg:gap-y-0 lg:grid-rows-[auto_auto_auto_auto]"
          )}
          selector=":scope > li"
        >
          {MODELS.map((model, i) => (
            <li
              key={model.name}
              className={cn(
                "group border-t border-border pt-8",
                "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-7 lg:pr-8",
                // Column rules rather than card borders. The models are facets
                // of one offer, and enclosing each in its own box says the
                // opposite.
                i > 0 && "lg:border-l lg:border-l-border lg:pl-8"
              )}
            >
              <div>
                <h3 className="text-h3 font-semibold text-text-primary">
                  {model.name}
                </h3>
                <p className="mt-2 text-body font-medium text-accent">
                  {model.tagline}
                </p>
              </div>

              <p className="mt-4 text-pretty text-body text-text-secondary lg:mt-0">
                {model.body}
              </p>

              {/*
                Ownership and operation kept visibly separate — they are
                different questions, and conflating them is the single easiest
                way for this page to become inaccurate.
              */}
              <dl className="mt-6 border-t border-border pt-5 lg:mt-0">
                <dt className="font-mono text-eyebrow uppercase text-text-muted">
                  Infrastructure &amp; accounts
                </dt>
                <dd className="mt-2 text-small text-text-secondary">
                  {model.owns}
                </dd>
              </dl>

              <dl className="mt-5 lg:mt-0">
                <dt className="font-mono text-eyebrow uppercase text-text-muted">
                  Runs &amp; maintains it
                </dt>
                <dd className="mt-2 text-small text-text-secondary">
                  {model.operates}
                </dd>
              </dl>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 border-t border-border pt-8">
          <p className="max-w-[80ch] text-pretty text-body text-text-secondary">
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
