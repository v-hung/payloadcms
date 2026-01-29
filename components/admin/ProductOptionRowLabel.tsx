"use client";

import { Product } from "@/types/payload";
import { useRowLabel } from "@payloadcms/ui";

type ProductOption = NonNullable<Product["options"]>[number];

const ProductOptionRowLabel = () => {
  const { data, rowNumber } = useRowLabel<ProductOption>();

  const label = data?.name || `Option name ${rowNumber ?? 0 + 1}`;

  return (
    <span className="row-label" style={{ pointerEvents: "none" }}>
      {label}
    </span>
  );
};

export default ProductOptionRowLabel;
