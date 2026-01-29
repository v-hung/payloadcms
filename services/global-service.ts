import { cache } from "react";
import { getPayloadClient } from "@/lib/server/payload";
import { getLocale } from "next-intl/server";

/**
 * Get company information global singleton
 * Used in header, footer, and about page
 */
export const getCompanyInfo = cache(async () => {
  const locale = await getLocale();
  const payload = await getPayloadClient();

  const result = await payload.findGlobal({
    slug: "company-info",
    locale,
  });

  return result;
});
