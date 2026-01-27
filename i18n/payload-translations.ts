import { enTranslations } from "@payloadcms/translations/languages/en";
import type { NestedKeysStripped } from "@payloadcms/translations";

export const payloadTranslations = {
  en: {
    general: {
      autoGenerate: "Auto-Generate",
    },
    fields: {
      addLabel: "Add!",
    },
  },
  vi: {
    general: {
      autoGenerate: "Tự động tạo",
    },
    fields: {
      addLabel: "Thêm!",
    },
  },
};

export type PayloadTranslationsObject = typeof payloadTranslations.en &
  typeof enTranslations;
export type PayloadTranslationsKeys =
  NestedKeysStripped<PayloadTranslationsObject>;
