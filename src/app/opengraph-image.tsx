import { renderSocialImage } from "@/lib/og-image";

// Default OpenGraph image for every route that doesn't override it — one
// consistent branded card across the whole site.
export { size, contentType, alt } from "@/lib/og-image";

export default function OpengraphImage() {
  return renderSocialImage();
}
