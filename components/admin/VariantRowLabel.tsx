"use client";

import { useRowLabel } from "@payloadcms/ui";

export const VariantRowLabel = () => {
  const { data } = useRowLabel<{ title?: string }>();

  const label = data?.title || "New Variant";

  return (
    <div style={{ textTransform: "capitalize", fontWeight: "bold" }}>
      {label}
    </div>
  );
};
