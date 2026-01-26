import { LocalizationConfig } from "payload";

const localization = {
  defaultLocale: "vi",
  fallback: true,
  locales: [
    {
      code: "vi",
      label: {
        vi: "Tiếng Việt",
        en: "Vietnamese",
      },
    },
    {
      code: "en",
      label: {
        vi: "Tiếng Anh",
        en: "English",
      },
    },
  ],
} as const satisfies LocalizationConfig;

export default localization;
