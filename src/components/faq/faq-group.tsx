import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/layout/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface FaqItem {
  /** The question — becomes the accordion trigger, rendered inside a Base UI
   *  `Accordion.Header` which is an `<h3>`, keeping heading order valid. */
  q: string;
  /** The answer — a plain string is wrapped in a `<p>`; pass JSX for links or
   *  multiple paragraphs. */
  a: React.ReactNode;
}

interface FaqGroupProps {
  /** Section id; the labelling `<h2>` gets `${id}-heading`. */
  id: string;
  /** Two-digit index shown beside the eyebrow. */
  index?: string;
  eyebrow: string;
  heading: string;
  items: FaqItem[];
  /** Optional background utility (e.g. "bg-bg-surface") for section alternation. */
  className?: string;
}

/**
 * FaqGroup — one labelled FAQ block: a sticky section `<h2>` on the left and an
 * accordion on the right.
 *
 * The trigger carries no styling overrides any more. All of the question's
 * typography, hover behaviour, focus ring and the rotating plus now live in
 * `ui/accordion.tsx`, so every accordion on the site is identical by
 * construction rather than by each call site remembering to pass the same
 * classes. Server Component — the accordion primitives carry their own
 * "use client".
 */
export function FaqGroup({
  id,
  index,
  eyebrow,
  heading,
  items,
  className,
}: FaqGroupProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} className={className}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              {index ? (
                <span
                  aria-hidden="true"
                  className="tabular font-mono text-eyebrow text-accent"
                >
                  {index}
                </span>
              ) : null}
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2
              id={headingId}
              className="mt-6 text-balance text-h2 font-semibold text-text-primary"
            >
              {heading}
            </h2>
          </Reveal>

          <Reveal>
            <Accordion>
              {items.map((item) => (
                <AccordionItem key={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>
                    {typeof item.a === "string" ? (
                      <p className="max-w-[68ch] text-body text-text-secondary">
                        {item.a}
                      </p>
                    ) : (
                      <div className="max-w-[68ch] text-body text-text-secondary">
                        {item.a}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
