"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLanguageSwitcher } from "@/hooks/use-language-switcher";
import { SearchBar } from "@/components/search/search-bar";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "manufacturing", href: "/manufacturing" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const pathname = usePathname();
  const { currentLocale, changeLocale } = useLanguageSwitcher();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === `/${currentLocale}`;
    }
    return pathname.includes(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Company Logo</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(href) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Search and Language Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-64">
            <SearchBar placeholder={tCommon("searchPlaceholder")} />
          </div>
          <button
            onClick={() => changeLocale(currentLocale === "vi" ? "en" : "vi")}
            className="text-sm font-medium transition-colors hover:text-primary"
            aria-label="Switch language"
          >
            {currentLocale === "vi" ? "EN" : "VI"}
          </button>
        </div>
      </div>
    </header>
  );
}
