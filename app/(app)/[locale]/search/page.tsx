import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { PostCard } from "@/components/content/post-card";
import { searchContent } from "@/services";
import type { Metadata } from "next";
import type { Product, Post } from "@/types/payload";

type SearchParams = Promise<{
  q?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const t = await getTranslations("Pages.Search");

  return {
    title: q ? `${t("resultsFor")} "${q}"` : t("title"),
    description: t("title"),
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;

  const t = await getTranslations();

  let products: Product[] = [];
  let posts: Post[] = [];

  if (q && q.trim()) {
    const results = await searchContent({
      query: q,
      limit: 20,
    });

    products = results.products;
    posts = results.posts;
  }

  const hasResults = products.length > 0 || posts.length > 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{t("Pages.Search.title")}</h1>
      {q && (
        <p className="text-lg text-muted-foreground mb-8">
          {t("Pages.Search.resultsFor")} <strong>&ldquo;{q}&rdquo;</strong>
        </p>
      )}

      {!q || !q.trim() ? (
        <p className="text-muted-foreground">
          {t("Pages.Search.enterSearchQuery")}
        </p>
      ) : !hasResults ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            {t("Pages.Search.noResults")}
          </p>
          <p className="text-muted-foreground mb-6">
            {t("Pages.Search.tryDifferent")}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("Actions.browseProducts")}
            </Link>
            <Link
              href="/news"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              {t("Actions.browseArticles")}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Products Section */}
          {products.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {t("Pages.Search.productsSection")} ({products.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Articles Section */}
          {posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {t("Pages.Search.articlesSection")} ({posts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
