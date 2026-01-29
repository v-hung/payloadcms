import slugify from "slugify";

/**
 * Generate URL-friendly slug from text
 * Handles Vietnamese characters properly
 */
export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}

/**
 * Slug field hook - auto-generate from title/name if empty
 * Works with localized fields
 */
export function createSlugHook(sourceField: "title" | "name" = "title") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ value, data }: { value?: string; data?: any }) => {
    if (!value && data?.[sourceField]) {
      // Handle localized source field
      const sourceValue =
        typeof data[sourceField] === "object"
          ? data[sourceField].vi || data[sourceField].en
          : data[sourceField];

      if (sourceValue) {
        return generateSlug(sourceValue);
      }
    }
    return value;
  };
}
