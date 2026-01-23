# Data Model: Corporate Website

**Feature**: Corporate Website | **Branch**: 001-corporate-website | **Date**: 2026-01-23

## Collections

### 1. Products Collection (`products`)

**Purpose**: Store product information for the company's product catalog

**Fields**:

- `name` (text, localized, required) - Product name
- `slug` (text, unique, indexed, required) - URL-friendly identifier, auto-generated from name
- `description` (richText, localized, required) - Full product description with formatting
- `excerpt` (textarea, localized) - Short summary for listings/previews
- `specifications` (richText, localized) - Technical specifications
- `benefits` (richText, localized) - Product benefits and advantages
- `usageInstructions` (richText, localized) - How to use the product
- `categories` (relationship to categories, hasMany, required) - Product categories (many-to-many)
- `images` (upload, hasMany) - Product photos (multiple images per product)
- `featured` (checkbox, default: false) - Show on home page as featured product
- `bestSeller` (checkbox, default: false) - Highlight as best-selling product
- `status` (select: draft/published/archived, default: draft) - Publication status
- `seoTitle` (text, localized) - Custom SEO title (overrides default)
- `seoDescription` (textarea, localized) - Custom SEO meta description
- `displayOrder` (number, default: 0) - Sort order for featured products on home page
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Many-to-many with Categories collection
- Can be featured on home page (filtered by `featured: true`)

**Validation Rules**:

- `name` required in both vi and en
- `slug` must be unique across all products
- `categories` must have at least one category selected
- If `featured` or `bestSeller` is true, must have at least one image

**Admin UI**:

- Default columns: name, categories, status, featured, bestSeller, updatedAt
- Group: "Content" (both vi and en labels)
- Use name as title field

---

### 2. Categories Collection (`categories`)

**Purpose**: Organize products into browsable categories

**Fields**:

- `name` (text, localized, required) - Category name
- `slug` (text, unique, indexed, required) - URL-friendly identifier
- `description` (textarea, localized) - Category description
- `displayOrder` (number, default: 0) - Sort order for category display
- `status` (select: active/inactive, default: active) - Whether category is visible
- `seoTitle` (text, localized) - Custom SEO title for category page
- `seoDescription` (textarea, localized) - Custom SEO meta description
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Many-to-many with Products collection (inverse relationship)

**Validation Rules**:

- `name` required in both vi and en
- `slug` must be unique across all categories

**Admin UI**:

- Default columns: name, displayOrder, status, updatedAt
- Group: "Content"
- Use name as title field
- Sorted by displayOrder ascending

---

### 3. Posts Collection (`posts`) - EXISTING, EXTEND

**Purpose**: Manage blog posts, news articles, and marketing content

**Existing Fields** (from collections/post.ts):

- `title` (text, localized, required)
- `slug` (text, unique, indexed, required)
- `content` (richText, localized, required)
- `excerpt` (textarea)
- `status` (select: draft/published/archived)
- `publishedAt` (date)
- `author` (text)
- Other metadata fields...

**New Fields to Add**:

- `featured` (checkbox, default: false) - Show on home page
- `displayOrder` (number, default: 0) - Sort order for featured posts
- `seoTitle` (text, localized) - Custom SEO title
- `seoDescription` (textarea, localized) - Custom SEO meta description

**Relationships**:

- Can be featured on home page (filtered by `featured: true`)
- Searchable via site-wide search

---

### 4. Contact Inquiries Collection (`contact-inquiries`)

**Purpose**: Store contact form submissions from website visitors

**Fields**:

- `name` (text, required) - Visitor's full name
- `email` (email, required) - Visitor's email address
- `phone` (text, required) - Visitor's phone number
- `message` (textarea, required) - Inquiry message
- `status` (select: new/in-progress/responded/closed, default: new) - Follow-up status
- `notes` (textarea) - Internal admin notes about the inquiry
- `submittedAt` (date, auto, default: now) - Submission timestamp
- `ipAddress` (text, auto) - Visitor IP for spam prevention (optional)
- `userAgent` (text, auto) - Browser info for analytics (optional)

**Validation Rules**:

- `name` minimum 2 characters
- `email` valid email format
- `phone` minimum 10 characters
- `message` minimum 10 characters

**Admin UI**:

- Default columns: name, email, status, submittedAt
- Group: "Inquiries" (vi: "Yêu cầu", en: "Inquiries")
- Use name as title field
- Sorted by submittedAt descending (newest first)
- Read-only after submission (admins can only update status and notes)

---

## Globals (Singletons)

### 1. Company Info Global (`company-info`)

**Purpose**: Store company-wide information displayed on About page and footer

**Fields**:

- `companyName` (text, localized, required) - Official company name
- `tagline` (text, localized) - Company tagline/slogan
- `overview` (richText, localized, required) - Company overview for home page
- `vision` (richText, localized, required) - Company vision statement
- `mission` (richText, localized, required) - Company mission statement
- `coreValues` (richText, localized, required) - Company core values
- `address` (textarea, localized, required) - Physical address
- `phone` (text, required) - Contact phone number
- `email` (email, required) - Contact email address
- `logo` (upload, required) - Company logo image
- `socialMedia` (group/array) - Social media links (optional)
  - `platform` (select: facebook/linkedin/youtube/twitter)
  - `url` (text, required)

**Admin UI**:

- Group: "Settings" (vi: "Cài đặt", en: "Settings")
- Label: "Company Information" (vi: "Thông tin công ty", en: "Company Information")

---

### 2. Manufacturing Capability Global (`manufacturing`)

**Purpose**: Store manufacturing facility information and capabilities

**Fields**:

- `headline` (text, localized, required) - Section headline
- `description` (richText, localized, required) - Overview of manufacturing capabilities
- `factorySize` (text, localized) - Factory size (e.g., "50,000 sqm")
- `productionCapacity` (text, localized) - Monthly/annual production capacity
- `certifications` (richText, localized) - Quality certifications and standards
- `processes` (richText, localized) - Manufacturing processes description
- `leadTimes` (text, localized) - Typical order lead times
- `images` (upload, hasMany) - Factory photos and process documentation
- `seoTitle` (text, localized) - Custom SEO title
- `seoDescription` (textarea, localized) - Custom SEO meta description

**Admin UI**:

- Group: "Content"
- Label: "Manufacturing Capability" (vi: "Năng lực sản xuất", en: "Manufacturing Capability")

---

## Relationships Diagram

```
┌─────────────────┐
│   Categories    │
└────────┬────────┘
         │
         │ many-to-many
         │
         ▼
┌─────────────────┐
│    Products     │◄─── featured filter for home page
└─────────────────┘

┌─────────────────┐
│      Posts      │◄─── featured filter for home page
└─────────────────┘     searchable

┌─────────────────┐
│ Contact         │
│ Inquiries       │ (independent, stores form submissions)
└─────────────────┘

┌─────────────────┐
│ Company Info    │ (global singleton)
└─────────────────┘

┌─────────────────┐
│ Manufacturing   │ (global singleton)
└─────────────────┘
```

## State Transitions

### Product Status Flow

```
draft → published → archived
  ↑         ↓
  └─────────┘ (can revert published back to draft)
```

### Contact Inquiry Status Flow

```
new → in-progress → responded → closed
```

### Post Status Flow (existing)

```
draft → published → archived
```

## Indexing Strategy

**Required Indexes** (for query performance):

- `products.slug` (unique index) - Product detail page lookups
- `products.featured` (index) - Home page featured products query
- `products.status` (index) - Filter published products
- `categories.slug` (unique index) - Category page lookups
- `categories.displayOrder` (index) - Sorted category listings
- `posts.slug` (unique index) - Article detail page lookups
- `posts.featured` (index) - Home page featured posts query
- `contact-inquiries.status` (index) - Admin filtering by status
- `contact-inquiries.submittedAt` (index) - Chronological sorting

## Data Migration Notes

**Existing Data**:

- `posts` collection already exists with basic structure
- Need to add: `featured`, `displayOrder`, `seoTitle`, `seoDescription` fields
- Run `npx payload generate:db-schema` and `generate:types` after modifications

**New Collections/Globals**:

- All others are new and will be created from scratch
- No data migration required for initial launch
- Seed data for categories and sample products recommended for demo purposes
