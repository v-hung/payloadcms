# Quickstart Guide: Corporate Website

**Feature**: Corporate Website | **Branch**: 001-corporate-website | **Date**: 2026-01-23

## Prerequisites

Before starting implementation, ensure you have:

- ✅ Node.js v22.17.1 installed (`node --version`)
- ✅ pnpm 10.28.1 installed (`pnpm --version`)
- ✅ `.env` file exists with `PAYLOAD_SECRET` and `DATABASE_URL`
- ✅ On branch `001-corporate-website` (`git branch --show-current`)
- ✅ Read [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)
- ✅ Read [.specify/memory/constitution.md](../../../.specify/memory/constitution.md)

## Development Workflow

### Step 1: Install Dependencies

```bash
pnpm install
```

This must be run first and after any `package.json` changes.

### Step 2: Create Payload CMS Collections & Globals

Create the following files in order:

#### 2a. Categories Collection

```bash
# Create file: collections/categories.ts
```

**Key points:**

- `slug: 'categories'`
- Fields: name, slug, description, displayOrder, status
- Both `en` and `vi` labels
- Mark `name`, `description` as `localized: true`

#### 2b. Products Collection

```bash
# Create file: collections/products.ts
```

**Key points:**

- `slug: 'products'`
- Relationship to `categories` with `hasMany: true`
- Multiple images support
- Featured/bestSeller flags
- All content fields `localized: true`

#### 2c. Contact Inquiries Collection

```bash
# Create file: collections/contact-inquiries.ts
```

**Key points:**

- `slug: 'contact-inquiries'`
- Fields: name, email, phone, message, status
- NOT localized (user-generated data)
- Read-only after submission

#### 2d. Company Info Global

```bash
# Create directory: globals/
# Create file: globals/company-info.ts
```

**Key points:**

- `slug: 'company-info'`
- Singleton global (not a collection)
- All content fields `localized: true`

#### 2e. Manufacturing Global

```bash
# Create file: globals/manufacturing.ts
```

**Key points:**

- `slug: 'manufacturing'`
- Singleton global
- All content fields `localized: true`

#### 2f. Update Existing Posts Collection

```bash
# Edit file: collections/post.ts
```

**Add fields:**

- `featured` (checkbox)
- `displayOrder` (number)
- `seoTitle`, `seoDescription` (localized text)

### Step 3: Register Collections in Payload Config

```bash
# Edit file: payload.config.ts
```

Import and add all new collections and globals:

```typescript
import { Categories } from "./collections/categories";
import { Products } from "./collections/products";
import { ContactInquiries } from "./collections/contact-inquiries";
import { CompanyInfo } from "./globals/company-info";
import { Manufacturing } from "./globals/manufacturing";

export default buildConfig({
  collections: [Posts, Products, Categories, ContactInquiries],
  globals: [CompanyInfo, Manufacturing],
  // ... rest of config
});
```

### Step 4: Generate Payload Schemas & Types

**CRITICAL:** Run these commands after creating/modifying any collection:

```bash
npx payload generate:db-schema
npx payload generate:types
```

**Expected output:**

- `payload-generated-schema.ts` updated
- `payload-types.ts` updated with new collection types

**Warnings to ignore:**

- "No email adapter provided" - normal, emails write to console

### Step 5: Add Translation Keys

```bash
# Edit files: i18n/messages/en.json and i18n/messages/vi.json
```

Add keys for all new pages (see data-model.md for full list):

```json
{
  "Navigation": {
    "home": "Home" / "Trang chủ",
    "about": "About" / "Giới thiệu",
    "products": "Products" / "Sản phẩm",
    "manufacturing": "Manufacturing" / "Sản xuất",
    "news": "News" / "Tin tức",
    "contact": "Contact" / "Liên hệ"
  },
  "ProductsPage": { ... },
  "AboutPage": { ... },
  "ContactPage": { ... }
  // etc.
}
```

### Step 6: Install Required shadcn/ui Components

```bash
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add select
```

These install to `components/ui/` and are used for forms, product cards, etc.

### Step 7: Create Shared Components

Create in this order (dependencies):

1. **Navigation Components** (no dependencies)
   - `components/navigation/header.tsx` (Server Component)
   - `components/navigation/footer.tsx` (Server Component)
   - `components/navigation/language-switcher.tsx` (Client Component)

2. **Product Components**
   - `components/product/product-card.tsx` (Server Component)
   - `components/product/product-grid.tsx` (Server Component)
   - `components/product/category-filter.tsx` (Client Component)

3. **Form Components**
   - `components/forms/contact-form.tsx` (Client Component)

### Step 8: Create Page Routes

Create pages in this priority order:

**Priority 1 (MVP):**

1. `app/(app)/[locale]/page.tsx` - Home page (update existing)
2. `app/(app)/[locale]/about/page.tsx` - About page
3. `app/(app)/[locale]/products/page.tsx` - Products listing
4. `app/(app)/[locale]/products/[slug]/page.tsx` - Product detail
5. `app/(app)/[locale]/contact/page.tsx` - Contact page

**Priority 2:** 6. `app/(app)/[locale]/manufacturing/page.tsx` - Manufacturing page 7. `app/(app)/[locale]/news/page.tsx` - News/articles listing 8. `app/(app)/[locale]/news/[slug]/page.tsx` - Article detail

**Optional (P3):** 9. `app/(app)/[locale]/products/[category]/page.tsx` - Category-filtered products

### Step 9: Create Utility Functions

```bash
# Create file: lib/payload-utils.ts
```

Helper functions for fetching Payload data (e.g., `getProducts()`, `getProduct(slug)`, etc.)

### Step 10: Start Development Server

```bash
pnpm dev
```

**Verify:**

- Public site: http://localhost:3000
- Admin UI: http://localhost:3000/admin
- No TypeScript errors in terminal
- Hot reload works when editing files

### Step 11: Seed Initial Data via Admin UI

1. Navigate to http://localhost:3000/admin
2. Login with Payload credentials
3. Create data in this order:
   - **Company Info global**: Add company name, vision, mission, etc.
   - **Manufacturing global**: Add factory info
   - **Categories**: Create 3-5 product categories
   - **Products**: Create 5-10 sample products with images
   - **Posts**: Create 2-3 sample articles
4. Set some products/posts as `featured: true` for home page display

### Step 12: Validate Implementation

Run these checks before committing:

```bash
# 1. Linting
pnpm lint
# Expected: Pass with only 1 known warning in payload-generated-schema.ts

# 2. TypeScript check
# In VS Code: Check for red squiggles, should be zero errors

# 3. Build test (optional but recommended)
pnpm build
# Expected: Build succeeds without errors

# 4. Manual testing checklist:
```

- [ ] Home page displays in both Vietnamese and English
- [ ] Language switcher toggles between vi/en
- [ ] Navigation menu shows all 6 main links
- [ ] Products page shows category filters
- [ ] Product detail pages load with images and full info
- [ ] Contact form validates required fields
- [ ] Contact form submission appears in admin `/admin/collections/contact-inquiries`
- [ ] About page shows company vision/mission/values
- [ ] Manufacturing page displays factory info
- [ ] News/articles page lists posts
- [ ] Mobile responsive: test on phone viewport (375px width)

## Common Commands Reference

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Generate Payload schemas (after collection changes)
npx payload generate:db-schema
npx payload generate:types

# Lint code
pnpm lint

# Fix auto-fixable lint issues
pnpm lint --fix

# Build for production
pnpm build

# Start production server (after build)
pnpm start

# Add shadcn/ui component
pnpm dlx shadcn@latest add <component-name>
```

## Troubleshooting

### "Database not found" error

- Check `.env` file has `DATABASE_URL=file:./data/sqlite.db`
- Ensure `data/` directory exists

### "PAYLOAD_SECRET not set" error

- Create `.env` file (copy from `.env.example`)
- Add `PAYLOAD_SECRET=your-secret-here`

### Type errors after creating collections

- Run `npx payload generate:db-schema`
- Run `npx payload generate:types`
- Restart VS Code TypeScript server: Cmd+Shift+P → "TypeScript: Restart TS Server"

### Changes not reflected in admin UI

- Clear browser cache
- Restart dev server (`pnpm dev`)
- Check collection is registered in `payload.config.ts`

### Translation missing errors

- Verify key exists in BOTH `i18n/messages/en.json` AND `vi.json`
- Check key path matches `useTranslations('ComponentName')` usage
- Restart dev server to reload translation files

## Next Steps After Quickstart

1. Review generated files match data-model.md specifications
2. Implement Server Actions for contact form submission
3. Add `generateMetadata` functions for SEO
4. Optimize images using Next.js Image component
5. Test performance with Lighthouse (target: 90+ mobile, 85+ desktop)
6. Create seed data script for demo/testing (optional)
7. Proceed to `/speckit.tasks` for detailed task breakdown

## Reference Documents

- [spec.md](./spec.md) - Feature requirements and user stories
- [plan.md](./plan.md) - This implementation plan
- [data-model.md](./data-model.md) - Database schema and relationships
- [research.md](./research.md) - Technical decisions and alternatives
- [.github/copilot-instructions.md](../../../.github/copilot-instructions.md) - Coding conventions
- [.specify/memory/constitution.md](../../../.specify/memory/constitution.md) - Project principles
