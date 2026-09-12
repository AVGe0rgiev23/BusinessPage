import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Selected work — real builds, honestly labelled.
 *
 * This section used to be three dashed "case study — coming soon" cards. The
 * intent was honesty, but the effect was the opposite of the one wanted: three
 * empty slots advertise the absence rather than acknowledge it, and a visitor
 * counts them. Saying "no client projects yet" once, in a sentence, and then
 * showing actual built things is both shorter and more convincing.
 *
 * ── The labels are the load-bearing part ────────────────────────────────────
 * Every item here is either the operator's own product or a hackathon build.
 * None of it is client work, and each card says so on its face — in the UI, as
 * a badge, not in a caption, a tooltip, or a footnote below the grid. A visitor
 * who scans the grid and reads nothing else must still come away knowing these
 * were not commissioned. Do not move these labels into small print, and do not
 * add an item here without one.
 */
interface Build {
  name: string;
  /** Rendered as a badge on the card. Says what this is NOT, first. */
  label: string;
  body: string;
  href: string;
  /** Link text — names the destination so it isn't a bare "view project". */
  linkLabel: string;
}

const BUILDS: Build[] = [
  {
    name: "LeadGenius",
    label: "Self-built — not client work",
    // TODO: expand this with what LeadGenius actually does and who it is for.
    // The current copy is true but deliberately says nothing about the product
    // itself, because the operator has not supplied those details yet.
    body: "My own product, built and maintained end to end — the same stack, review, and testing standards I would bring to a client project. It exists because I wanted it to exist, not because anyone commissioned it.",
    // TODO: replace with the real repository or live demo URL. This is a
    // placeholder pointing at the GitHub profile while the repo is private.
    // The card must not ship with a link that 404s or that implies a public
    // repo exists when it does not.
    href: "https://github.com/AVGe0rgiev23",
    linkLabel: "View on GitHub",
  },
  {
    // TODO: replace `name`, `body`, and `href` with the real hackathon build.
    // The `label` is correct as written and should not change.
    name: "Hackathon build 01",
    label: "Hackathon build — not a client project",
    body: "TODO: what it was, what it did, and which event it was built at. Written under time pressure, and worth showing for how it was approached rather than as a finished product.",
    href: "https://github.com/AVGe0rgiev23",
    linkLabel: "View on GitHub",
  },
  {
    // TODO: replace `name`, `body`, and `href` with the real hackathon build.
    // The `label` is correct as written and should not change.
    name: "Hackathon build 02",
    label: "Hackathon build — not a client project",
    body: "TODO: what it was, what it did, and which event it was built at. Written under time pressure, and worth showing for how it was approached rather than as a finished product.",
    href: "https://github.com/AVGe0rgiev23",
    linkLabel: "View on GitHub",
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
          title="No client projects to show yet."
          lede="Here's what I've built instead: my own product and two hackathon builds. None of it is client work, and every card says which is which."
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3"
          selector=":scope > li"
        >
          {BUILDS.map((build) => (
            <li
              key={build.name}
              className="group flex h-full flex-col rounded-xl border border-border bg-bg-surface p-6 transition-colors duration-[--duration-base] hover:border-border-hover"
            >
              {/* The label sits above the name, not below it: a visitor should
                  read what this isn't before they read what it's called. */}
              <p className="inline-flex self-start rounded-sm border border-border-strong px-2 py-1 font-mono text-eyebrow uppercase text-text-muted">
                {build.label}
              </p>

              <h3 className="mt-6 text-h3 font-semibold text-text-primary">
                {build.name}
              </h3>

              <p className="mt-3 flex-1 text-pretty text-small text-text-secondary">
                {build.body}
              </p>

              <a
                href={build.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-6 -mx-2 inline-flex items-center gap-2 self-start rounded-sm px-2 py-1.5 text-small font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-hover",
                  focusRing
                )}
              >
                {build.linkLabel}
                <span className="sr-only"> — {build.name}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
