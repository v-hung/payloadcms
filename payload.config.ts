import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";

import { en } from "@payloadcms/translations/languages/en";
import { vi } from "@payloadcms/translations/languages/vi";

import localization from "./i18n/localization";

import { Posts } from "./collections/post";
import { Categories } from "./collections/categories";
import { Products } from "./collections/products";
import { ContactInquiries } from "./collections/contact-inquiries";
import { Media } from "./collections/media";

import { CompanyInfo } from "./globals/company-info";
import { Manufacturing } from "./globals/manufacturing";

export default buildConfig({
  // Rich Text Editor
  editor: lexicalEditor(),

  // Collections
  collections: [Posts, Categories, Products, ContactInquiries, Media],

  // Globals
  globals: [CompanyInfo, Manufacturing],

  // i18n - Admin UI language
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { vi, en },
  },

  // Localization - Content multilingual support
  localization,

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: process.env.NODE_ENV === "development",
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
