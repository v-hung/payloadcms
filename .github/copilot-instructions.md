# Copilot Instructions for my-app

## Project Overview

This is a **corporate website project** built with Next.js 16 and Payload CMS v3 to showcase company products, manufacturing capabilities, and export markets. The website serves as an official communication channel with SEO optimization for domestic and international markets. It's a full-stack TypeScript application using React 19, SQLite database, and modern tooling.

**Key Technologies:**

- **Framework:** Next.js 16.1.4 (App Router with React Server Components)
- **CMS:** Payload CMS v3.72.0 with SQLite adapter
- **Runtime:** Node.js v22.17.1
- **Package Manager:** pnpm v10.28.1
- **Styling:** Tailwind CSS v4 with shadcn/ui components
- **Language:** TypeScript v5
- **Rich Text Editor:** Lexical
- **Image Processing:** Sharp

## Build & Run Commands

**CRITICAL: Always run commands in this exact order to avoid errors.**

### Development Workflow

1. **Install Dependencies** (always run first after cloning or when package.json changes):

   ```bash
   pnpm install
   ```

2. **Generate Payload Schema** (run after modifying payload.config.ts or collections):

   ```bash
   npx payload generate:db-schema
   ```

   This generates `payload-generated-schema.ts` - do not manually edit this file.

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```

   - Application: http://localhost:3000
   - Payload Admin Panel: http://localhost:3000/admin
   - GraphQL Playground: http://localhost:3000/api/graphql-playground

### Production Build

1. **Build for Production**:

   ```bash
   pnpm build
   ```

   Creates optimized production build in `.next/` directory.

2. **Start Production Server**:
   ```bash
   pnpm start
   ```

### Code Quality

1. **Run Linter**:
   ```bash
   pnpm lint
   ```
   Uses ESLint v9 with Next.js config. Known issue: `payload-generated-schema.ts` may show unused eslint-disable warnings (safe to ignore).

### Payload CLI Commands

Access Payload CLI tools:

```bash
pnpm payload <command>
```

Note: Uses `cross-env` to set `PAYLOAD_CONFIG_PATH=payload.config.ts`

## Project Architecture

### Directory Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── (app)/                   # Public-facing website routes (route group)
│   │   ├── globals.css          # Tailwind CSS global styles
│   │   ├── layout.tsx           # Root layout with fonts (Geist Sans/Mono)
│   │   └── page.tsx             # Homepage
│   └── (payload)/               # Payload CMS routes (route group)
│       ├── admin/               # Admin UI routes
│       │   ├── importMap.js     # Auto-generated import map
│       │   └── [[...segments]]/  # Catch-all route for admin panel
│       ├── api/                 # REST & GraphQL API routes
│       │   ├── [...slug]/       # Auto-generated REST API
│       │   ├── graphql/         # GraphQL endpoint
│       │   └── graphql-playground/ # GraphQL Playground UI
│       ├── custom.scss          # Custom Payload admin styles
│       └── layout.tsx           # Payload admin layout
├── collections/                  # Payload CMS collections
│   └── post.ts                  # Posts collection with localization
├── components/
│   └── ui/                      # shadcn/ui components
│       └── button.tsx
├── i18n/                        # Internationalization
│   ├── payload_translations.ts  # Translation exports
│   └── locales/
│       ├── en.json              # English translations
│       └── vi.json              # Vietnamese translations
├── lib/
│   └── utils.ts                 # Utility functions (cn for classnames)
├── public/                      # Static assets
├── data/                        # Data storage directory
├── payload.config.ts            # Payload CMS configuration (CRITICAL FILE)
├── next.config.ts               # Next.js config with Payload integration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration (new flat config)
├── components.json              # shadcn/ui configuration
├── pnpm-workspace.yaml          # pnpm workspace config (ignored deps: sharp, unrs-resolver)
└── payload-generated-schema.ts  # Auto-generated (DO NOT EDIT MANUALLY)
```

### Key Configuration Files

**payload.config.ts** - Main CMS configuration:

- Database: SQLite adapter with push migrations in development
- Editor: Lexical rich text editor
- Localization: Vietnamese (default) and English
- Collections defined in `collections/` directory
- Environment variables required: `PAYLOAD_SECRET`, `DATABASE_URL`, `DATABASE_AUTH_TOKEN` (optional)

**next.config.ts** - Wrapped with `withPayload()` middleware for CMS integration

**tsconfig.json** - Path aliases:

- `@/*` → project root
- `@payload-config` → payload.config.ts

**components.json** - shadcn/ui configuration:

- Style: new-york
- Tailwind CSS v4
- CSS file: `app/(app)/globals.css`
- Icon library: lucide-react

### Localization Setup

The project supports **Vietnamese (default)** and **English**:

- Admin UI translations: Managed via `i18n/payload_translations.ts`
- Content localization: Enabled on collection fields with `localized: true`
- Translation files: JSON format in `i18n/locales/`
- Posts collection has localized title, slug, excerpt, and content fields

### Route Groups Explained

- **(app)/** - Public-facing website routes, uses custom layout with fonts
- **(payload)/** - Payload admin and API routes, auto-generated by Payload

## Coding Standards & Best Practices

### TypeScript

- **Strict mode enabled** - all code must pass strict type checking
- Use `type` for object shapes, `interface` for extensible contracts
- Prefer type safety over `any` - use `unknown` if type is truly unknown

### React & Next.js

- Use **React Server Components (RSC)** by default in `app/` directory
- Add `'use client'` directive only when needed (useState, useEffect, event handlers)
- Async components are RSC - fetch data directly in components
- Client Components go in `components/` directory

### Styling

- **Tailwind CSS v4** - use utility classes
- Use `cn()` from `@/lib/utils` for conditional classnames
- shadcn/ui components live in `components/ui/`
- Follow shadcn's component patterns for new UI components

### Payload CMS Collections

- Define in `collections/` directory
- Export as `CollectionConfig` type
- Always include localized labels for admin UI
- Use `payloadTranslations` from `@/i18n/payload_translations` for labels
- Run `npx payload generate:db-schema` after collection changes

### File Naming

- Components: PascalCase (`MyComponent.tsx`)
- Routes: lowercase with dashes (`my-route/`)
- Collections: singular, lowercase (`post.ts`)
- Utilities: camelCase (`utils.ts`)

## Common Workflows

### Adding a New Payload Collection

1. Create collection file in `collections/` directory:

   ```typescript
   import type { CollectionConfig } from "payload";
   export const MyCollection: CollectionConfig = {
     /* config */
   };
   ```

2. Import in `payload.config.ts`:

   ```typescript
   import { MyCollection } from "./collections/my-collection";
   ```

3. Add to collections array:

   ```typescript
   collections: [Posts, MyCollection],
   ```

4. Generate database schema:

   ```bash
   npx payload generate:db-schema
   ```

5. Restart dev server

### Adding a shadcn/ui Component

```bash
pnpm dlx shadcn@latest add <component-name>
```

Example: `pnpm dlx shadcn@latest add button`

Component will be added to `components/ui/`

### Adding a New Translation Key

1. Add key to both `i18n/locales/en.json` and `i18n/locales/vi.json`
2. Reference in code: `t.en.your.key` or `t.vi.your.key`
3. Type safety is provided by TypeScript

## Known Issues & Workarounds

1. **Linter Warning on payload-generated-schema.ts**:
   - Warning about unused eslint-disable directive is harmless
   - File is auto-generated - do not manually edit
   - Fix: Not required, can be ignored

2. **pnpm Workspace Ignored Dependencies**:
   - `sharp` and `unrs-resolver` are ignored in builds (see pnpm-workspace.yaml)
   - This is intentional for compatibility

3. **Payload Admin Routes**:
   - All files in `app/(payload)/api/[...slug]/` and `app/(payload)/admin/` are auto-generated
   - Comment at top indicates generation status: `/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */`
   - Do not modify these files - they will be overwritten

## Environment Variables

Create `.env.local` file in project root:

```env
PAYLOAD_SECRET=your-secret-here
DATABASE_URL=file:./data/db.sqlite
DATABASE_AUTH_TOKEN=  # Optional for remote databases
NODE_ENV=development  # or production
```

## Testing Changes

1. **Before committing**:
   - Run `pnpm lint` - must pass without errors
   - If collection changes: run `npx payload generate:db-schema`
   - Start dev server and verify changes work
   - Check both public site (/) and admin panel (/admin)

2. **For Payload changes**:
   - Test in admin panel UI
   - Verify GraphQL queries at /api/graphql-playground
   - Check REST API endpoints at /api/posts (or your collection slug)

3. **For UI changes**:
   - Test responsive design (mobile, tablet, desktop)
   - Verify both light and dark modes if applicable
   - Check all locales (vi and en)

## Important Notes

- **Database**: SQLite file stored in `data/` directory (ensure directory exists)
- **No CI/CD**: No GitHub Actions or automated tests configured yet
- **No Tests**: No testing framework set up currently
- **Route Groups**: Don't forget parentheses in folder names `(app)` and `(payload)`
- **Admin Panel**: Accessible at `/admin` - requires authentication
- **API Endpoints**: REST at `/api/<collection-slug>`, GraphQL at `/api/graphql`

## Trust These Instructions

**Trust this document first.** Only perform additional searches if:

- Information here is incomplete or unclear
- You encounter errors not documented here
- You need to understand implementation details of specific features

This document is regularly updated to reflect the current state of the project.
