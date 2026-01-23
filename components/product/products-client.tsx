"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/product/category-filter";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product, Category } from "@/payload-types";

interface ProductsClientProps {
  products: Product[];
  featuredProducts: Product[];
  categories: Category[];
  translations: {
    title: string;
    allCategories: string;
    featured: string;
    bestSeller: string;
    viewDetails: string;
    noProducts: string;
    featuredSection: string;
  };
}

export function ProductsClient({
  products,
  featuredProducts,
  categories,
  translations,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Initialize state from URL parameter
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all",
  );

  // Update URL when category changes (but not on mount)
  useEffect(() => {
    const currentCategory = categoryParam || "all";
    if (selectedCategory !== currentCategory) {
      if (selectedCategory === "all") {
        router.push("/products", { scroll: false });
      } else {
        router.push(`/products?category=${selectedCategory}`, {
          scroll: false,
        });
      }
    }
  }, [selectedCategory, categoryParam, router]);

  return (
    <div className="space-y-8">
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {translations.featuredSection}
          </h2>
          <ProductGrid
            products={featuredProducts}
            translations={translations}
            selectedCategory={null}
          />
        </section>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          translations={translations}
        />
      </div>

      {/* All Products Grid */}
      <ProductGrid
        products={products}
        translations={translations}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
