import type { Product } from "@/types/payload-types";

type ProductOption = NonNullable<Product["options"]>[number];
type ProductVariant = NonNullable<Product["variants"]>[number];
type SelectedOption = NonNullable<ProductVariant["selectedOptions"]>[number];

export function generateVariantsFromOptions(
  options: ProductOption[],
): ProductVariant[] {
  // 1. Chỉ xử lý các option có tên và có ít nhất 1 giá trị
  const validOptions = options.filter(
    (opt) => opt.name && opt.values && opt.values.length > 0,
  );

  if (validOptions.length === 0) return [];

  const optionsWithValues = validOptions.map((option) => {
    const values = option.values || [];
    return values.map((v) => ({
      option: option.name, // Giữ nguyên - đã là localized object từ form
      value: v.label, // Giữ nguyên - đã là localized object từ form
      id: v.id || crypto.randomUUID(),
    }));
  });

  const combinations: SelectedOption[][] = cartesianProduct(optionsWithValues);

  return combinations.map((combination, index): ProductVariant => {
    const getValueText = (value: string | null | undefined): string => {
      return value || "";
    };

    // Tạo title từ các giá trị được chọn
    const title = combination
      .map((opt) => getValueText(opt.value))
      .filter(Boolean)
      .join(" / ");

    const stableId = crypto.randomUUID();

    const skuParts = combination.map((opt) => {
      const value = getValueText(opt.value);
      return value.substring(0, 3).toUpperCase();
    });

    const sku = `VAR-${skuParts.join("-")}-${String(index + 1).padStart(3, "0")}`;

    return {
      id: stableId, // Cực kỳ quan trọng để setValue hoạt động
      title,
      selectedOptions: combination,
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
