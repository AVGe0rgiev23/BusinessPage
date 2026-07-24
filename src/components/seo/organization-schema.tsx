import { siteDescription, siteName, siteUrl } from "@/lib/site-config";

/**
 * Organization structured data (schema.org / JSON-LD), rendered once in the
 * root layout so it applies site-wide.
 *
 * Only fields we can populate with real, non-fabricated data are included.
 * `sameAs` (social profiles) is intentionally omitted: the GitHub / LinkedIn
 * links elsewhere in the codebase are still placeholder `"#"` values pending
 * real URLs from the client (see `contact-aside.tsx` / `booking-cta.tsx`).
 *
 * TODO (before going live): once the real GitHub + LinkedIn URLs are confirmed,
 * add `sameAs: ["https://github.com/...", "https://www.linkedin.com/company/..."]`.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
