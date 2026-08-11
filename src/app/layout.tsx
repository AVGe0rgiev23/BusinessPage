import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-config";

/*
  Three variable faces, latin subset only — one woff2 each, ~103 KB preloaded
  in total.

  Archivo carries every heading. Its `wdth` axis is deliberately NOT requested:
  including it takes this file from 34 KB to 88 KB, and all it buys is roughly
  a 6% narrowing that almost nobody would consciously notice. 54 KB is a lot to
  pay for that. The headings get their character from size, weight and tight
  tracking instead, which costs nothing.
*/
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
      // The inline script below adds `js-reveal` to this element before React
      // hydrates, so the client's className is intentionally one class longer
      // than the server's. That is the only difference, and it is the whole
      // point of the script — suppress the warning rather than give up the
      // no-JS fallback.
      suppressHydrationWarning
      className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Sets `js-reveal` on <html> before first paint, which is what arms the
          CSS that hides `[data-reveal]` elements ahead of their scroll-in
          animation. Doing it here rather than in the stylesheet means the
          hidden state only ever exists when JavaScript is running to undo it —
          with JS off or broken, the class is never added and every section
          renders visible. It also lands before paint, so there is no flash of
          content that then jumps back to hidden.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-reveal')`,
          }}
        />
      </head>
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
