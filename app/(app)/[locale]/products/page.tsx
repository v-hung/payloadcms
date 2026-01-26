import { getTranslations } from "next-intl/server";
import { getProducts, getCategories } from "@/services";
import { ProductsClient } from "@/components/product/products-client";
import type { Metadata } from "next";

type LocaleType = "en" | "vi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });

  return {
    title: t("title"),
    description: t("title"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });

  // Fetch all products and categories
  const [productsData, categories] = await Promise.all([
    getProducts({ locale: locale as LocaleType, limit: 100 }),
    getCategories(locale as LocaleType),
  ]);

  // Separate featured products
  const featuredProducts = productsData.products.filter((p) => p.featured);
  const allProducts = productsData.products;

  const translations = {
    title: t("title"),
    allCategories: t("allCategories"),
    featured: t("featured"),
    bestSeller: t("bestSeller"),
    viewDetails: t("viewDetails"),
    noProducts: t("noProducts"),
    featuredSection: t("featured"),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
      </header>

      <ProductsClient
        products={allProducts}
        featuredProducts={featuredProducts}
        categories={categories}
        translations={translations}
      />
    </div>
  );
}
