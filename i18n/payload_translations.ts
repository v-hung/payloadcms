import { enTranslations } from "@payloadcms/translations/languages/en";
import type { NestedKeysStripped } from "@payloadcms/translations";

// Import translations from JSON files
import enCustom from "./locales/en.json";
import viCustom from "./locales/vi.json";

/**
 * Custom translations for Payload CMS
 * Translations are stored in JSON files for easier management
 * Add new language by creating a new JSON file in ./locales/ and importing here
 */
export const payloadTranslations = {
  en: enCustom,
  vi: viCustom,
};

// Type definitions for type-safe translations
export type PayloadTranslationsObject = typeof payloadTranslations.en &
  typeof enTranslations;

export type PayloadTranslationsKeys =
  NestedKeysStripped<PayloadTranslationsObject>;
