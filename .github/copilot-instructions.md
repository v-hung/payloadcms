# Copilot Instructions: Corporate Website Project

## Repository Overview

**Project Type**: Bilingual corporate website with CMS (Vietnamese/English)  
**Purpose**: Product catalog, manufacturing showcase, news/articles, and contact inquiries  
**Tech Stack**: Next.js 16.1.4 (App Router), React 19.2.3, TypeScript 5.x, Payload CMS 3.72.0, next-intl 4.7.0, Tailwind CSS 4.x, shadcn/ui  
**Database**: SQLite (via @payloadcms/db-sqlite)  
**Node Version**: v22.17.1  
**Package Manager**: pnpm 10.28.1 (NEVER use npm or yarn)

**Scale**: ~20-50 products, 5-10 categories, dozens of articles, 100 concurrent visitors, 2-5 admin users

**Key Files**:

- Root: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `payload.config.ts`, `components.json`
- Documentation: `README.md`, `DEV.md`, `.specify/memory/constitution.md`, `specs/001-corporate-website/`
- Collections: `collections/*.ts` (products, categories, posts, media, contact-inquiries, users, roles, admin)
- Globals: `globals/*.ts` (company-info, manufacturing)
- Components: `components/ui/*.tsx` (shadcn/ui), `components/navigation/*.tsx`, `components/product/*.tsx`
- Routes: `app/(app)/[locale]/` (public pages), `app/(payload)/` (CMS admin - DO NOT EDIT)
- i18n: `i18n/messages/en.json`, `i18n/messages/vi.json`, `i18n/routing.ts`, `i18n/localization.ts`

---

## Critical Build & Development Workflow

### Environment Setup (First Time)

**REQUIRED STEPS (in order)**:

1. **Verify Node.js version**: `node --version` → Must output `v22.17.1` (other versions may cause build failures)
2. **Verify pnpm version**: `pnpm --version` → Must output `10.28.1`
3. **Create `.env` file**: Copy `.env.example` to `.env` and set:
   - `PAYLOAD_SECRET=your-secret-key-here` (use a strong random string in production)
   - `DATABASE_URL=file:./database/sqlite.db` (SQLite file path)
   - `DATABASE_AUTH_TOKEN=` (leave empty for local SQLite)
4. **Install dependencies**: `pnpm install` (takes ~30-60 seconds)
5. **Generate database schema**: `npx payload generate:db-schema` (creates `database/schema.ts`)
6. **Generate TypeScript types**: `npx payload generate:types` (creates `types/payload-types.ts`)
7. **Seed database**: `npm run seed` (creates initial roles, admin user, sample data)
8. **Start dev server**: `pnpm dev` (opens at http://localhost:3000)

**Admin Login**: http://localhost:3000/admin (Credentials: `admin@admin.com` / `Admin@123`)

### Standard Development Commands

**ALWAYS run `pnpm install` first** (after `git pull` or any `package.json` change):

```bash
pnpm install
```

**Development server** (with hot reload):

```bash
pnpm dev
# Opens at: http://localhost:3000 (public site)
# Admin at: http://localhost:3000/admin
```

**Linting** (MUST pass before committing - warnings in `payload-generated-schema.ts` are expected):

```bash
pnpm lint
# Auto-fix most issues: pnpm lint --fix
```

**Production build** (validates TypeScript and Next.js):

```bash
pnpm build  # Takes ~1-2 minutes
pnpm start  # Run production build locally
```

**Payload CLI commands** (database migrations, schema generation):

```bash
pnpm payload migrate:create <migration-name>  # Create new migration
pnpm payload migrate                          # Run pending migrations
pnpm payload migrate:status                   # Check migration status
```

---

## Payload CMS Schema Workflow (CRITICAL)

**WHEN TO USE**: After ANY change to `collections/*.ts` or `globals/*.ts` files.

**MANDATORY EXECUTION ORDER**:

```bash
# 1. Generate database schema (creates/updates database/schema.ts)
npx payload generate:db-schema

# 2. Generate TypeScript types (creates/updates types/payload-types.ts)
npx payload generate:types

# 3. If admin UI components changed (rare)
npx payload generate:importmap
```

**After running these commands**:

- Verify `types/payload-types.ts` has updated types for your collection
- Restart dev server: Stop `pnpm dev` and run it again
- Do NOT manually edit `database/schema.ts`, `types/payload-types.ts`, or `app/(payload)/` files

**COMMON ERROR**: If you see TypeScript errors like "Property does not exist on type 'Product'", you likely forgot to run `generate:types` after modifying a collection schema.

**FORBIDDEN**: Never manually edit files in `app/(payload)/admin/` or `app/(payload)/layout.tsx` - these are auto-generated and will be overwritten.

---

## Database Reset (Troubleshooting)

**WHEN TO USE**: Database corrupted, schema mismatch errors, or testing seed data.

```powershell
# Delete database file
Remove-Item data/sqlite.db -ErrorAction SilentlyContinue

# Regenerate everything
npx payload generate:db-schema
npm run seed
pnpm dev
```

---

## Project Architecture & File Structure

### Collections (Payload CMS Data Models)

**Location**: `collections/*.ts`  
**Purpose**: Define database schemas, admin UI, validation, and access control

**Existing Collections**:

- `admin.ts` - Admin users (Payload CMS authentication)
- `categories.ts` - Product categories (hierarchical, bilingual)
- `contact-inquiries.ts` - Contact form submissions
- `media.ts` - Images and files (with Sharp image processing)
- `post.ts` - News/blog articles (bilingual, rich text)
- `products.ts` - Product catalog (bilingual, with categories, images, SEO fields)
- `roles.ts` - RBAC roles (super-admin, admin, editor, viewer)
- `users.ts` - Customer users (separate from admin authentication)

**Key Patterns**:

- All collections use `localized: true` for bilingual fields (name, description, etc.)
- Collections define both `en` and `vi` labels: `labels: { singular: { en: "Product", vi: "Sản phẩm" } }`
- Access control uses `lib/permissions-utils.ts` functions
- Slug fields auto-generate from name: `import { createSlugField } from "@/lib/slug-utils"`

### Globals (Payload CMS Singletons)

**Location**: `globals/*.ts`  
**Purpose**: Single-record data (company info, site-wide settings)

**Existing Globals**:

- `company-info.ts` - Company overview, vision, mission, core values (bilingual)
- `manufacturing.ts` - Manufacturing capability content (bilingual)

### Routes (Next.js App Router)

**Public Pages**: `app/(app)/[locale]/` (bilingual, uses next-intl)

- `/` - Home page (featured products, company overview)
- `/about` - About page (company info, vision, mission)
- `/products` - Product listing with category filters
- `/products/[slug]` - Product detail page
- `/manufacturing` - Manufacturing capability showcase
- `/news` - Articles/news listing
- `/news/[slug]` - Article detail page
- `/contact` - Contact page with form
- `/search` - Site-wide search

**Admin Pages**: `app/(payload)/` (auto-generated - DO NOT EDIT)

- `/admin` - Payload CMS admin UI

**API Routes**:

- `app/(app)/api/contact/route.ts` - Contact form submission handler
- `app/(payload)/api/[...slug]/route.ts` - Payload REST API (auto-generated)
- `app/(payload)/api/graphql/route.ts` - Payload GraphQL API (auto-generated)

### Components

**shadcn/ui Components**: `components/ui/*.tsx`

- Installed via: `pnpm dlx shadcn@latest add <component-name>`
- Examples: `button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, `textarea.tsx`
- Use `cn()` utility for conditional classes: `import { cn } from "@/lib/utils"`

**Navigation Components**: `components/navigation/`

- `header.tsx` - Site header with nav menu, language switcher
- `footer.tsx` - Site footer with links, company info

**Product Components**: `components/product/`

- `product-card.tsx` - Product thumbnail for listings
- `product-grid.tsx` - Responsive grid layout
- `category-filter.tsx` - Category filter UI

**Form Components**: `components/forms/`

- `contact-form.tsx` - Contact inquiry form

### Internationalization (i18n)

**Translation Files**: `i18n/messages/en.json`, `i18n/messages/vi.json`

- **REQUIRED**: All user-facing text MUST be in these files (no hardcoded strings)
- Format: `{ "home": { "welcome": "Welcome to our website" } }`
- Access in components: `const t = useTranslations('home'); <h1>{t('welcome')}</h1>`

**Configuration**: `i18n/routing.ts`, `i18n/localization.ts`

- Supported locales: `vi` (default), `en`
- URL structure: `/` (Vietnamese), `/en` (English)
- Locale detection: Disabled (explicit locale in URL)

**Usage Pattern**:

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("namespace"); // e.g., 'home', 'products', 'contact'
  return <h1>{t("title")}</h1>;
}
```

---

## TypeScript & Code Quality Standards

### TypeScript Configuration

**Mode**: Strict mode enabled (non-negotiable)  
**Path Aliases**:

- `@/*` - Root directory (e.g., `@/components/ui/button`)
- `@payload-config` - Payload config file import

**REQUIRED**: All functions, components, and API boundaries MUST have explicit type annotations.

**FORBIDDEN**: `any` type (unless explicitly justified with a comment)

**Next.js 16 Async Params Pattern** (breaking change from Next.js 15):

```tsx
// ✅ CORRECT (Next.js 16)
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Await params
  // ...
}

// ❌ WRONG (Next.js 15 pattern - will cause errors)
export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params; // Params not awaited
  // ...
}
```

### Linting

**Config**: `eslint.config.mjs` (flat config with Next.js rules)  
**Ignored Paths**: `.next/`, `out/`, `build/`, `next-env.d.ts`, `node_modules/`

**Expected Warnings** (safe to ignore):

- `database/migrations/*.ts` - Unused `payload` and `req` parameters (auto-generated migrations)
- `payload-generated-schema.ts` - Unused eslint-disable directive (auto-generated schema)

**MUST FIX**: All other warnings/errors before committing.

### Component Architecture

**Default**: Server Components (for performance, SEO)  
**Client Components**: Only when needed - mark with `'use client'` directive

**When to Use Client Components**:

- Event handlers (`onClick`, `onChange`, etc.)
- React hooks (`useState`, `useEffect`, `useRef`)
- Browser APIs (window, document, localStorage)
- Third-party components requiring client-side JS

**Styling**:

- Use Tailwind CSS classes (NOT inline styles or CSS modules)
- Use `cn()` utility for conditional classes
- Follow shadcn/ui New York variant conventions

---

## Common Issues & Workarounds

### Issue: TypeScript errors after modifying collection schema

**Symptom**: `Property 'X' does not exist on type 'Product'`  
**Fix**: Run `npx payload generate:types` to regenerate TypeScript types, then restart dev server.

### Issue: Database schema mismatch errors

**Symptom**: `Table 'X' does not exist` or `Column 'Y' does not exist`  
**Fix**: Run `npx payload generate:db-schema` to sync database schema with collection definitions.

### Issue: Dev server fails to start with "Cannot find module '@payloadcms/...'"

**Symptom**: Module not found errors  
**Fix**: Run `pnpm install` to reinstall dependencies. Verify `node_modules/` exists.

### Issue: "PAYLOAD_SECRET is not set" error

**Symptom**: Server fails to start  
**Fix**: Create `.env` file with `PAYLOAD_SECRET=your-secret-key-here` (copy from `.env.example`).

### Issue: Lint warnings in auto-generated files

**Symptom**: ESLint warnings in `database/migrations/*.ts` or `database/schema.ts`  
**Status**: EXPECTED - These are auto-generated files. Warnings are safe to ignore.

### Issue: Changes to admin UI not reflecting

**Symptom**: Admin UI looks outdated after collection changes  
**Fix**: Restart dev server after running `generate:db-schema` and `generate:types`.

### Issue: Translation key not found error

**Symptom**: `[missing translation key]` displayed in UI  
**Fix**: Add missing key to both `i18n/messages/en.json` and `i18n/messages/vi.json`.

### Issue: Next.js build fails with "Module not found: Can't resolve '@/...'"

**Symptom**: Path alias resolution errors  
**Fix**: Verify `tsconfig.json` has correct `paths` configuration. Restart TypeScript server in IDE.

---

## Validation Steps Before Committing

**MANDATORY CHECKS** (all must pass):

1. **Lint**: `pnpm lint` → No errors (warnings in `database/` are OK)
2. **TypeScript**: `pnpm build` → Builds successfully
3. **Environment**: `.env` file exists with required variables
4. **Payload Schema**: If collections changed, run `generate:db-schema` + `generate:types`
5. **Manual Test**: `pnpm dev` → Site loads at http://localhost:3000, admin at http://localhost:3000/admin

**RECOMMENDED CHECKS**:

- Test both locales: Switch between `http://localhost:3000` (vi) and `http://localhost:3000/en`
- Test admin login: http://localhost:3000/admin (admin@admin.com / Admin@123)
- Check browser console: No JavaScript errors

---

## Deployment Notes

**Build Command**: `pnpm build` (takes ~1-2 minutes)  
**Start Command**: `pnpm start`  
**Environment Variables**: Must set `PAYLOAD_SECRET`, `DATABASE_URL`, `DATABASE_AUTH_TOKEN` (if using remote DB)

**Pre-deployment Checklist**:

- Change `PAYLOAD_SECRET` to a strong, unique value
- Verify all translations complete (`en.json` and `vi.json`)
- Run production build locally to catch errors
- Test admin login with production credentials
- Verify image uploads work (Sharp image processing)
- Check Lighthouse scores (target: >90 mobile, >85 desktop)

---

## Trust These Instructions

These instructions are validated and current as of January 2026. **Trust them first** - only perform additional searches if:

- Instructions are incomplete for your specific task
- Instructions contradict actual project behavior
- You encounter an error not covered in "Common Issues"

**When in doubt**: Read the constitution at `.specify/memory/constitution.md` for core principles, or consult feature documentation at `specs/001-corporate-website/plan.md`.
