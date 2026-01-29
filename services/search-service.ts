import { getPayload } from "payload";
import config from "@payload-config";
import type { Product, Post } from "@/types/payload";
import { getLocale } from "next-intl/server";
import { LocaleType } from "@/lib/utils/locale";

export interface SearchParams {
  query: string;
  limit?: number;
}

export interface SearchResults {
  products: Product[];
  posts: Post[];
}

/**
 * Search products and posts by query string
 */
export async function searchContent({
  query,
  limit = 20,
}: SearchParams): Promise<SearchResults> {
  const locale = await getLocale();

  const payload = await getPayload({ config });
  const searchQuery = query.trim();

  // Search products
  const productsResult = await payload.find({
    collection: "products",
    where: {
      or: [
        {
          name: {
            contains: searchQuery,
          },
        },
        {
          excerpt: {
            contains: searchQuery,
          },
        },
      ],
    },
    limit,
  });

  // Search posts
  const postsResult = await payload.find({
    collection: "posts",
    locale,
    where: {
      and: [
        {
          _status: {
            equals: "published",
          },
        },
        {
          or: [
            {
              title: {
                contains: searchQuery,
              },
            },
            {
              excerpt: {
                contains: searchQuery,
              },
            },
          ],
        },
      ],
    },
    limit,
  });

  return {
    products: productsResult.docs as Product[],
    posts: postsResult.docs as Post[],
  };
}

/**
 * Search products only
 */
export async function searchProducts({
  query,
  locale,
  limit = 20,
}: {
  query: string;
  locale: LocaleType;
  limit?: number;
}): Promise<Product[]> {
  const payload = await getPayload({ config });
  const searchQuery = query.trim();

  const result = await payload.find({
    collection: "products",
    locale,
    where: {
      or: [
        {
          name: {
            contains: searchQuery,
          },
        },
        {
          excerpt: {
            contains: searchQuery,
          },
        },
      ],
    },
    limit,
  });

  return result.docs as Product[];
}

/**
 * Search posts only
 */
export async function searchPosts({
  query,
  locale,
  limit = 20,
}: {
  query: string;
  locale: LocaleType;
  limit?: number;
}): Promise<Post[]> {
  const payload = await getPayload({ config });
  const searchQuery = query.trim();

  const result = await payload.find({
    collection: "posts",
    locale,
    where: {
      and: [
        {
          _status: {
            equals: "published",
          },
        },
        {
          or: [
            {
              title: {
                contains: searchQuery,
              },
            },
            {
              excerpt: {
                contains: searchQuery,
              },
            },
          ],
        },
      ],
    },
    limit,
  });

  return result.docs as Post[];
}
