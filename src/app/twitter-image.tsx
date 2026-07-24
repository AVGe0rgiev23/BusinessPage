import { renderSocialImage } from "@/lib/og-image";

// Twitter card image — reuses the exact same branded artwork as the OpenGraph
// image so both networks render one consistent card.
export { size, contentType, alt } from "@/lib/og-image";

export default function TwitterImage() {
  return renderSocialImage();
}
