import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { arrowLink, cn, focusRing } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Technology — the stack, as a spec sheet.
 *
 * A definition list: category on the left, the tools under it on the right,
 * separated by hairlines. This is how a technical reference document would
 * present the same information, and it is far quicker to scan than five
 * bordered cards each with its own icon.
 *
 * The chips are the one place on the site where the same small pill shape
 * repeats many times — which is fine, because here the repetition *is* the
 * information. They are a set of like things.
 */
const STACK = [
  { id: "languages", items: ["typescript","javascript","python","sql"] },
  { id: "frameworksRuntime", items: ["react","nextJs","nodeJs"] },
  { id: "data", items: ["postgresql","redis","vectorDatabases"] },
  { id: "aiLlmTooling", items: ["llmApis","ragPipelines","embeddings","agentFrameworks"] },
  { id: "cloudInfrastructure", items: ["vercel","aws","docker","ciCd"] },
] as const;

export async function Technology() {
  const t = await getTranslations("home.technology");
  return (
    <Section id="technology" aria-labelledby="technology-heading">
      <Container>
        <SectionHeading
          index="08"
          eyebrow={t("heading.eyebrow")}
          headingId="technology-heading"
          title={t("heading.title")}
          lede={t("heading.lede")}
        />

        <RevealGroup
          as="dl"
          className="mt-16 border-t border-border md:mt-20"
          selector=":scope > div"
        >
          {STACK.map((group) => (
            <div
              key={group.id}
              className="grid gap-x-10 gap-y-4 border-b border-border py-7 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-baseline lg:gap-x-16"
            >
              <dt className="font-mono text-eyebrow uppercase text-text-secondary">
                {t(`stack.groups.${group.id}.label`)}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border bg-bg-surface px-2.5 py-1 text-small text-text-primary transition-colors duration-[--duration-fast] hover:border-border-hover"
                  >
                    {t(`stack.items.${item}`)}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <Link
            href="/technologies"
            className={cn(arrowLink, focusRing)}
          >
            {t("exploreAll")}
            <ArrowRight
              className="size-4 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
