"use client";

import { PERMISSION_COLLECTIONS } from "@/lib/permissions/config";
import { useRowLabel } from "@payloadcms/ui";

export const PermissionsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ collection?: string }>();

  const collectionInfo = PERMISSION_COLLECTIONS.find(
    (c) => c.slug === data?.collection,
  );

  // Hiển thị tên (vi) nếu có, không thì hiển thị slug, cuối cùng là Row number
  const label =
    collectionInfo?.labels?.vi ||
    data?.collection ||
    `Quyền hạn ${(rowNumber ?? 0) + 1}`;

  return (
    <div style={{ textTransform: "capitalize", fontWeight: "bold" }}>
      {label}
    </div>
  );
};
