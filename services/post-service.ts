import { cache } from "react";
import { getPayloadClient } from "@/lib/server/payload";
import { LocaleType } from "@/lib/utils/locale";
import { getLocale } from "next-intl/server";
import { Where } from "payload";

/**
 * Get published posts/articles
 * Used in news listing page
 */
export const getPosts = cache(
  async ({
    featured,
    limit = 10,
    page = 1,
  }: {
    featured?: boolean;
    limit?: number;
    page?: number;
  }) => {
    const locale = await getLocale();
    const payload = await getPayloadClient();

    const where: Where = {
      _status: {
        equals: "published",
      },
    };

    if (featured !== undefined) {
      where.featured = {
        equals: featured,
      };
    }

    const result = await payload.find({
      collection: "posts",
      locale,
      where,
      sort: featured ? "displayOrder" : "-publishedAt",
      limit,
      page,
    });

    return {
      posts: result.docs,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs,
      page: result.page,
    };
  },
);

/**
 * Get a single post by slug
 * Used in news detail page
 */
export const getPostBySlug = cache(
  async (slug: string, locale: LocaleType = "vi") => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "posts",
      locale,
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: "published",
        },
      },
      limit: 1,
    });

    return result.docs[0] || null;
  },
);
