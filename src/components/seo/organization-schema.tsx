import { getLocale, getTranslations } from "next-intl/server";

import { githubUrl, linkedinUrl, siteName, siteUrl } from "@/lib/site-config";

/**
 * Structured data (schema.org / JSON-LD), rendered once in the root layout so
 * it applies site-wide: the Organization, plus a WebSite node that states which
 * language this version of the site is in.
 */
export async function OrganizationSchema() {
  const locale = await getLocale();
  const t = await getTranslations("metadata");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: t("home.description"),
    sameAs: [githubUrl, linkedinUrl],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
    inLanguage: locale,
  };

  return (
    <>
      {[organization, website].map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          // JSON.stringify output is safe to inline; no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
