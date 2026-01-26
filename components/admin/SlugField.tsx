"use client";

import React, { useEffect, useCallback } from "react";
import { useField, TextField, useFormFields } from "@payloadcms/ui";
import { generateSlug } from "@/lib/slug-utils";
import { TextFieldClientProps } from "payload";

type SlugFieldProps = TextFieldClientProps & {
  path: string;
  sourceField: string; // "title" or "name"
};

const SlugField: React.FC<SlugFieldProps> = (props) => {
  const { path, sourceField } = props;

  // Lấy dữ liệu của chính field này
  const { setValue, initialValue } = useField<string>({ path });

  // Lấy giá trị của source field (ví dụ: "title") từ form state
  const sourceFieldValue = useFormFields(
    ([fields]) => fields[sourceField]?.value as string,
  );

  // Hàm generate slug
  const handleGenerate = useCallback(() => {
    if (sourceFieldValue) {
      setValue(generateSlug(sourceFieldValue));
    }
  }, [sourceFieldValue, setValue]);

  // Tự động generate khi tạo mới (giống logic cũ của bạn)
  useEffect(() => {
    if (!initialValue && sourceFieldValue) {
      setValue(generateSlug(sourceFieldValue));
    } else {
      setValue(initialValue || "");
    }
  }, [sourceFieldValue, initialValue, setValue]);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        {...props} // Kế thừa toàn bộ logic Label, Error, Description, Style của Payload
      />

      {/* Nút bấm được đặt tuyệt đối so với wrapper để không làm hỏng layout của TextField */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={!sourceFieldValue}
        style={{
          position: "absolute",
          right: "2px",
          height: "36px",
          top: "27px",
          padding: "4px 8px",
          fontSize: "10px",
          textTransform: "uppercase",
          fontWeight: "bold",
          cursor: sourceFieldValue ? "pointer" : "not-allowed",
          background: "var(--theme-elevation-150)",
          color: "var(--theme-elevation-800)",
          border: "1px solid var(--theme-elevation-250)",
          borderRadius: "4px",
          zIndex: 1,
        }}
      >
        Auto-Generate
      </button>
    </div>
  );
};

export default SlugField;
