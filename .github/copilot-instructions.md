# Copilot Instructions for Company Website Project

## Project Overview

This is a corporate website for promoting products, showcasing manufacturing capabilities, and introducing export markets. It serves as an official communication channel and marketing tool.

**Stack:**

- **Framework:** Next.js 16.1.4 (App Router with React 19.2.3)
- **CMS:** Payload CMS 3.72.0 with SQLite database
- **Internationalization:** next-intl 4.7.0 (English & Vietnamese)
- **Styling:** Tailwind CSS 4.x with shadcn/ui components
- **Rich Text:** Lexical editor
- **Package Manager:** pnpm 10.28.1
- **Node Version:** v22.17.1
- **TypeScript:** Strict mode enabled

## Directory Structure & Architecture

### Key Directories:

```
app/
  (app)/[locale]/       # Public-facing pages (i18n-enabled)
  (payload)/            # Auto-generated Payload admin UI (DO NOT EDIT manually)
    admin/importMap.js  # Auto-generated
    layout.tsx          # Auto-generated
collections/            # Payload CMS collection configs
  post.ts               # Posts collection with multilingual support
components/
  ui/                   # shadcn/ui components
i18n/                   # Internationalization configs
  routing.ts            # next-intl routing configuration
  localization.ts       # Payload localization config (vi, en)
  messages/
    en.json             # English translations
    vi.json             # Vietnamese translations
lib/                    # Utility functions
  utils.ts              # Tailwind merge utilities
data/                   # SQLite database storage location
public/                 # Static assets
```

### Configuration Files:

- `payload.config.ts` - Payload CMS configuration (collections, DB, i18n, localization)
- `next.config.ts` - Next.js config with Payload and next-intl plugins
- `tsconfig.json` - TypeScript config (paths: @/\*, @payload-config)
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `components.json` - shadcn/ui configuration (New York style)
- `pnpm-workspace.yaml` - pnpm workspace config (ignores sharp, unrs-resolver)

## Build & Development Commands

### Environment Setup

**REQUIRED:** Before any operation, ensure `.env` file exists with:

```env
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URL=file:./data/sqlite.db
DATABASE_AUTH_TOKEN=
```

Reference `.env.example` if missing.

### Command Execution Order

**1. Install Dependencies (ALWAYS run first):**

```bash
pnpm install
```

**2. Generate Payload Schemas (REQUIRED after collection changes):**

```bash
npx payload generate:db-schema
npx payload generate:types
```

- **generate:db-schema** - Creates `payload-generated-schema.ts` (SQLite schema)
- **generate:types** - Creates `payload-types.ts` (TypeScript types)
- **IMPORTANT:** Run BOTH commands when modifying `collections/*.ts` files
- Warning: "No email adapter provided" is normal (email writes to console)

**3. Development Server:**

```bash
pnpm dev
```

- Starts on http://localhost:3000 (public site)
- Admin UI: http://localhost:3000/admin
- Hot reload enabled for both frontend and Payload admin

**4. Production Build:**

```bash
pnpm build
```

- Builds Next.js app and Payload admin UI
- Output: `.next/` directory

**5. Start Production Server:**

```bash
pnpm start
```

- Must run `pnpm build` first

**6. Linting:**

```bash
pnpm lint
```

- Uses flat ESLint config with Next.js rules
- Fix auto-fixable issues: `pnpm lint --fix`
- Known warning: unused eslint-disable in payload-generated-schema.ts (safe to ignore)

**7. Add shadcn/ui Components:**

```bash
pnpm dlx shadcn@latest add <component-name>
```

- Components installed to `components/ui/`
- Uses New York style variant

## Critical Rules & Best Practices

### Payload CMS Rules

1. **DO NOT EDIT** files in `app/(payload)/` - they are auto-generated
2. **ALWAYS** run `npx payload generate:db-schema` and `generate:types` after:
   - Creating new collections in `collections/`
   - Modifying collection field schemas
   - Changing collection slugs or labels
3. **Localized fields:** Set `localized: true` for multilingual content fields
4. **Collection labels:** Provide both `en` and `vi` labels for admin UI

### Internationalization Rules

1. **Supported locales:** `vi` (default), `en`
2. **Translation files:** All user-facing text goes in `i18n/messages/{locale}.json`
3. **Usage in components:**
   ```tsx
   import { useTranslations } from "next-intl";
   const t = useTranslations("HomePage");
   return <div>{t("title")}</div>;
   ```
4. **Locale routing:** Auto-handled by next-intl (localePrefix: "as-needed")
5. **Payload localization:** Separate from next-intl, configured in `localization.ts`

### Next.js App Router Rules

1. **Server Components by default** - Add `'use client'` only when needed
2. **Async params:** In Next.js 16+, params are promises:
   ```tsx
   const { locale } = await params;
   ```
3. **Route structure:** `app/(app)/[locale]/` for i18n-enabled pages

### TypeScript & Path Aliases

- Use `@/*` for imports from root: `import { cn } from "@/lib/utils"`
- Use `@payload-config` for Payload config: `import config from '@payload-config'`
- Strict mode enabled - no implicit any allowed

### Styling with Tailwind CSS

- Uses Tailwind CSS 4.x with `@tailwindcss/postcss`
- shadcn/ui components use `class-variance-authority` and `tailwind-merge`
- Global styles: `app/(app)/globals.css`
- Payload admin styles: `app/(payload)/custom.scss`

## Testing & Validation

### Pre-Commit Checklist:

1. Run `pnpm lint` - should pass with only the known warning
2. If collections changed:
   - Run `npx payload generate:db-schema`
   - Run `npx payload generate:types`
   - Verify `payload-types.ts` and `payload-generated-schema.ts` updated
3. Test dev server starts: `pnpm dev`
4. Verify no TypeScript errors in editor

### Common Issues & Workarounds:

- **"Database not found"** → Ensure DATABASE_URL in .env points to correct path
- **"PAYLOAD_SECRET not set"** → Check .env file exists and has PAYLOAD_SECRET
- **Type errors after collection changes** → Run both generate commands
- **Import errors for @payload-config** → Check tsconfig.json paths configuration

## File Generation Guidelines

### When Creating New Collection:

1. Create file in `collections/` folder
2. Export CollectionConfig with:
   - Unique `slug`
   - Admin `labels` (both en/vi)
   - Fields with `localized: true` for multilingual content
3. Import in `payload.config.ts`
4. **MUST RUN:** `npx payload generate:db-schema` then `generate:types`

### When Creating New UI Components:

1. Place in `components/` (shared) or `app/(app)/[locale]/` (page-specific)
2. Use shadcn/ui components from `@/components/ui`
3. Use TypeScript with proper types
4. For translations: Add keys to `i18n/messages/*.json` files

### When Creating New Pages:

1. Place in `app/(app)/[locale]/` for i18n pages
2. Follow Next.js App Router conventions (page.tsx, layout.tsx)
3. Use `useTranslations` for all user-facing text
4. Server Components by default

## Trust These Instructions

These instructions are comprehensive and tested. **Trust them first** before searching. Only use grep/search tools if:

- The instructions are incomplete for your specific task
- You encounter an error not documented here
- You need to understand existing code implementation details

**Remember:** This project uses modern Next.js 16 App Router patterns. Async params, Server Components, and the Payload CMS integration are key architectural patterns to maintain.
