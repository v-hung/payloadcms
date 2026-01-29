import { Media } from "@/types/payload";

type MediaField = Media | null | number | string | undefined;

// Type guard
export function isMediaObject(
  media: MediaField,
): media is Media & { url: string } {
  return (
    media !== null &&
    typeof media === "object" &&
    "url" in media &&
    typeof media.url === "string"
  );
}

// Get URL an toàn
export function getMediaUrl(media: MediaField, fallback = ""): string {
  if (isMediaObject(media)) {
    return media.url;
  }
  return fallback;
}

// Get full media object
export function getMediaObject(media: MediaField): Media | null {
  return isMediaObject(media) ? media : null;
}
