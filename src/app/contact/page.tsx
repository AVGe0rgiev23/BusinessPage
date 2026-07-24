import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactAside } from "@/components/contact/contact-aside";

const title = "Contact AGility — Tell Us What's Slowing You Down";
const description =
  "Send us a message about the repetitive work costing your team time and money. We read every message ourselves and reply within one business day.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Contact"
        title="Tell us where your time is going."
        subtitle="Describe the work that's slowing your team down. We'll read it ourselves and reply within one business day — no jargon, no sales script, no pressure."
      />

      <Section aria-labelledby="contact-heading" className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Form — the primary conversion action */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2
                  id="contact-heading"
                  className="text-h2 font-semibold text-text-primary"
                >
                  Send us a message
                </h2>
                <p className="mt-3 max-w-xl text-body text-text-secondary">
                  A few details are all we need to point you in the right
                  direction. Everything you send stays between us.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            {/* Alternative paths */}
            <aside aria-labelledby="contact-alt-heading" className="lg:col-span-1">
              <Reveal delay={0.1}>
                <ContactAside />
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
