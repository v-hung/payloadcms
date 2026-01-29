import { cache } from "react";
import { getPayloadClient } from "@/lib/server/payload";
import { getLocale } from "next-intl/server";

/**
 * Get all product categories
 * Used in products page for filtering
 */
export const getCategories = cache(async () => {
  const locale = await getLocale();
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
