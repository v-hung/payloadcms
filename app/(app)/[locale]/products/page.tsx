import { getTranslations } from "next-intl/server";
import { getProducts, getCategories } from "@/services";
import { ProductsClient } from "@/components/product/products-client";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Pages.Products.title"),
    description: t("Pages.Products.title"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("Pages.Products");

  // Fetch all products and categories
  const [productsData, categories] = await Promise.all([
    getProducts({ limit: 100 }),
    getCategories(),
  ]);

  // Separate featured products
  const featuredProducts = productsData.products.filter((p) => p.featured);
  const allProducts = productsData.products;

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
      />
    </div>
  );
}
