import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Selected work — honest placeholder slots.
 *
 * AGility has no client case studies yet, so this section is deliberately, and
 * visibly, a set of empty slots. They read as "coming soon" placeholders —
 * never as real or implied clients. The category labels describe the KIND of
 * work we do, not any specific engagement.
 *
 * The dashed borders and hatched preview areas are load-bearing here, not
 * decoration: an empty slot has to look unmistakably empty. A polished-looking
 * card with vague copy is how a placeholder starts reading as a real project.
 *
 * TODO: replace each placeholder with a real, published case study once a
 * client has agreed to share it — link each to its own `/work/<slug>` page and
 * drop the dashed placeholder treatment.
 */
const PLACEHOLDERS = [
  {
    category: "Operations automation",
    body: "A real project will live here once it's shipped and our client is happy to share it — the manual process, what we automated, and the hours it gave back.",
  },
  {
    category: "Customer workflows",
    body: "The kind of build that answers leads and handles follow-up without anyone chasing it by hand. The story goes here when there's a real one to tell.",
  },
  {
    category: "Internal tooling",
    body: "Custom software a growing team runs on every day. We'll show the before, the after, and the numbers — with permission, never invented.",
  },
];

const ANATOMY = [
  {
    label: "The problem",
    body: "The process that was costing time or money, and what it was costing.",
  },
  {
    label: "What we built",
    body: "The software we shipped, and how it fits the tools the client already used.",
  },
  {
    label: "The result",
    body: "The measurable outcome — in real numbers, shared with the client's blessing.",
  },
  {
    label: "How it's delivered",
    body: "Which model they chose — who owns the software and infrastructure, and who operates it.",
  },
];

export function SelectedWork() {
  return (
    <Section id="selected-work" aria-labelledby="selected-work-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          headingId="selected-work-heading"
          title="Case studies are on the way."
          lede="We'd rather leave these slots honestly empty than fill them with stock photos and invented results. When a client is happy to share a project, it goes here — and every claim in it will be real."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3"
          selector=":scope > li"
        >
          {PLACEHOLDERS.map((item) => (
            <li
              key={item.category}
              className="flex h-full flex-col rounded-xl border border-dashed border-border-strong p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-eyebrow uppercase text-text-muted">
                  Case study
                </span>
                <span className="rounded-sm border border-border-strong px-2 py-0.5 font-mono text-eyebrow uppercase text-text-muted">
                  Coming soon
                </span>
              </div>

              <div
                aria-hidden="true"
                className="mt-6 aspect-[16/10] rounded-md border border-dashed border-border"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(239,235,228,0.035) 0, rgba(239,235,228,0.035) 1px, transparent 1px, transparent 10px)",
                }}
              />

              <h3 className="mt-6 text-h4 font-semibold text-text-primary">
                {item.category}
              </h3>
              <p className="mt-2 text-pretty text-small text-text-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <p className="font-mono text-eyebrow uppercase text-text-muted">
            What each one will show
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {ANATOMY.map((step, i) => (
              <div key={step.label}>
                <dt className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="tabular font-mono text-eyebrow text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h4 font-semibold text-text-primary">
                    {step.label}
                  </span>
                </dt>
                <dd className="mt-2 text-pretty text-small text-text-secondary">
                  {step.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
