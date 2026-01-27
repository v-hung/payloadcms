import { cache } from "react";
import { getPayloadClient } from "@/lib/payload-utils";
import { LocaleType } from "@/lib/locale-utils";

/**
 * Get products with optional category filter
 * Used in products listing pages
 */
export const getProducts = cache(
  async ({
    locale = "vi",
    categorySlug,
    featured,
    limit = 20,
    page = 1,
  }: {
    locale?: LocaleType;
    categorySlug?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }) => {
    const payload = await getPayloadClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: {
        equals: "published",
      },
    };

    if (categorySlug) {
      where["categories.slug"] = {
        equals: categorySlug,
      };
    }

    if (featured !== undefined) {
      where.featured = {
        equals: featured,
      };
    }

    const result = await payload.find({
      collection: "products",
      locale,
      where,
      sort: featured ? "displayOrder" : "-createdAt",
      limit,
      page,
    });

    return {
      products: result.docs,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs,
      page: result.page,
    };
  },
);

/**
 * Get a single product by slug
 * Used in product detail page
 */
export const getProductBySlug = cache(
  async (slug: string, locale: LocaleType = "vi") => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "products",
      locale,
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: "published",
        },
      },
      limit: 1,
    });

    return result.docs[0] || null;
  },
);
