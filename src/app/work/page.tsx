import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Philosophy } from "@/components/work/philosophy";
import { GithubProjects } from "@/components/work/github-projects";
import { EngineeringPractice } from "@/components/work/engineering-practice";
import { SelectedWork } from "@/components/work/selected-work";
import { WorkCta } from "@/components/work/work-cta";

const title = "Work — My Engineering Practice | AGility";
const description =
  "No client case studies yet. Instead of inventing them: my own product, two hackathon builds, the code on GitHub, and the engineering standards behind all of it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="My work"
        title="I'd rather show you how I build than fake a portfolio."
        subtitle="AGility is early, and I'm honest about it. There's no wall of client logos yet — so instead of inventing one, the engineering goes out in the open. Judge it on the work itself."
      />
      <Philosophy />
      <GithubProjects />
      <EngineeringPractice />
      <SelectedWork />
      <WorkCta />
    </main>
  );
}
