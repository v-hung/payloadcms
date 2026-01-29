"use client";

import type { Product } from "@/types/payload";
import { useRowLabel, useAllFormFields } from "@payloadcms/ui";

type ProductOption = NonNullable<Product["options"]>[number];
type OptionValue = ProductOption["values"][number];

const ProductOptionValueRowLabel = () => {
  const { data, rowNumber, path } = useRowLabel<OptionValue>();
  const [fields] = useAllFormFields();

  // Lấy option name từ parent
  // path có dạng "options.0.values.1" → cần lấy "options.0.name"
  const pathParts = path.split(".");
  const optionIndex = pathParts[1]; // "0"
  const optionNamePath = `options.${optionIndex}.name`;

  // Helper để lấy text từ localized hoặc string
  const getText = (
    val: string | { en?: string; vi?: string } | null | undefined,
  ): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val?.vi || val?.en || "";
  };

  const optionName = getText(
    fields[optionNamePath]?.value as string | null | undefined,
  );
  const valueLabel = getText(data?.label);

  const label =
    optionName && valueLabel
      ? `${optionName} - ${valueLabel}`
      : valueLabel || `Option value ${(rowNumber ?? 0) + 1}`;

  return (
    <span className="row-label" style={{ pointerEvents: "none" }}>
      {label}
    </span>
  );
};

export default ProductOptionValueRowLabel;
