import { routing } from "@/i18n/routing";
import messages from "@/i18n/messages/en.json";
import { NamespaceKeys, useTranslations } from "next-intl";

declare global {
  type IntlMessages = typeof messages;
  type Locale = (typeof routing.locales)[number];
}

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: IntlMessages;
  }
}

export type TranslateFn = ReturnType<typeof useTranslations<never>>;

export type ScopedTranslateFn<T extends NamespaceKeys<IntlMessages, never>> =
  ReturnType<typeof useTranslations<T>>;
