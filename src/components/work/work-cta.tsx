import { CtaBand } from "@/components/layout/cta-band";

export function WorkCta() {
  return (
    <CtaBand
      id="start-a-project"
      eyebrow="Start a project"
      title="Judge us by the work, then let's talk."
      subtitle="Until the case studies land, everything you need to weigh us up is already public — how we build, what we ship, and the standards we hold. Look at the work, then bring us the problem that's costing you time."
      primary={{ label: "Book a consultation", href: "/book" }}
      secondary={{ label: "Tell us about your project", href: "/contact" }}
    />
  );
}
