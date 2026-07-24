import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

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
  eyebrow: string;
  heading: string;
  items: FaqItem[];
  /** Optional background utility (e.g. "bg-bg-surface") for section alternation. */
  className?: string;
}

/**
 * FaqGroup — one labelled FAQ block: a section `<h2>` on the left and a Base UI
 * accordion on the right. Server Component (the accordion primitives carry their
 * own "use client"). Each `AccordionTrigger` sits inside an `<h3>` header, so the
 * page's heading order stays h1 → h2 → h3.
 */
export function FaqGroup({
  id,
  eyebrow,
  heading,
  items,
  className,
}: FaqGroupProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} className={className}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow font-mono uppercase tracking-wider text-accent">
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-4 text-balance text-h2 font-semibold text-text-primary"
            >
              {heading}
            </h2>
          </Reveal>

          <Reveal>
            <Accordion>
              {items.map((item) => (
                <AccordionItem key={item.q}>
                  <AccordionTrigger
                    className={`py-5 text-body font-medium text-text-primary hover:no-underline ${focusRing}`}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    {typeof item.a === "string" ? (
                      <p className="max-w-2xl text-body text-text-secondary">
                        {item.a}
                      </p>
                    ) : (
                      <div className="max-w-2xl text-body text-text-secondary">
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
