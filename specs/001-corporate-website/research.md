# Research: Corporate Website

**Feature**: Corporate Website | **Branch**: 001-corporate-website | **Date**: 2026-01-23

## Phase 0: Research Findings

### Research Task 1: Next.js 16 App Router Best Practices for i18n Corporate Sites

**Decision**: Use existing next-intl 4.7.0 setup with Server Components for all static pages

**Rationale**:

- Project already has next-intl configured with Vietnamese (vi) and English (en) locales
- Next.js 16 async params pattern (`const { locale } = await params;`) is documented in constitution
- Server Components are default and optimal for SEO-heavy corporate pages
- Client Components only needed for interactive elements (contact form, language switcher, category filters)

**Alternatives considered**:

- **i18next**: More complex setup, unnecessary migration from existing next-intl
- **Custom i18n solution**: Would violate "don't reinvent the wheel" principle

### Research Task 2: Payload CMS Collection Structure for Product Catalog with Multiple Categories

**Decision**: Use many-to-many relationship via `relationship` field with `hasMany: true`

**Rationale**:

- Spec clarifies products can belong to multiple categories (Question 2)
- Payload CMS `relationship` field type with `hasMany: true` provides native many-to-many support
- No need for junction tables - Payload handles this in SQLite schema generation
- Admin UI automatically provides multi-select interface for category assignment

**Implementation pattern**:

```typescript
// In collections/products.ts
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
  required: true,
  admin: {
    description: 'Select one or more categories for this product'
  }
}
```

**Alternatives considered**:

- **Single category with tags**: Less flexible, would require two separate systems
- **Manual junction table collection**: Overcomplicates - Payload handles this automatically

### Research Task 3: Optimal Image Optimization Strategy for Product Photos

**Decision**: Use Next.js Image component with automatic optimization + manual resize guidelines

**Rationale**:

- Constitution IV mandates Next.js Image component (not raw `<img>` tags)
- Next.js Image automatically serves WebP/AVIF, responsive sizes, lazy loading
- Target < 200KB per image aligns with constitution performance constraint
- Payload media library stores originals, Next.js optimizes on-demand

**Implementation approach**:

- Admin uploads high-res images (up to 2MB) via Payload media library
- Next.js Image component in frontend automatically generates optimized variants
- Set `quality={85}` for balance between size and visual quality
- Use `sizes` prop to hint responsive breakpoints: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`

**Alternatives considered**:

- **Pre-process all uploads**: Adds complexity, limits future flexibility
- **Use external CDN (Cloudinary)**: Adds cost and external dependency for initial launch

### Research Task 4: Contact Form Validation and Submission Flow

**Decision**: Client-side validation with React Hook Form + Server Action for submission + Payload collection for storage

**Rationale**:

- Spec requires all fields (name, email, phone, message) + email format validation (Question 4)
- React Hook Form provides robust client-side validation with TypeScript support
- Next.js Server Actions provide secure form submission without API routes
- Payload CMS collection stores submissions for admin review in CMS

**Implementation flow**:

1. Contact form component (Client Component) uses React Hook Form with zod schema validation
2. On submit, calls Server Action that validates again server-side
3. Server Action creates record in Payload `contact-inquiries` collection
4. Returns success/error to client
5. Admin views submissions in Payload CMS at `/admin/collections/contact-inquiries`

**Alternatives considered**:

- **Direct API route**: More boilerplate, Server Actions are Next.js 13+ best practice
- **Third-party form service (Formspree)**: Adds external dependency, less control

### Research Task 5: SEO Meta Tag Generation Pattern for Bilingual Dynamic Pages

**Decision**: Use Next.js `generateMetadata` function with Payload data + i18n locale

**Rationale**:

- Constitution requires unique meta tags for each page (FR-015, SC-010)
- Next.js 16 App Router uses `generateMetadata` async function for dynamic meta
- Can fetch Payload data server-side and inject locale-specific titles/descriptions
- Proper `<html lang="vi">` / `<html lang="en">` attribute set per locale

**Implementation pattern**:

```typescript
// In app/(app)/[locale]/products/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getPayload().findOne({
    collection: "products",
    where: { slug: { equals: slug } },
  });

  return {
    title: product.name[locale],
    description:
      product.excerpt?.[locale] ||
      product.description[locale].substring(0, 160),
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        vi: `/vi/products/${slug}`,
        en: `/en/products/${slug}`,
      },
    },
  };
}
```

**Alternatives considered**:

- **react-helmet**: Outdated, not compatible with Next.js App Router
- **Manual `<Head>` tags**: Next.js Metadata API is the correct modern approach

## Summary of Decisions

| Area                          | Decision                                                | Impact                              |
| ----------------------------- | ------------------------------------------------------- | ----------------------------------- |
| i18n                          | Use existing next-intl setup, Server Components default | Extends proven architecture         |
| Product-Category Relationship | Many-to-many via Payload `relationship` field           | Flexible cataloging                 |
| Image Optimization            | Next.js Image component with automatic optimization     | Meets < 200KB constraint            |
| Contact Form                  | React Hook Form + Server Action + Payload collection    | Secure, type-safe, admin-accessible |
| SEO Meta Tags                 | `generateMetadata` function with locale-specific data   | Unique per page, bilingual          |

All decisions align with project constitution and leverage existing infrastructure.
