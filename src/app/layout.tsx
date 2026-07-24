import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = siteTitle;
const description = siteDescription;

export const metadata: Metadata = {
  // Resolves every relative URL (canonical, OpenGraph/Twitter images, ...)
  // against the site origin. Set NEXT_PUBLIC_SITE_URL for production.
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  // Deliberately NO title/description here. Next backfills og:title/og:description
  // (and twitter:title/description below) from each route's own `title` /
  // `description`, so subpages get their own values instead of inheriting these
  // site defaults. Keeping only `type` also means subpages don't need to redefine
  // `openGraph`, so the file-based `opengraph-image` is inherited on every route
  // (a per-page `openGraph` object would replace this one wholesale and drop the
  // image). Verified against the generated <head> for home + a subpage.
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <OrganizationSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg"
        >
          Skip to content
        </a>
        <Nav />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
