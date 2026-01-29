"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category } from "@/types/payload";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const t = useTranslations();

  return (
    <Tabs
      value={selectedCategory}
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <TabsList className="w-full justify-start flex-wrap h-auto">
        <TabsTrigger value="all" className="mb-2">
          {t("Pages.Products.allCategories")}
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.slug || ""}
            className="mb-2"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
