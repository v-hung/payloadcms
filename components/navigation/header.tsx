"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLanguageSwitcher } from "@/hooks/use-language-switcher";
import { SearchBar } from "@/components/search/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyInfo } from "@/types/payload";
import { getMediaUrl, isMediaObject } from "@/lib/utils/media";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "manufacturing", href: "/manufacturing" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function Header({ companyInfo }: { companyInfo: CompanyInfo }) {
  const t = useTranslations();
  const pathname = usePathname();
  const { currentLocale, availableLocales, changeLanguage } =
    useLanguageSwitcher();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === `/${currentLocale}`;
    }
    return pathname.includes(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {isMediaObject(companyInfo.logo) && (
            <Image
              src={getMediaUrl(companyInfo.logo)}
              alt={companyInfo.companyName || "Logo"}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          )}
          <span className="text-lg font-semibold">
            {companyInfo.companyName || "Company"}
          </span>
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
              {t(`Navigation.${key}`)}
            </Link>
          ))}
        </nav>

        {/* Search and Language Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-64">
            <SearchBar placeholder={t("Common.searchPlaceholder")} />
          </div>
          <Select value={currentLocale.code} onValueChange={changeLanguage}>
            <SelectTrigger className="w-auto border-none bg-transparent text-sm font-medium transition-colors hover:text-primary">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <Image
                    src={`/icon/countries/${currentLocale.code}.svg`}
                    alt={currentLocale.label}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  {currentLocale.label}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableLocales.map((locale) => (
                <SelectItem key={locale.code} value={locale.code}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/icon/countries/${locale.code}.svg`}
                      alt={locale.label}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    {locale.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
