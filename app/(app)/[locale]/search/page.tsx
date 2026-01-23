import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { ProductCard } from "@/components/product/product-card";
import { PostCard } from "@/components/content/post-card";
import type { Metadata } from "next";
import type { Product, Post } from "@/payload-types";

type LocaleType = "en" | "vi";

type Params = Promise<{
  locale: string;
}>;

type SearchParams = Promise<{
  q?: string;
}>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: "SearchPage" });

  return {
    title: q ? `${t("resultsFor")} "${q}"` : t("title"),
    description: t("title"),
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "SearchPage" });

  let products: Product[] = [];
  let posts: Post[] = [];

  if (q && q.trim()) {
    const payload = await getPayload({ config });
    const searchQuery = q.trim();

    // Search products
    const productsResult = await payload.find({
      collection: "products",
      locale: locale as LocaleType,
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
      limit: 20,
    });

    products = productsResult.docs;

    // Search posts
    const postsResult = await payload.find({
      collection: "posts",
      locale: locale as LocaleType,
      where: {
        and: [
          {
            status: {
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
      limit: 20,
    });

    posts = postsResult.docs as Post[];
  }

  const hasResults = products.length > 0 || posts.length > 0;

  const productTranslations = {
    viewDetails: t("viewDetails"),
    featured: "Featured",
    bestSeller: "Best Seller",
  };

  const postTranslations = {
    readMore: t("readMore"),
    publishedOn: t("publishedOn"),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
      {q && (
        <p className="text-lg text-muted-foreground mb-8">
          {t("resultsFor")} <strong>&ldquo;{q}&rdquo;</strong>
        </p>
      )}

      {!q || !q.trim() ? (
        <p className="text-muted-foreground">{t("enterSearchQuery")}</p>
      ) : !hasResults ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">{t("noResults")}</p>
          <p className="text-muted-foreground mb-6">{t("tryDifferent")}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("browseProducts")}
            </Link>
            <Link
              href="/news"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              {t("browseArticles")}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Products Section */}
          {products.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {t("productsSection")} ({products.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    translations={productTranslations}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Articles Section */}
          {posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {t("articlesSection")} ({posts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    translations={postTranslations}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
