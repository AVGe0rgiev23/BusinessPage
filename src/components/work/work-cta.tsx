import { CtaBand } from "@/components/layout/cta-band";

export function WorkCta() {
  return (
    <CtaBand
      id="start-a-project"
      eyebrow="Start a project"
      title="Judge me by the work, then let's talk."
      subtitle="Until the case studies land, everything you need to weigh me up is already public — how I build, what I ship, and the standards I hold. Look at the work, then bring me the problem that's costing you time."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Tell me about your project", href: "/contact" }}
    />
  );
}
