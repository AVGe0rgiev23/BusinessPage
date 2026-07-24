import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Philosophy } from "@/components/work/philosophy";
import { GithubProjects } from "@/components/work/github-projects";
import { EngineeringPractice } from "@/components/work/engineering-practice";
import { SelectedWork } from "@/components/work/selected-work";
import { WorkCta } from "@/components/work/work-cta";

const title = "Work — Our Engineering Practice | AGility";
const description =
  "We're early and building our public track record. Instead of invented case studies, see how we actually build: open-source work, engineering standards, and what our case studies will show.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Our work"
        title="We'd rather show you how we build than fake a portfolio."
        subtitle="AGility is early, and we're honest about it. We haven't collected a wall of client logos yet — so instead of inventing them, we're putting our engineering out in the open. Judge us on the work itself."
      />
      <Philosophy />
      <GithubProjects />
      <EngineeringPractice />
      <SelectedWork />
      <WorkCta />
    </main>
  );
}
