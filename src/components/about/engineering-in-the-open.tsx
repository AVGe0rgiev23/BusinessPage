import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { PointList } from "@/components/shared/point-list";
import { githubUrl } from "@/lib/site-config";

/**
 * EngineeringInTheOpen — the About-page tie to GitHub / open source, framed
 * around trust: seeing how the work is done before you hire.
 *
 * Two of the three points here used to claim published libraries and upstream
 * contributions. Neither has happened yet, so both are gone rather than
 * softened — the same edit was made in `home/open-source.tsx` and
 * `work/github-projects.tsx`, and all three must stay in step.
 *
 * The 112px GitHub logo in a bordered square with an indigo glow behind it is
 * gone. It was the last surviving piece of the old palette in the codebase, and
 * it occupied half the section to communicate "GitHub" — which the button below
 * it already said, in words.
 */
const POINTS = [
  { id: "judgeWorkPitch" },
  { id: "codeDescription" },
  { id: "historyCheck" },
] as const;

export async function EngineeringInTheOpen() {
  const t = await getTranslations("about.engineeringInTheOpen");
  return (
    <Section
      id="in-the-open"
      aria-labelledby="in-the-open-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                04
              </span>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </div>

            <h2
              id="in-the-open-heading"
              className="mt-7 max-w-[16ch] text-balance text-h2 font-semibold text-text-primary"
            >
              {t("title")}
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              {t("body")}
            </p>

            <Button
              size="lg"
              variant="secondary"
              render={
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" />
              }
              className={cn("group mt-9", focusRing)}
            >
              <GithubIcon className="size-5" aria-hidden="true" />
              {t("button")}
              <ArrowUpRight
                className="text-text-muted transition-transform duration-[--duration-fast] group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </Reveal>

          <PointList
            items={POINTS.map((point) => ({
              title: t(`points.${point.id}.title`),
              body: t(`points.${point.id}.body`),
            }))}
            className="lg:pt-1"
          />
        </div>
      </Container>
    </Section>
  );
}
