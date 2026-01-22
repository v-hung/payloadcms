import { LocalizationConfig } from "payload";

const localization: LocalizationConfig = {
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
};

export default localization;
