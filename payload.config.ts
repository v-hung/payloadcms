import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { en } from "@payloadcms/translations/languages/en";
import { vi } from "@payloadcms/translations/languages/vi";

import localization from "./i18n/localization";

import { Posts } from "./collections/post";
import { Pages } from "./collections/pages";
import { Showcases } from "./collections/showcases";
import { Categories } from "./collections/categories";
import { Products } from "./collections/products";
import { Carts } from "./collections/carts";
import { CartItems } from "./collections/cart-items";
import { Orders } from "./collections/orders";
import { OrderItems } from "./collections/order-items";
import { Wishlists } from "./collections/wishlists";
import { ContactInquiries } from "./collections/contact-inquiries";
import { Media } from "./collections/media";
import { Admin } from "./collections/admin";
import { Roles } from "./collections/roles";
import { Users } from "./collections/users";

import { CompanyInfo } from "./globals/company-info";
import { lexicalEditorConfig } from "./lib/lexical-editor-utils";
import { payloadTranslations } from "./i18n/payload-translations";

export default buildConfig({
  // Rich Text Editor
  editor: lexicalEditorConfig,

  // Collections
  collections: [
    Roles,
    Admin,
    Users,
    Posts,
    Pages,
    Showcases,
    Categories,
    Products,
    Carts,
    CartItems,
    Orders,
    OrderItems,
    Wishlists,
    ContactInquiries,
    Media,
  ],

  // Globals
  globals: [CompanyInfo],

  // i18n - Admin UI language
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { vi, en },
    translations: payloadTranslations,
  },

  // Localization - Content multilingual support
  localization: localization,

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
    migrationDir: path.resolve(__dirname, "database/migrations"),
    generateSchemaOutputFile: path.resolve(__dirname, "database/schema.ts"),
  }),

  // Development Tooling & Auto-generation
  typescript: {
    outputFile: path.resolve(__dirname, "types/payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated/schema.graphql"),
  },

  // Seed script to populate initial data
  onInit: async (payload) => {
    if (process.env.NODE_ENV === "development") {
      await import("./scripts/seed").then(({ seed }) => seed(payload));
    }
  },

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
