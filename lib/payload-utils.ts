import { getPayload } from "payload";
import config from "@payload-config";

type LocaleType = "en" | "vi";

/**
 * Get configured Payload instance
 * Use this for all database queries
 */
export async function getPayloadClient() {
  return await getPayload({ config });
}

/**
 * Get company information global singleton
 * Used in header, footer, and about page
 */
export async function getCompanyInfo(locale: LocaleType = "vi") {
  const payload = await getPayloadClient();

  const result = await payload.findGlobal({
    slug: "company-info",
    locale,
  });

  return result;
}

/**
 * Get manufacturing capability global singleton
 * Used in manufacturing page
 */
export async function getManufacturingInfo(locale: LocaleType = "vi") {
  const payload = await getPayloadClient();

  const result = await payload.findGlobal({
    slug: "manufacturing",
    locale,
  });

  return result;
}

/**
 * Get all product categories
 * Used in products page for filtering
 */
export async function getCategories(locale: LocaleType = "vi") {
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
}

/**
 * Get products with optional category filter
 * Used in products listing pages
 */
export async function getProducts({
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
}) {
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
}

/**
 * Get a single product by slug
 * Used in product detail page
 */
export async function getProductBySlug(
  slug: string,
  locale: LocaleType = "vi",
) {
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
}

/**
 * Get published posts/articles
 * Used in news listing page
 */
export async function getPosts({
  locale = "vi",
  featured,
  limit = 10,
  page = 1,
}: {
  locale?: LocaleType;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const payload = await getPayloadClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    status: {
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
}

/**
 * Get a single post by slug
 * Used in news detail page
 */
export async function getPostBySlug(slug: string, locale: LocaleType = "vi") {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
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
}

/**
 * Submit contact inquiry form
 * Used in contact page
 */
export async function createContactInquiry(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const payload = await getPayloadClient();

  const result = await payload.create({
    collection: "contact-inquiries",
    data: {
      ...data,
      status: "new",
      submittedAt: new Date().toISOString(),
    },
  });

  return result;
}
