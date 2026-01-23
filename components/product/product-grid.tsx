"use client";

import { ProductCard } from "./product-card";
import type { Product } from "@/payload-types";

interface ProductGridProps {
  products: Product[];
  translations: {
    viewDetails: string;
    featured: string;
    bestSeller: string;
    noProducts: string;
  };
  selectedCategory?: string | null;
}

export function ProductGrid({
  products,
  translations,
  selectedCategory,
}: ProductGridProps) {
  // Filter products by selected category
  const filteredProducts =
    selectedCategory && selectedCategory !== "all"
      ? products.filter((product) => {
          if (!product.categories || !Array.isArray(product.categories)) {
            return false;
          }
          return product.categories.some((cat) => {
            if (typeof cat === "object" && cat !== null && "slug" in cat) {
              return cat.slug === selectedCategory;
            }
            return false;
          });
        })
      : products;

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {translations.noProducts}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          translations={translations}
        />
      ))}
    </div>
  );
}
