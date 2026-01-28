import { cache } from "react";
import { getPayloadClient } from "@/lib/payload-utils";
import { LocaleType } from "@/lib/locale-utils";

/**
 * Get company information global singleton
 * Used in header, footer, and about page
 */
export const getCompanyInfo = cache(async (locale: LocaleType = "vi") => {
  const payload = await getPayloadClient();

  const result = await payload.findGlobal({
    slug: "company-info",
    locale,
  });

  return result;
});
