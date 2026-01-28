"use client";

import React, { useEffect, useRef } from "react";
import { useField, ArrayField, useAllFormFields } from "@payloadcms/ui";
import type { ArrayFieldClientComponent } from "payload";
import type { Product } from "@/types/payload-types";
import { generateVariantsFromOptions } from "@/lib/product-variant-utils";

type ProductOption = NonNullable<Product["options"]>[number];
type ProductVariant = NonNullable<Product["variants"]>[number];

const ProductVariantsFieldAutoGenerate: ArrayFieldClientComponent = (props) => {
  const { path } = props;
  const { setValue } = useField<ProductVariant[]>({ path });
  const [fields, dispatchFields] = useAllFormFields();

  // Ref để tránh loop vô hạn
  const lastOptionsSignatureRef = useRef<string>("");
  // Ref để quản lý timer của debounce
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Hàm helper gom dữ liệu sạch từ state phẳng của Payload
    const getCleanOptionsData = (): ProductOption[] => {
      const optionsCount = (fields["options"]?.value as number) || 0;
      const cleanData: ProductOption[] = [];

      for (let i = 0; i < optionsCount; i++) {
        const name = fields[`options.${i}.name`]?.value as string;
        const valuesCount =
          (fields[`options.${i}.values`]?.value as number) || 0;
        const values: ProductOption["values"] = [];

        for (let j = 0; j < valuesCount; j++) {
          values.push({
            id: fields[`options.${i}.values.${j}.id`]?.value as string,
            label: fields[`options.${i}.values.${j}.label`]?.value as string,
          });
        }
        cleanData.push({
          name,
          values,
        });
      }
      return cleanData;
    };

    // 2. Kiểm tra thay đổi ngay lập tức (không đợi timer) để tránh xử lý thừa
    const currentOptions = getCleanOptionsData();
    const currentOptionsString = JSON.stringify(currentOptions);

    if (currentOptionsString === lastOptionsSignatureRef.current) {
      return;
    }

    // 3. Thiết lập Debounce
    // Xóa timer cũ nếu người dùng vẫn đang gõ
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      lastOptionsSignatureRef.current = currentOptionsString;

      const hasValidData =
        currentOptions.length > 0 &&
        currentOptions.some((opt) => opt.name && opt.values?.length > 0);

      if (hasValidData) {
        const newVariants = generateVariantsFromOptions(currentOptions);

        newVariants.forEach((variant, index) => {
          dispatchFields({
            type: "UPDATE",
            path: `variants.${index}.title`,
            value: variant.title,
          });
        });

        setValue(newVariants);
      } else if (currentOptions.length === 0) {
        setValue([]);
      }
    }, 600); // Đợi 0.6 giây sau khi người dùng ngừng thao tác

    // Cleanup khi component unmount hoặc fields thay đổi
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dispatchFields, fields, setValue]);

  return (
    <>
      <style>{`
        .field-type.array-field[id*="field-variants"] .array-actions .array-actions__button--add,
        .field-type.array-field[id*="field-variants"] .array-field__add-row {
          display: none !important;
        }
      `}</style>
      <ArrayField {...props} />
    </>
  );
};

export default ProductVariantsFieldAutoGenerate;
