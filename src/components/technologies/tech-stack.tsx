import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealGroup } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * TechStack — the full toolset, as a spec sheet.
 *
 * Eight categories in a two-column definition list: category on the left, tools
 * on the right, hairline-ruled. The homepage shows an abridged five-group
 * version in the same shape, so this reads as the full reference rather than a
 * different page's take on the same facts.
 */
/*
  Each group is an id (its label lives in `technologies.stack.groups`) and a list
  of tool ids. Tool names are catalog entries too (`technologies.stack.items`),
  so proper names stay exactly as written and prose-like items can be translated.
*/
const STACK = [
  { id: "languages", items: ["typescript","javascript","python","sql"] },
  { id: "frontend", items: ["react","nextJs","tailwindCss","framerMotion"] },
  { id: "backendApis", items: ["nodeJs","restApis","graphql","webhooks"] },
  { id: "backgroundJobsWorkflow", items: ["triggerDev","queues","scheduledJobs","retriesConcurrencyControls","backgroundWorkers"] },
  { id: "dataStorage", items: ["postgresql","redis","vectorDatabases","objectStorage"] },
  { id: "aiLlmTooling", items: ["llmApis","ragPipelines","embeddings","vectorSearch","agents","functionCalling"] },
  { id: "infrastructureCloud", items: ["vercel","aws","docker","ciCd","edgeFunctions"] },
  { id: "integrations", items: ["crms","payments","emailMessaging","calendars","thirdPartyApis"] },
] as const;

export async function TechStack() {
  const t = await getTranslations("technologies.stack");
  return (
    <Section id="stack" aria-labelledby="stack-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow={t("heading.eyebrow")}
          headingId="stack-heading"
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
              className="grid gap-x-10 gap-y-4 border-b border-border py-7 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-baseline lg:gap-x-16"
            >
              <dt className="max-w-[26ch] font-mono text-eyebrow uppercase text-text-secondary">
                {t(`groups.${group.id}.label`)}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-border bg-bg-surface px-2.5 py-1 text-small text-text-primary transition-colors duration-[--duration-fast] hover:border-border-hover"
                  >
                    {t(`items.${item}`)}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
