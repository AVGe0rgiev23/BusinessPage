import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { focusRing } from "@/lib/utils";

/**
 * The "prefer to write first?" line under a CTA band, shared by every CTA that
 * carries it so the sentence (and its link) is written — and translated — once.
 * The link is part of the message (`<contact>…</contact>`), so each language
 * can place it wherever its word order wants it.
 */
export async function WriteFirstFootnote() {
  const t = await getTranslations("common.cta");

  return (
    <>
      {t.rich("writeFirst", {
        contact: (chunks) => (
          <Link
            href="/contact"
            className={`rounded-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline ${focusRing}`}
          >
            {chunks}
          </Link>
        ),
      })}
    </>
  );
}
