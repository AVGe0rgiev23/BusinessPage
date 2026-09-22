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

/*
  These points used to claim published tools and libraries, and contributions
  sent back upstream. Neither has happened yet, and both are checkable in about
  fifteen seconds by the one kind of visitor most worth impressing. They were
  removed rather than hedged — the same edit was made to the home page's
  `home/open-source.tsx`, and the two must stay in step.

  What is left is what a GitHub profile genuinely evidences: readable code,
  a commit history, and the standards visible in both.
*/
const PROOF = [
  { id: "codeRead" },
  { id: "historyCheck" },
  { id: "standardsHold" },
] as const;

export async function GithubProjects() {
  const t = await getTranslations("work.githubProjects");
  const shared = await getTranslations("shared");
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
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
                02
              </span>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </div>

            <h2
              id="open-source-heading"
              className="mt-7 max-w-[16ch] text-balance text-h2 font-semibold text-text-primary"
            >
              {t("title")}
            </h2>

            <p className="mt-6 max-w-[52ch] text-pretty text-body-lg text-text-secondary">
              {shared("githubIntro")}
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
            items={PROOF.map((point) => ({
              title: t(`proof.${point.id}.title`),
              body: t(`proof.${point.id}.body`),
            }))}
            className="lg:pt-1"
          />
        </div>
      </Container>
    </Section>
  );
}
