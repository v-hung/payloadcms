"use client";

import React, { useEffect, useCallback } from "react";
import {
  useField,
  TextField,
  useFormFields,
  useTranslation,
} from "@payloadcms/ui";
import { generateSlug } from "@/lib/utils/slug";
import { TextFieldClientProps } from "payload";
import {
  PayloadTranslationsKeys,
  PayloadTranslationsObject,
} from "@/i18n/payload-translations";

type SlugFieldProps = TextFieldClientProps & {
  path: string;
  sourceField: string; // "title" or "name"
};

const SlugField: React.FC<SlugFieldProps> = (props) => {
  const { path, sourceField } = props;

  const { setValue, initialValue } = useField<string>({ path });

  const { t } = useTranslation<
    PayloadTranslationsObject,
    PayloadTranslationsKeys
  >();

  const sourceFieldValue = useFormFields(
    ([fields]) => fields[sourceField]?.value as string,
  );

  useEffect(() => {
    if (!initialValue && sourceFieldValue) {
      setValue(generateSlug(sourceFieldValue));
    } else {
      setValue(initialValue || "");
    }
  }, [sourceFieldValue, initialValue, setValue]);

  const handleGenerate = useCallback(() => {
    if (sourceFieldValue) {
      setValue(generateSlug(sourceFieldValue));
    }
  }, [sourceFieldValue, setValue]);

  return (
    <div style={{ position: "relative" }}>
      <TextField {...props} />

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
        {t("general:autoGenerate")}
      </button>
    </div>
  );
};

export default SlugField;
