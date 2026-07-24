import { CtaBand } from "@/components/layout/cta-band";

export function FaqCta() {
  return (
    <CtaBand
      id="still-have-questions"
      eyebrow="Still have questions?"
      title="The quickest answer is a conversation."
      subtitle="If your question isn't here, ask us directly. Book a free consultation and we'll talk through your situation — no jargon, no pressure to commit."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Ask us anything", href: "/contact", icon: true }}
    />
  );
}
