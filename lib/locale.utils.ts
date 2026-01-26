/**
 * Locale utility functions for language switching with next-intl
 */

import { routing } from "@/i18n/routing";
import localization from "@/i18n/localization";

/**
 * Available locale type based on routing configuration
 */
export type LocaleType = (typeof localization.locales)[number]["code"];

/**
 * Locale object with code and label
 */
export type LocaleObject = {
  code: LocaleType;
  label: string;
};

/**
 * Get all available locales with labels in the specified display language
 */
export function getLocales(displayLocale: LocaleType): LocaleObject[] {
  return localization.locales.map((locale) => ({
    code: locale.code,
    label: locale.label[displayLocale] || locale.label[locale.code],
  }));
}

/**
 * Get locale configuration by locale code with label in the specified display language
 */
export function getLocaleConfig(
  locale: LocaleType,
  displayLocale: LocaleType,
): LocaleObject | undefined {
  return getLocales(displayLocale).find((l) => l.code === locale);
}

/**
 * Switch to a different locale
 * Returns the new URL with the updated locale
 *
 * @param currentLocale - Current locale code
 * @param newLocale - Target locale code
 * @param pathname - Current pathname
 * @returns New pathname with updated locale
 */
export function switchLocale(
  currentLocale: LocaleType,
  newLocale: LocaleType,
  pathname: string,
): string {
  // If switching to the same locale, return the current path
  if (currentLocale === newLocale) {
    return pathname;
  }

  const segments = pathname.split("/").filter(Boolean);

  // Check if the first segment is a locale
  const hasLocalePrefix = routing.locales.includes(segments[0] as LocaleType);

  // Remove the current locale prefix if it exists
  if (hasLocalePrefix) {
    segments.shift();
  }

  // Add new locale prefix if it's not the default locale
  // (matching "as-needed" behavior)
  const needsPrefix = newLocale !== routing.defaultLocale;

  const newPath = needsPrefix
    ? `/${newLocale}/${segments.join("/")}`
    : `/${segments.join("/")}`;

  // Clean up double slashes
  return newPath.replace(/\/+/g, "/");
}
