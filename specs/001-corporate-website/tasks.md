# Tasks: Corporate Website

**Input**: Design documents from `/specs/001-corporate-website/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No automated tests requested in specification - validation will be manual via browser testing and Lighthouse audits

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3) - only for user story phases
- Include exact file paths in descriptions

## Path Conventions

- All paths relative to repository root: `d:\memo\nextjs\my-app\`
- Collections: `collections/*.ts`
- Globals: `globals/*.ts`
- Pages: `app/(app)/[locale]/**/*.tsx`
- Components: `components/**/*.tsx`
- Translations: `i18n/messages/*.json`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency verification

- [x] T001 Verify Node.js v22.17.1 and pnpm 10.28.1 are installed via `node --version` and `pnpm --version`
- [x] T002 Run `pnpm install` to install all dependencies
- [x] T003 [P] Verify `.env` file exists with PAYLOAD_SECRET and DATABASE_URL (reference .env.example if missing)
- [x] T004 [P] Verify feature branch `001-corporate-website` is checked out via `git branch --show-current`
- [x] T005 Run `pnpm lint` to verify ESLint configuration works

**Checkpoint**: Dependencies installed, environment configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core CMS collections and configuration that MUST be complete before ANY page implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Collection Schema Creation

- [x] T006 [P] Create `collections/categories.ts` with fields: name (localized), slug (unique), description (localized), displayOrder, status, seoTitle, seoDescription per data-model.md
- [x] T007 [P] Create `collections/products.ts` with fields: name (localized), slug (unique), description (richText, localized), excerpt, specifications, benefits, usageInstructions, categories (relationship, hasMany), images (upload, hasMany), featured, bestSeller, status, seoTitle, seoDescription, displayOrder per data-model.md
- [x] T008 [P] Extend `collections/post.ts` to add fields: featured (checkbox), displayOrder (number), seoTitle (localized), seoDescription (localized) per data-model.md
- [x] T009 [P] Create `collections/contact-inquiries.ts` with fields: name, email, phone, message, status (select: new/in-progress/responded/closed), notes, submittedAt, ipAddress, userAgent per data-model.md

### Global Schema Creation

- [x] T010 [P] Create `globals/company-info.ts` with fields: companyName (localized), tagline, overview (richText), vision (richText), mission (richText), coreValues (richText), address, phone, email, logo (upload), socialMedia (array) per data-model.md
- [x] T011 [P] Create `globals/manufacturing.ts` with fields: headline (localized), description (richText), factorySize, productionCapacity, certifications (richText), processes (richText), leadTimes, images (upload, hasMany), seoTitle, seoDescription per data-model.md

### Registration and Schema Generation

- [x] T012 Update `payload.config.ts` to register new collections: categories, products, contact-inquiries (post already exists)
- [x] T013 Update `payload.config.ts` to register new globals: company-info, manufacturing
- [x] T014 Run `npx payload generate:db-schema` to generate SQLite schema from collections (creates payload-generated-schema.ts)
- [x] T015 Run `npx payload generate:types` to generate TypeScript types (creates payload-types.ts)

### Translation Keys Setup

- [x] T016 Add navigation menu keys to `i18n/messages/en.json`: nav.home, nav.about, nav.products, nav.manufacturing, nav.news, nav.contact
- [x] T017 Add navigation menu keys to `i18n/messages/vi.json`: nav.home, nav.about, nav.products, nav.manufacturing, nav.news, nav.contact (Vietnamese translations)
- [x] T018 [P] Add common UI keys to both `i18n/messages/en.json` and `vi.json`: common.readMore, common.learnMore, common.viewAll, common.featured, common.bestSeller, common.searchPlaceholder

### Core Components

- [x] T019 [P] Create `components/navigation/header.tsx` with main navigation menu (Home, About, Products, Manufacturing, News, Contact), language switcher, and responsive mobile menu (Client Component)
- [x] T020 [P] Create `components/navigation/footer.tsx` with company info, links, and copyright (Server Component)
- [x] T021 [P] Update `app/(app)/[locale]/layout.tsx` to include Header and Footer components

### Utility Functions

- [x] T022 [P] Create `lib/payload-utils.ts` with helper functions: getPayload() wrapper, formatDate(), getLocalizedField(data, locale, fieldName)

### Verification

- [x] T023 Run `pnpm dev` and verify server starts on http://localhost:3000
- [x] T024 Access http://localhost:3000/admin and verify all collections and globals appear in Payload CMS sidebar
- [x] T025 Verify no TypeScript errors in terminal or editor

**Checkpoint**: Foundation ready - all collections created, schema generated, basic navigation in place. User story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Basic Company Information Display (Priority: P1) 🎯 MVP

**Goal**: Display company information on Home and About pages so visitors immediately understand who the company is and how to contact them

**Independent Test**: Navigate to home page and verify company name, tagline, overview are visible. Navigate to /about and verify vision, mission, values display. Switch to English and verify translations work. This delivers functional corporate presence.

### Home Page Implementation

- [x] T026 [US1] Update `app/(app)/[locale]/page.tsx` to fetch company-info global via Payload SDK
- [x] T027 [US1] Display company name, tagline, and overview (richText) on home page with proper localization
- [x] T028 [US1] Display company logo from company-info.logo field using Next.js Image component
- [x] T029 [US1] Add generateMetadata function to set page title and description from company-info data

### About Page Implementation

- [x] T030 [P] [US1] Create `app/(app)/[locale]/about/page.tsx` to fetch company-info global
- [x] T031 [US1] Display vision, mission, and core values sections with richText rendering
- [x] T032 [US1] Add generateMetadata function for About page SEO
- [x] T033 [US1] Create responsive layout for About page content sections

### Contact Page Implementation

- [x] T034 [P] [US1] Create `app/(app)/[locale]/contact/page.tsx` to fetch company-info global for display
- [x] T035 [US1] Display company address, phone, email from company-info global
- [x] T036 [US1] Create `components/forms/contact-form.tsx` with React Hook Form and zod validation (name, email, phone, message all required, email format validation) per research.md Task 4
- [x] T037 [US1] Implement Server Action in contact form to create record in contact-inquiries collection via Payload SDK
- [x] T038 [US1] Add success/error message display in contact form after submission
- [x] T039 [US1] Add translation keys for contact form in `i18n/messages/en.json` and `vi.json`: contact.formTitle, contact.nameLabel, contact.emailLabel, contact.phoneLabel, contact.messageLabel, contact.submitButton, contact.successMessage, contact.errorMessage

### shadcn/ui Components Installation

- [x] T040 [P] [US1] Install button component: `pnpm dlx shadcn@latest add button`
- [x] T041 [P] [US1] Install card component: `pnpm dlx shadcn@latest add card`
- [x] T042 [P] [US1] Install input component: `pnpm dlx shadcn@latest add input`
- [x] T043 [P] [US1] Install textarea component: `pnpm dlx shadcn@latest add textarea`

### Validation

- [x] T044 [US1] Test: Navigate to home page in both Vietnamese and English, verify company name, tagline, overview display correctly
- [x] T045 [US1] Test: Navigate to /about page, verify vision/mission/values display in both languages
- [x] T046 [US1] Test: Navigate to /contact page, verify company info displays and form validates all required fields
- [x] T047 [US1] Test: Submit contact form with valid data, verify success message and check Payload admin shows new inquiry
- [x] T048 [US1] Test: Submit contact form with invalid email, verify validation error appears
- [x] T049 [US1] Run Lighthouse audit on home/about/contact pages, verify accessibility score > 90

**Checkpoint**: At this point, User Story 1 is fully functional - visitors can learn about company and contact them. This is the MVP.

---

## Phase 4: User Story 2 - Product Catalog Browsing (Priority: P1) 🎯 MVP

**Goal**: Enable product discovery through browsable categories and detailed product pages so potential buyers can explore offerings

**Independent Test**: Browse /products page, click category filter, navigate to product detail page with specifications and images. Switch language and verify product info translates. This delivers product discovery.

### Product List Page

- [x] T050 [P] [US2] Create `app/(app)/[locale]/products/page.tsx` to fetch all products and categories from Payload
- [x] T051 [US2] Create `components/product/product-card.tsx` to display product thumbnail with name, excerpt, featured/bestSeller badges (Server Component)
- [x] T052 [US2] Create `components/product/product-grid.tsx` to layout product cards in responsive grid
- [x] T053 [US2] Create `components/product/category-filter.tsx` with category tabs/buttons to filter products (Client Component)
- [x] T054 [US2] Implement client-side category filtering logic in product-grid component
- [x] T055 [US2] Display featured products separately at top of page with distinctive styling
- [x] T056 [US2] Add generateMetadata for products listing page
- [x] T057 [US2] Add translation keys to `i18n/messages/*.json`: products.title, products.allCategories, products.featured, products.bestSeller, products.viewDetails

### Product Detail Page

- [x] T058 [P] [US2] Create `app/(app)/[locale]/products/[slug]/page.tsx` to fetch single product by slug
- [x] T059 [US2] Display product name, description (richText), specifications, benefits, usage instructions with proper richText rendering
- [x] T060 [US2] Display product images using Next.js Image component in image gallery layout (multiple images)
- [x] T061 [US2] Display product categories as badges/tags linking to category-filtered product list
- [x] T062 [US2] Add generateMetadata function using product name, excerpt/description, and locale per research.md Task 5
- [x] T063 [US2] Add breadcrumb navigation: Home > Products > [Category] > [Product Name]

### Category-Filtered Product Page (Optional Enhancement)

- [ ] T064 [P] [US2] Create `app/(app)/[locale]/products/[category]/page.tsx` to show products filtered by category slug (OPTIONAL - skipped for MVP)
- [ ] T065 [US2] Display category name and description at top of filtered page (OPTIONAL - skipped for MVP)
- [ ] T066 [US2] Add generateMetadata for category pages using category name and description (OPTIONAL - skipped for MVP)

### Featured Products on Home Page

- [x] T067 [US2] Update `app/(app)/[locale]/page.tsx` to fetch featured products (where featured: true)
- [x] T068 [US2] Display featured products section on home page using product-card component
- [x] T069 [US2] Add "View All Products" link to /products page

### shadcn/ui Components Installation

- [x] T070 [P] [US2] Install badge component: `pnpm dlx shadcn@latest add badge`
- [x] T071 [P] [US2] Install tabs component: `pnpm dlx shadcn@latest add tabs` (for category filters)

### Validation

- [x] T072 [US2] Test: Navigate to /products, verify all products display with thumbnails and category filters work
- [x] T073 [US2] Test: Click category filter, verify product list updates to show only products in that category
- [x] T074 [US2] Test: Click product card, verify detail page shows complete product information and images
- [x] T075 [US2] Test: Verify product detail page displays in both Vietnamese and English with proper translations
- [x] T076 [US2] Test: Verify featured products appear on home page
- [x] T077 [US2] Run Lighthouse audit on product pages, verify performance score > 85 desktop, > 75 mobile
- [x] T078 [US2] Verify all product images are optimized < 200KB (check Network tab in DevTools)

**Checkpoint**: At this point, User Stories 1 AND 2 are complete - full MVP with company info and product catalog functional.

---

## Phase 5: User Story 3 - Manufacturing Capability Showcase (Priority: P2)

**Goal**: Build enterprise buyer confidence by showcasing factory capacity, processes, and quality standards

**Independent Test**: Navigate to /manufacturing page and verify display of capacity metrics, certifications, process descriptions, and factory images. This demonstrates production credibility.

### Manufacturing Page Implementation

- [x] T079 [P] [US3] Create `app/(app)/[locale]/manufacturing/page.tsx` to fetch manufacturing global
- [x] T080 [US3] Display headline and description (richText) from manufacturing global
- [x] T081 [US3] Display factory metrics: factorySize, productionCapacity, leadTimes in structured layout
- [x] T082 [US3] Display certifications and quality standards (richText) with proper formatting
- [x] T083 [US3] Display manufacturing processes description (richText) with section headings
- [x] T084 [US3] Display factory images in gallery layout using Next.js Image component (multiple images from manufacturing.images)
- [x] T085 [US3] Add generateMetadata function using manufacturing.seoTitle and seoDescription
- [x] T086 [US3] Add translation keys to `i18n/messages/*.json`: manufacturing.title, manufacturing.factorySizeLabel, manufacturing.capacityLabel, manufacturing.leadTimesLabel, manufacturing.certificationsTitle, manufacturing.processesTitle

### Featured Section on Home Page

- [x] T087 [US3] Update `app/(app)/[locale]/page.tsx` to add manufacturing capability highlight section
- [x] T088 [US3] Display brief manufacturing overview with "Learn More" link to /manufacturing page

### Validation

- [x] T089 [US3] Test: Navigate to /manufacturing page, verify all sections display correctly in both languages
- [x] T090 [US3] Test: Verify factory images display and are optimized < 200KB
- [x] T091 [US3] Test: Verify manufacturing highlight appears on home page with working link
- [x] T092 [US3] Run Lighthouse audit on manufacturing page, verify performance and SEO scores meet targets

**Checkpoint**: At this point, User Stories 1, 2, AND 3 are complete - company info, products, and manufacturing all functional.

---

## Phase 6: User Story 4 - Content Management & Updates (Priority: P2)

**Goal**: Enable marketing team to independently create and publish articles/news content through Payload CMS

**Independent Test**: Admin logs into Payload CMS, creates new article with title and content in both languages, publishes it, verifies it appears on /news page. This demonstrates content management capability.

### News/Articles Listing Page

- [x] T093 [P] [US4] Create `app/(app)/[locale]/news/page.tsx` to fetch published posts from Payload (status: published, order by publishedAt desc)
- [x] T094 [US4] Create `components/content/post-card.tsx` to display article thumbnail with title, excerpt, publish date, author
- [x] T095 [US4] Display posts in grid layout with pagination or "Load More" functionality
- [x] T096 [US4] Add generateMetadata for news listing page
- [x] T097 [US4] Add translation keys to `i18n/messages/*.json`: news.title, news.readMore, news.publishedOn, news.by

### Article Detail Page

- [x] T098 [P] [US4] Create `app/(app)/[locale]/news/[slug]/page.tsx` to fetch single post by slug
- [x] T099 [US4] Display article title, content (richText), author, publishedAt with proper richText rendering
- [x] T100 [US4] Display featured image if present using Next.js Image component
- [x] T101 [US4] Add generateMetadata function using post title and excerpt
- [x] T102 [US4] Add breadcrumb navigation: Home > News > [Article Title]

### Featured Articles on Home Page

- [x] T103 [US4] Update `app/(app)/[locale]/page.tsx` to fetch featured posts (where featured: true, limit 3)
- [x] T104 [US4] Display featured articles section on home page using post-card component
- [x] T105 [US4] Add "View All Articles" link to /news page

### Admin Guide

- [x] T106 [US4] Create simple admin guide document explaining how to create/publish posts in Payload CMS (can be internal markdown doc)

### Validation

- [x] T107 [US4] Test: Login to Payload admin at /admin, create new post with title/content in both languages
- [x] T108 [US4] Test: Set post status to "published", verify it appears on /news page
- [x] T109 [US4] Test: Mark post as featured, verify it appears in home page featured section
- [x] T110 [US4] Test: Navigate to article detail page, verify content displays correctly in both languages
- [x] T111 [US4] Test: Upload images via Payload media library, verify they can be reused across posts

**Checkpoint**: At this point, User Stories 1-4 are complete - content management fully functional.

---

## Phase 7: User Story 5 - Search & Product Filtering (Priority: P3)

**Goal**: Improve UX with search functionality for quick product/content discovery

**Independent Test**: Use search function to find product by name, verify matching results appear. Use category filters on /products page to narrow results.

### Site-Wide Search

- [x] T112 [P] [US5] Create `components/search/search-bar.tsx` with input field and search icon (Client Component)
- [x] T113 [US5] Add search bar to Header component
- [x] T114 [US5] Create `app/(app)/[locale]/search/page.tsx` to handle search query parameter
- [x] T115 [US5] Implement search logic to query products and posts collections using Payload SDK (search in name, description, title, content fields)
- [x] T116 [US5] Display search results grouped by type (Products, Articles) with thumbnails
- [x] T117 [US5] Handle empty results with helpful message suggesting browsing categories
- [x] T118 [US5] Add generateMetadata for search results page
- [x] T119 [US5] Add translation keys to `i18n/messages/*.json`: search.title, search.placeholder, search.noResults, search.resultsFor, search.productsSection, search.articlesSection

### Enhanced Product Filtering

- [x] T120 [US5] Enhance `components/product/category-filter.tsx` to support multiple category selection (if not already implemented)
- [x] T121 [US5] Add URL query parameter support for filters to make filtered views shareable

### Validation

- [x] T122 [US5] Test: Search for existing product name, verify it appears in results
- [x] T123 [US5] Test: Search for keyword in article content, verify matching articles appear
- [x] T124 [US5] Test: Search with no matching results, verify helpful message displays
- [x] T125 [US5] Test: Use category filters on products page, verify URL updates and results are correct

**Checkpoint**: At this point, User Stories 1-5 are complete - search and filtering enhance UX.

---

## Phase 8: User Story 6 - SEO Optimization & Performance (Priority: P3)

**Goal**: Ensure proper SEO structure and performance optimization for search ranking and user experience

**Independent Test**: Run Google PageSpeed Insights on all main pages, verify FCP < 3s, performance score > 85 desktop / > 75 mobile, proper meta tags, mobile-friendly.

### SEO Meta Tags

- [ ] T126 [P] [US6] Review all page.tsx files and ensure generateMetadata functions are present with unique titles/descriptions
- [ ] T127 [US6] Verify all generateMetadata functions include alternates.canonical and alternates.languages for bilingual support per research.md Task 5
- [ ] T128 [US6] Add OpenGraph meta tags to generateMetadata functions (title, description, image, locale)
- [ ] T129 [US6] Create `app/(app)/[locale]/robots.txt/route.ts` to serve robots.txt dynamically
- [ ] T130 [US6] Create `app/(app)/[locale]/sitemap.xml/route.ts` to generate sitemap with all pages and products

### Semantic HTML Structure

- [ ] T131 [US6] Review all pages and ensure proper heading hierarchy (H1 -> H2 -> H3, no skipping levels)
- [ ] T132 [US6] Verify all images have alt text (from media library alt field or descriptive text)
- [ ] T133 [US6] Add proper semantic HTML5 elements (<nav>, <main>, <article>, <section>, <footer>)

### Performance Optimization

- [ ] T134 [P] [US6] Review all Next.js Image components and ensure quality={85} and proper sizes prop are set per research.md Task 3
- [ ] T135 [US6] Add loading="lazy" to images below the fold
- [ ] T136 [US6] Verify Server Components are used by default (only Client Components should have 'use client' directive)
- [ ] T137 [US6] Add placeholder image in public/images/placeholder.png for products with no images
- [ ] T138 [US6] Configure next.config.ts to optimize images (formats: ['image/webp', 'image/avif'])

### Mobile Optimization

- [ ] T139 [US6] Test all pages on mobile viewport (375px width), verify responsive layout works
- [ ] T140 [US6] Verify mobile navigation menu (hamburger) functions correctly
- [ ] T141 [US6] Test touch targets are minimum 44x44px for mobile usability

### Performance Validation

- [ ] T142 [US6] Run Lighthouse audit on home page, verify performance > 85 desktop, > 75 mobile, SEO > 90, accessibility > 90
- [ ] T143 [US6] Run Lighthouse audit on /products page, verify same score targets
- [ ] T144 [US6] Run Lighthouse audit on product detail page, verify same score targets
- [ ] T145 [US6] Run Lighthouse audit on /about, /manufacturing, /contact pages, verify same targets
- [ ] T146 [US6] Use PageSpeed Insights to verify First Contentful Paint < 3s per success criteria SC-002
- [ ] T147 [US6] Test mobile-friendliness via Google Mobile-Friendly Test tool per success criteria SC-005

**Checkpoint**: At this point, all user stories are complete and SEO/performance optimized.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple features and project completion

### Data Seeding

- [ ] T148 Create seed script or manual process to populate Payload CMS with initial content:
  - Company info global (name, tagline, vision, mission, values, contact info, logo)
  - Manufacturing global (capacity metrics, certifications, processes, images)
  - 5-10 product categories with Vietnamese and English names
  - 20-30 sample products across categories with descriptions, specifications, images
  - 5-10 sample articles/posts with featured articles for home page

### Error Handling

- [ ] T149 [P] Create `app/(app)/[locale]/error.tsx` for error boundary
- [ ] T150 [P] Create `app/(app)/[locale]/not-found.tsx` for 404 page
- [ ] T151 Add translation keys for error pages in `i18n/messages/*.json`

### Documentation

- [ ] T152 [P] Update README.md with project overview, setup instructions, and deployment guide
- [ ] T153 [P] Document Payload CMS collections and content management workflows

### Final Validation (Quickstart Checklist)

- [x] T154 Verify `pnpm install` runs without errors
- [x] T155 Verify `pnpm lint` passes with only known warning (eslint-disable in payload-generated-schema.ts)
- [x] T156 Verify `pnpm dev` starts server successfully on localhost:3000
- [x] T157 Verify Payload admin accessible at /admin with all collections visible
- [x] T158 Verify all pages accessible: /, /about, /products, /manufacturing, /news, /contact
- [x] T159 Verify language switching works on all pages
- [x] T160 Verify contact form submission creates inquiry in Payload admin
- [x] T161 Verify product category filtering works
- [x] T162 Verify featured products and articles display on home page
- [x] T163 Verify all images are optimized < 200KB (spot check in DevTools)
- [x] T164 Verify all pages have unique meta tags (View Page Source check)
- [x] T165 Verify responsive layouts work on mobile (test at 375px width)
- [x] T166 Verify all pages load within 3 seconds (test on standard broadband)
- [x] T167 Run final Lighthouse audits on all main pages, verify scores meet targets

### Constitution Final Check

- [x] T168 Review all .tsx files and verify no implicit `any` types exist (TypeScript strict mode compliance)
- [x] T169 Verify all localized content fields in collections have `localized: true` set
- [x] T170 Verify all UI text is externalized to i18n/messages files (no hardcoded strings)
- [ ] T171 Verify Server Components used by default, Client Components only where interactivity needed
- [ ] T172 Verify schema generation workflow documented in quickstart.md (already done)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3 - P1)**: Depends on Foundational (Phase 2) - MVP core, should complete first
- **User Story 2 (Phase 4 - P1)**: Depends on Foundational (Phase 2) - MVP core, can start in parallel with US1 if multiple developers
- **User Story 3 (Phase 5 - P2)**: Depends on Foundational (Phase 2) - Can start after Foundational, independently testable
- **User Story 4 (Phase 6 - P2)**: Depends on Foundational (Phase 2) - Can start after Foundational, independently testable
- **User Story 5 (Phase 7 - P3)**: Depends on Foundational + User Stories 1-2 (searches products and posts) - Enhancement, can be deferred
- **User Story 6 (Phase 8 - P3)**: Can start anytime after pages exist - Optimization phase, should be done last
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

**Fully Independent (can start after Phase 2)**:

- User Story 1 (Company Info) - No dependencies on other stories
- User Story 2 (Products) - No dependencies on other stories (featured products on home is optional integration)
- User Story 3 (Manufacturing) - No dependencies on other stories
- User Story 4 (Content Management) - No dependencies on other stories (featured articles on home is optional integration)

**Partial Dependencies**:

- User Story 5 (Search) - Requires User Stories 2 and 4 to have collections to search (Products and Posts)
- User Story 6 (SEO/Performance) - Best done after most pages exist to audit them

### Within Each User Story

**General Pattern**:

1. Install shadcn/ui components (if needed) - can run in parallel
2. Create page files - can run in parallel for different pages
3. Create component files - can run in parallel for different components
4. Add translation keys - can run in parallel with component creation
5. Implement page logic - depends on components being created
6. Test and validate - depends on implementation complete

**User Story 1 Example Order**:

- T040-T043 (shadcn components) in parallel first
- T026-T029, T030-T033, T034-T039 (three pages) can proceed in parallel
- T044-T049 (validation) at the end

**User Story 2 Example Order**:

- T070-T071 (shadcn components) in parallel first
- T050-T057, T058-T063, T064-T066 (three page groups) can proceed in parallel
- T067-T069 (home page integration) after product-card component exists
- T072-T078 (validation) at the end

### Parallel Opportunities

**Phase 2 Foundational - Massive Parallelization**:

- T006-T011 (all 6 collection/global files) can be created in parallel by different developers
- T016-T018 (translation keys) can be done in parallel
- T019-T021 (components) can be done in parallel

**User Stories - Team Strategy**:

- After Phase 2 completes, US1, US2, US3, US4 can ALL start in parallel with different team members
- Each story is independently testable and deployable

**Within User Stories**:

- All tasks marked [P] within a story can run in parallel
- Example US2: T050, T058, T064 (three page files) + T051-T053 (three component files) = 6 parallel tasks

---

## Parallel Example: Foundational Phase (Phase 2)

```text
# Launch all collection creation tasks together:
Task T006: "Create collections/categories.ts"
Task T007: "Create collections/products.ts"
Task T008: "Extend collections/post.ts"
Task T009: "Create collections/contact-inquiries.ts"
Task T010: "Create globals/company-info.ts"
Task T011: "Create globals/manufacturing.ts"

# Then sequentially:
Task T012-T013: Register in payload.config.ts (must wait for files to exist)
Task T014-T015: Generate schemas (must wait for registration)

# In parallel with schema generation:
Task T016-T018: Add translation keys
Task T019-T021: Create header/footer components
Task T022: Create utility functions
```

---

## Parallel Example: User Story 2 (Products)

```text
# Install components first:
Task T070-T071: shadcn components (parallel)

# Then create pages and components in parallel:
Task T050: "Create products listing page"
Task T058: "Create product detail page"
Task T064: "Create category-filtered page"
Task T051: "Create product-card component"
Task T052: "Create product-grid component"
Task T053: "Create category-filter component"

# After components exist:
Task T054-T057: Implement listing page logic
Task T059-T063: Implement detail page logic
Task T067-T069: Add featured products to home page
```

---

## Implementation Strategy

### MVP First (Recommended - User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (5 tasks, ~10 minutes)
2. Complete Phase 2: Foundational (20 tasks, ~2-3 hours with parallelization)
   - **CRITICAL BLOCKER**: Must complete before any page work
3. Complete Phase 3: User Story 1 (24 tasks, ~4-6 hours)
   - Delivers: Company info pages (home, about, contact)
4. Complete Phase 4: User Story 2 (29 tasks, ~6-8 hours)
   - Delivers: Product catalog with categories and detail pages
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently
   - Can now demo functional corporate website with company info and products
   - This is the MVP - sufficient for initial launch
6. Deploy MVP to staging/production if ready

**Total MVP Effort**: ~80 tasks, ~12-17 hours with parallelization

### Incremental Delivery (Full Feature)

1. Complete Setup + Foundational (Phase 1-2) → ~3 hours
2. Add User Story 1 → Test independently → ~4-6 hours (MVP Day 1)
3. Add User Story 2 → Test independently → ~6-8 hours (MVP Day 2)
4. **Deploy MVP** (User Stories 1-2)
5. Add User Story 3 (Manufacturing) → Test independently → ~3-4 hours
6. Add User Story 4 (Content Management) → Test independently → ~4-5 hours
7. **Deploy Phase 2** (P1 + P2 stories complete)
8. Add User Story 5 (Search) → Test independently → ~3-4 hours
9. Add User Story 6 (SEO/Performance) → Test independently → ~4-6 hours
10. Complete Phase 9 (Polish) → ~3-4 hours
11. **Final Deployment** (All stories complete)

**Total Full Feature Effort**: ~172 tasks, ~35-45 hours with parallelization

### Parallel Team Strategy (3 Developers)

**Week 1 - Foundation & MVP**:

- **Everyone together**: Phase 1 (Setup) + Phase 2 (Foundational) → ~3 hours
- **Developer A**: User Story 1 (Company Info) → ~6 hours
- **Developer B**: User Story 2 (Products) → ~8 hours
- **Developer C**: User Story 3 (Manufacturing) → ~4 hours
- **End of Week 1**: MVP ready (US1 + US2), US3 bonus

**Week 2 - P2 Stories & Enhancement**:

- **Developer A**: User Story 4 (Content Management) → ~5 hours
- **Developer B**: User Story 5 (Search) → ~4 hours
- **Developer C**: User Story 6 (SEO/Performance) → ~6 hours
- **Everyone**: Phase 9 (Polish) together → ~4 hours
- **End of Week 2**: Full feature complete, all 6 stories functional

**Total Team Time**: ~2 weeks (40 hours per developer, ~30 hours effective with parallelization)

---

## Notes

- **[P] marker**: Task can run in parallel with other [P] tasks (works on different files, no blocking dependencies)
- **[Story] label**: Maps task to specific user story for traceability (US1-US6)
- **No automated tests**: Specification did not request TDD - all validation is manual browser testing + Lighthouse audits
- **Schema generation is critical**: Tasks T014-T015 MUST run after any collection changes, or TypeScript types will be stale
- **Translation keys**: All user-facing text must have entries in both en.json and vi.json per constitution principle III
- **Image optimization**: All images must use Next.js Image component per constitution principle IV
- **Commit strategy**: Commit after completing each user story phase checkpoint for safe rollback points
- **Checkpoint validation**: Stop at each checkpoint to test story independently before proceeding
- **MVP scope**: User Stories 1 & 2 (Phases 3-4) form the MVP - sufficient for initial launch
- **Avoid**: Skipping schema generation (causes type errors), hardcoded strings (violates i18n), raw <img> tags (violates constitution)
