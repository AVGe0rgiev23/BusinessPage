import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-config";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// All 9 routes. Home + the two conversion pages (book / contact) rank highest;
// static informational pages (technologies / faq) rank lowest.
const routes: Route[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/book", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/process", changeFrequency: "yearly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/work", changeFrequency: "yearly", priority: 0.7 },
  { path: "/technologies", changeFrequency: "yearly", priority: 0.6 },
  { path: "/faq", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
