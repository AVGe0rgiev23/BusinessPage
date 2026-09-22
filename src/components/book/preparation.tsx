import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";

const COLUMNS = [
  { id: "whoItsFor", items: ["growingBusinessesBuried","teamsCopyPasting","ownersWhoSuspect"] },
  { id: "howToPrepare", items: ["nothingFormalNo","thinkOneTask","bringAnyTools"] },
] as const;

/**
 * Preparation — who the call suits and what (little) to bring.
 *
 * The checkmark bullets are gone. A tick beside "Nothing formal — no slides or
 * documents needed" implies a completed requirement, which is the opposite of
 * the point; these are notes, not a checklist. They are now hairline-separated
 * rows, which says "list" without asserting anything.
 */
export async function Preparation() {
  const t = await getTranslations("book.preparation");
  return (
    <Section aria-labelledby="prepare-heading" className="pt-0">
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <h2
            id="prepare-heading"
            className="mt-7 max-w-[18ch] text-balance text-h2 font-semibold text-text-primary"
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[54ch] text-pretty text-body-lg text-text-secondary">
            {t("lede")}
          </p>
        </Reveal>

        <RevealGroup
          className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2"
          selector=":scope > div"
        >
          {COLUMNS.map((column) => (
            <div key={column.id}>
              <h3 className="font-mono text-eyebrow uppercase text-text-secondary">
                {t(`columns.${column.id}.title`)}
              </h3>
              <ul className="mt-5 border-t border-border">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-4 text-pretty text-body text-text-secondary"
                  >
                    {t(`items.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
