import type { Product } from "@/types/payload";

type ProductOption = NonNullable<Product["options"]>[number];
type ProductVariant = NonNullable<Product["variants"]>[number];
// type SelectedOption = NonNullable<ProductVariant["selectedOptions"]>[number];

export function generateVariantsFromOptions(
  options: ProductOption[],
): ProductVariant[] {
  // 1. Chỉ xử lý các option có tên và có ít nhất 1 giá trị
  const validOptions = options.filter(
    (opt) => opt.name && opt.values && opt.values.length > 0,
  );

  if (validOptions.length === 0) return [];

  // Helper để lấy text từ localized hoặc string
  const getText = (
    val: string | { en?: string; vi?: string } | null | undefined,
  ): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val?.vi || val?.en || "";
  };

  const optionsWithValues = validOptions.map((option) => {
    const values = option.values || [];
    return values.map((v) => ({
      optionId: option.id || crypto.randomUUID(), // ID của option
      optionValueId: v.id || crypto.randomUUID(), // ID của value
      optionName: getText(option.name), // Text để tạo title
      valueLabel: getText(v.label), // Text để tạo title
    }));
  });

  const combinations = cartesianProduct(optionsWithValues);

  return combinations.map((combination, index): ProductVariant => {
    // Tạo title từ valueLabel
    const title = combination
      .map((opt) => opt.valueLabel)
      .filter(Boolean)
      .join(" / ");

    const stableId = crypto.randomUUID();

    const skuParts = combination.map((opt) =>
      opt.valueLabel.substring(0, 3).toUpperCase(),
    );

    const sku = `VAR-${skuParts.join("-")}-${String(index + 1).padStart(3, "0")}`;

    // Chỉ lưu ID vào selectedOptions, không lưu text
    const selectedOptions = combination.map((opt) => ({
      optionId: opt.optionId,
      optionValueId: opt.optionValueId,
    }));

    return {
      id: stableId,
      title,
      selectedOptions: selectedOptions,
      price: 0,
      sku,
      inventory: 0,
      available: true,
    };
  });
}

function cartesianProduct<T>(arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0].map((item) => [item]);

  const result: T[][] = [];
  const rest = cartesianProduct(arrays.slice(1));

  for (const item of arrays[0]) {
    for (const combo of rest) {
      result.push([item, ...combo]);
    }
  }
  return result;
}
