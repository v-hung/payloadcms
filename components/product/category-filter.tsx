"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category } from "@/payload-types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  translations: {
    allCategories: string;
  };
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  translations,
}: CategoryFilterProps) {
  return (
    <Tabs
      value={selectedCategory}
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <TabsList className="w-full justify-start flex-wrap h-auto">
        <TabsTrigger value="all" className="mb-2">
          {translations.allCategories}
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
