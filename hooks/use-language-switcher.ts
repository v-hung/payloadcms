"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { switchLocale, type LocaleType } from "@/lib/locale.utils";

export function useLanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Switch to a new locale
   */
  const changeLocale = (newLocale: LocaleType) => {
    const newPath = switchLocale(currentLocale, newLocale, pathname);
    router.push(newPath);
  };

  return {
    currentLocale,
    changeLocale,
  };
}

/**
 * Usage example:
 *
 * function MyComponent() {
 *   const { currentLocale, changeLocale, toggleLocale } = useLanguageSwitcher();
 *
 *   return (
 *     <div>
 *       <p>Current: {currentLocale}</p>
 *       <button onClick={toggleLocale}>Toggle</button>
 *       <button onClick={() => changeLocale('en')}>EN</button>
 *     </div>
 *   );
 * }
 */
