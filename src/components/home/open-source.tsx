import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { githubUrl } from "@/lib/site-config";

/**
 * OpenSource — proof that the engineering claim is checkable.
 *
 * The old version put a 112px GitHub logo in a bordered square with a radial
 * glow behind it, taking up half the section to say nothing the button beneath
 * it didn't already say. It is now a two-column split where the right side
 * carries the one claim this section can actually back.
 *
 * That right column used to hold three points. Two of them — publishing tools
 * and libraries, and contributing back upstream — described work that has not
 * happened yet, which is exactly the kind of claim a visitor can check in about
 * fifteen seconds. They are gone rather than softened. What is left is the
 * claim the GitHub link genuinely supports: the code is readable before you
 * commit to anything. One honest line beats three that invite a fact-check.
 *
 * Sits on the sunken background — the darkest surface on the site — so this and
 * the Connect band beneath it read as a single quieter passage between the
 * argument and the closing FAQ.
 */

export async function OpenSource() {
  const t = await getTranslations("home.openSource");
  const shared = await getTranslations("shared");
  return (
    <Section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="border-t border-border bg-bg-sunken"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tabular font-mono text-eyebrow text-accent"
              >
                10
              </span>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </div>

            <h2
              id="open-source-heading"
              className="mt-7 max-w-[14ch] text-balance text-h2 font-semibold text-text-primary"
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

          {/* One statement, not a list. A `<ul>` holding a single `<li>` reads
              as a list that lost its other items; set as a standalone line
              between the same hairline rules, it reads as the point of the
              section. */}
          <Reveal className="lg:pt-2">
            <p className="border-y border-border py-8 text-pretty text-body-lg text-text-secondary">
              {t("statement")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
