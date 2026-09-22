import { getTranslations } from "next-intl/server";
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
/*
  The words for each build (`name`, `label`, `body`, `linkLabel`) live in the
  catalog (`work.selectedWork.builds`). Notes for whoever fills them in:
    label     — rendered as a badge and says what this is NOT, first. It is
                correct as written for all three and must not change.
    linkLabel — names the destination so it isn't a bare "view project".

  TODO (LeadGenius): expand its body with what it actually does and who it is
  for. The current copy is true but deliberately says nothing about the product,
  because the operator has not supplied those details yet.
  TODO (both hackathon builds): replace `name` and `body` in the catalog with the
  real build (what it was, what it did, which event), in every language.
  TODO (all three): replace each `href` with the real repository or live demo.
  They point at the GitHub profile while the repos are private; a card must not
  ship with a link that 404s or that implies a public repo exists when it does
  not.
*/
const BUILDS = [
  { id: "leadgenius", href: "https://github.com/AVGe0rgiev23" },
  { id: "hackathonBuild01", href: "https://github.com/AVGe0rgiev23" },
  { id: "hackathonBuild02", href: "https://github.com/AVGe0rgiev23" },
] as const;

export async function SelectedWork() {
  const t = await getTranslations("work.selectedWork");
  return (
    <Section id="selected-work" aria-labelledby="selected-work-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={t("heading.eyebrow")}
          headingId="selected-work-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3"
          selector=":scope > li"
        >
          {BUILDS.map((build) => (
            <li
              key={build.id}
              className="group flex h-full flex-col rounded-xl border border-border bg-bg-surface p-6 transition-colors duration-[--duration-base] hover:border-border-hover"
            >
              {/* The label sits above the name, not below it: a visitor should
                  read what this isn't before they read what it's called. */}
              <p className="inline-flex self-start rounded-sm border border-border-strong px-2 py-1 font-mono text-eyebrow uppercase text-text-muted">
                {t(`builds.${build.id}.label`)}
              </p>

              <h3 className="mt-6 text-h3 font-semibold text-text-primary">
                {t(`builds.${build.id}.name`)}
              </h3>

              <p className="mt-3 flex-1 text-pretty text-small text-text-secondary">
                {t(`builds.${build.id}.body`)}
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
                {t(`builds.${build.id}.linkLabel`)}
                <span className="sr-only">
                  {t("linkSuffix", { name: t(`builds.${build.id}.name`) })}
                </span>
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
