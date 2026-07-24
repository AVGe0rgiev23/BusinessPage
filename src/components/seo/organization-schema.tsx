import {
  githubUrl,
  linkedinUrl,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site-config";

/**
 * Organization structured data (schema.org / JSON-LD), rendered once in the
 * root layout so it applies site-wide.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    sameAs: [githubUrl, linkedinUrl],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
