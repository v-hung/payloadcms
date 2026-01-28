"use client";

import { Product } from "@/types/payload-types";
import { useRowLabel } from "@payloadcms/ui";

type ProductOption = NonNullable<Product["options"]>[number];

const ProductOptionRowLabel = () => {
  const { data, rowNumber } = useRowLabel<ProductOption["values"][number]>();

  const label = data?.label || `Option Value ${rowNumber ?? 0 + 1}`;

  return (
    <span className="row-label" style={{ pointerEvents: "none" }}>
      {label}
    </span>
  );
};

export default ProductOptionRowLabel;
