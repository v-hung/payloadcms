# Implementation Plan: Corporate Website

**Branch**: `001-corporate-website` | **Date**: 2026-01-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-corporate-website/spec.md`

## Summary

Build a bilingual (Vietnamese/English) corporate website to promote products, showcase manufacturing capabilities, and serve as the company's official marketing platform for domestic and international markets. The site includes home, about, products, manufacturing, news/articles, and contact sections. Content is managed through Payload CMS with SQLite database, using Next.js 16 App Router, next-intl for i18n, and Tailwind CSS with shadcn/ui for styling. The website must be SEO-friendly, mobile-responsive, and easy for non-technical admins to maintain.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.1.4 (React 19.2.3), Node.js v22.17.1  
**Primary Dependencies**: Payload CMS 3.72.0, next-intl 4.7.0, Tailwind CSS 4.x, shadcn/ui, Lexical editor  
**Storage**: SQLite database via @payloadcms/db-sqlite  
**Testing**: Manual testing via browser, Lighthouse/PageSpeed Insights for performance validation  
**Target Platform**: Web browsers (desktop, tablet, mobile), deployed via Vercel/Netlify-compatible hosting  
**Project Type**: Web application (Next.js App Router with public pages + CMS admin)  
**Performance Goals**: < 3s First Contentful Paint, Lighthouse score > 90 (mobile), > 85 (desktop)  
**Constraints**: < 200KB per optimized image, bilingual content required for all UI elements, SQLite initially (hundreds of products)  
**Scale/Scope**: 20-50 products across 5-10 categories, dozens of articles, 100 concurrent visitors, 2-5 admin users

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [ ] **Type Safety:** All new code uses TypeScript strict mode, no implicit `any`
- [ ] **Payload CMS:** If collections modified, schema generation commands documented in tasks
- [ ] **Internationalization:** All UI text externalized to `i18n/messages/` (both en/vi)
- [ ] **Performance:** Image optimization and query efficiency considered in design
- [ ] **Component Architecture:** Server vs Client component usage justified
- [ ] **Build Process:** All required build steps (install, generate, lint) documented

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── (app)/[locale]/                    # Public-facing pages (bilingual)
│   ├── layout.tsx                     # Root layout with i18n provider
│   ├── page.tsx                       # Home page
│   ├── about/
│   │   └── page.tsx                   # About page (vision, mission, values)
│   ├── products/
│   │   ├── page.tsx                   # Products listing with category filters
│   │   ├── [category]/
│   │   │   └── page.tsx               # Category-filtered product list
│   │   └── [slug]/
│   │       └── page.tsx               # Product detail page
│   ├── manufacturing/
│   │   └── page.tsx                   # Manufacturing capability showcase
│   ├── news/
│   │   ├── page.tsx                   # Articles/news listing
│   │   └── [slug]/
│   │       └── page.tsx               # Article detail page
│   └── contact/
│       └── page.tsx                   # Contact page with form
├── (payload)/                         # Auto-generated Payload admin (DO NOT EDIT)
│   ├── admin/
│   ├── api/
│   └── layout.tsx

collections/                            # Payload CMS collection definitions
├── products.ts                        # Products collection
├── categories.ts                      # Product categories collection
├── posts.ts                           # Articles/news posts collection (existing)
└── contact-inquiries.ts               # Contact form submissions collection

globals/                               # Payload global singletons
├── company-info.ts                    # Company overview, vision, mission
└── manufacturing.ts                   # Manufacturing capability content

components/                            # Shared React components
├── ui/                                # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ... (installed via pnpm dlx shadcn)
├── navigation/
│   ├── header.tsx                     # Site header with nav menu
│   ├── footer.tsx                     # Site footer
│   └── language-switcher.tsx          # VI/EN language toggle
├── product/
│   ├── product-card.tsx               # Product thumbnail for listings
│   ├── product-grid.tsx               # Product grid layout
│   └── category-filter.tsx            # Category filter UI
└── forms/
    └── contact-form.tsx               # Contact inquiry form

lib/                                   # Utility functions
├── utils.ts                           # Tailwind merge utilities (existing)
├── locale-utils.ts                    # i18n helper functions (existing)
└── payload-utils.ts                   # Payload data fetching helpers

i18n/                                  # Internationalization configs
├── localization.ts                    # Payload localization (existing)
├── routing.ts                         # next-intl routing (existing)
├── navigation.ts                      # Internationalized Link/redirect
├── request.ts                         # Server-side i18n
└── messages/
    ├── en.json                        # English translations (expand)
    └── vi.json                        # Vietnamese translations (expand)

public/                                # Static assets
├── images/
│   └── placeholder.png                # Product placeholder image
└── favicon.ico

data/                                  # SQLite database files
└── sqlite.db                          # Database (gitignored)
```

**Structure Decision**: Next.js 16 App Router web application with:

- Public pages in `app/(app)/[locale]/` for bilingual routing
- Payload CMS admin auto-generated in `app/(payload)/`
- Collection definitions in `collections/` and `globals/` for CMS content types
- Shared components in `components/` using shadcn/ui patterns
- i18n configuration already established, extending for new pages
- No separate backend - Next.js API routes via Payload handle all backend logic

## Complexity Tracking

> **No violations** - All constitution checks pass:
>
> - TypeScript strict mode enforced throughout
> - Payload CMS schema generation workflow will be followed
> - Bilingual i18n already configured, extending to new content
> - Performance optimized with Next.js Image component and Server Components
> - Component architecture follows established Server/Client patterns
> - Build process documented in existing copilot-instructions.md

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
