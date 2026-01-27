import { cache } from "react";
import { getPayloadClient } from "@/lib/payload-utils";
import { LocaleType } from "@/lib/locale-utils";

/**
 * Get all product categories
 * Used in products page for filtering
 */
export const getCategories = cache(async (locale: LocaleType = "vi") => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    locale,
    where: {
      status: {
        equals: "active",
      },
    },
    sort: "displayOrder",
    limit: 100,
  });

  return result.docs;
});
