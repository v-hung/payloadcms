"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { getLocales, switchLocale, type LocaleType } from "@/lib/utils/locale";

export function useLanguageSwitcher() {
  const activeLocale = useLocale() as LocaleType;
  const pathname = usePathname();
  const router = useRouter();

  // All supported locales (excluding current if bạn muốn)
  const availableLocales = useMemo(
    () => getLocales(activeLocale),
    [activeLocale],
  );

  // Ensure current locale is always valid
  const currentLocale = useMemo(() => {
    return (
      availableLocales.find((locale) => locale.code === activeLocale) ??
      availableLocales[0]
    );
  }, [availableLocales, activeLocale]);

  /**
   * Change language and navigate to new locale path
   */
  const changeLanguage = (nextLocale: LocaleType) => {
    if (nextLocale === currentLocale.code) return;

    const nextPath = switchLocale(currentLocale.code, nextLocale, pathname);

    router.push(nextPath);
  };

  return {
    currentLocale,
    availableLocales,
    changeLanguage,
  };
}
