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

### 4. Pages Collection (`pages`)

**Purpose**: Manage static pages with multilingual content support

**Fields**:

- `title` (text, localized, required) - Page title
- `slug` (text, unique, indexed, required) - URL-friendly identifier, auto-generated from title
- `content` (richText, localized, required) - Full page content with formatting
- `excerpt` (textarea, localized) - Short summary for previews
- `status` (select: draft/published/archived, default: draft) - Publication status
- `publishedAt` (date) - Publication date
- `featured` (checkbox, default: false) - Show on home page as featured page
- `displayOrder` (number, default: 0) - Sort order for featured pages
- `featuredImage` (upload) - Page featured image
- `seoTitle` (text, localized) - Custom SEO title (overrides default)
- `seoDescription` (textarea, localized) - Custom SEO meta description
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Can be featured on home page (filtered by `featured: true`)

**Validation Rules**:

- `title` required in both vi and en
- `slug` must be unique across all pages
- `content` required in both vi and en

**Admin UI**:

- Default columns: title, slug, status, updatedAt
- Group: "Content" (vi: "Nội dung", en: "Content")
- Use title as title field

---

### 5. Showcases Collection (`showcases`)

**Purpose**: Manage showcase items (projects, case studies, achievements, partnerships, awards)

**Fields**:

- `title` (text, localized, required) - Showcase title
- `slug` (text, unique, indexed, required) - URL-friendly identifier, auto-generated from title
- `description` (richText, localized, required) - Full showcase description with formatting
- `excerpt` (textarea, localized) - Short summary for previews
- `category` (select: project/case-study/achievement/partnership/award/other, required) - Showcase category
- `images` (upload, hasMany) - Showcase images (multiple images per showcase)
- `status` (select: draft/published/archived, default: draft) - Publication status
- `featured` (checkbox, default: false) - Show on home page as featured showcase
- `displayOrder` (number, default: 0) - Sort order for display
- `client` (text, localized) - Client or partner name (if applicable)
- `date` (date) - Project/achievement date
- `location` (text, localized) - Project/event location (if applicable)
- `seoTitle` (text, localized) - Custom SEO title (overrides default)
- `seoDescription` (textarea, localized) - Custom SEO meta description
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Can be featured on home page (filtered by `featured: true`)

**Validation Rules**:

- `title` required in both vi and en
- `slug` must be unique across all showcases
- `description` required in both vi and en
- `category` required

**Admin UI**:

- Default columns: title, category, featured, status, updatedAt
- Group: "Content" (vi: "Nội dung", en: "Content")
- Use title as title field

---

### 6. Contact Inquiries Collection (`contact-inquiries`)

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

## E-commerce Collections

### 7. Product Variants Collection (`product-variants`)

**Purpose**: Manage product variants (size, color, material, etc.)

**Fields**:

- `product` (relationship to products, required) - Product reference
- `name` (text, localized, required) - Variant name (e.g., "Red - Large")
- `sku` (text, unique, indexed, required) - Stock Keeping Unit
- `options` (group) - Variant options:
  - `color` (text, localized) - Color
  - `size` (select: xs/s/m/l/xl/xxl/xxxl) - Size
  - `material` (text, localized) - Material
  - `weight` (number) - Weight in grams
  - `dimensions` (group) - Length, width, height in cm
- `price` (number, required, min: 0) - Price in VND
- `compareAtPrice` (number, min: 0) - Original price before discount
- `stock` (number, required, default: 0, min: 0) - Stock quantity
- `lowStockThreshold` (number, default: 10, min: 0) - Low stock alert threshold
- `images` (upload, hasMany) - Variant-specific images
- `status` (select: active/inactive/out-of-stock, default: active) - Status
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Many-to-one with Products collection

**Admin UI**:

- Default columns: name, product, sku, price, stock, status
- Group: "E-commerce" (vi: "Thương mại điện tử", en: "E-commerce")
- Use name as title field

---

### 8. Carts Collection (`carts`)

**Purpose**: Manage shopping carts for users and guests

**Fields**:

- `user` (relationship to users) - User who owns this cart (null for guests)
- `sessionId` (text, indexed) - Session ID for guest carts
- `itemsCount` (number, default: 0, min: 0) - Total number of items
- `subtotal` (number, default: 0, min: 0) - Subtotal before discounts (VND)
- `discount` (number, default: 0, min: 0) - Total discount amount (VND)
- `total` (number, default: 0, min: 0) - Total amount (VND)
- `couponCode` (text) - Applied coupon code
- `status` (select: active/abandoned/converted/expired, default: active) - Cart status
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp
- `expiresAt` (date) - Cart expiration date (typically 30 days)

**Relationships**:

- One-to-many with CartItems collection
- Many-to-one with Users collection (optional)

**Admin UI**:

- Default columns: user, status, itemsCount, total, updatedAt
- Group: "E-commerce"
- Use id as title field

---

### 9. Cart Items Collection (`cart-items`)

**Purpose**: Manage individual items in shopping carts

**Fields**:

- `cart` (relationship to carts, required) - Cart reference
- `product` (relationship to products, required) - Product reference
- `variant` (relationship to product-variants) - Product variant (optional)
- `quantity` (number, required, default: 1, min: 1) - Quantity
- `price` (number, required, min: 0) - Price at time of adding (VND)
- `addedAt` (date, auto) - Timestamp when added to cart

**Relationships**:

- Many-to-one with Carts collection
- Many-to-one with Products collection
- Many-to-one with ProductVariants collection (optional)

**Admin UI**:

- Default columns: cart, product, variant, quantity, price
- Group: "E-commerce"
- Use id as title field

---

### 10. Orders Collection (`orders`)

**Purpose**: Manage customer orders with order tracking

**Fields**:

- `orderNumber` (text, unique, indexed, required) - Unique order identifier
- `user` (relationship to users) - Customer reference (null for guest orders)
- `guestCustomer` (group) - Guest customer info: email, name, phone
- `shippingAddress` (group, required) - Full name, phone, address, ward, district, city, postal code
- `billingAddress` (group) - Same as shipping or separate address
- `itemsCount` (number, default: 0, min: 0) - Total number of items
- `subtotal` (number, required, min: 0) - Sum before discounts and shipping (VND)
- `discount` (number, default: 0, min: 0) - Total discount (VND)
- `shippingFee` (number, default: 0, min: 0) - Shipping cost (VND)
- `tax` (number, default: 0, min: 0) - Tax/VAT amount (VND)
- `total` (number, required, min: 0) - Final total amount (VND)
- `couponCode` (text) - Applied coupon code
- `paymentMethod` (select: cod/bank-transfer/credit-card/e-wallet, required) - Payment method
- `paymentStatus` (select: pending/paid/failed/refunded, default: pending) - Payment status
- `transactionId` (text) - Payment gateway transaction ID
- `shippingMethod` (select: standard/express/same-day, required) - Shipping method
- `trackingNumber` (text) - Shipping tracking number
- `status` (select: pending/confirmed/processing/shipping/delivered/completed/cancelled/refunded, default: pending) - Order status
- `customerNotes` (textarea) - Notes from customer
- `adminNotes` (textarea) - Internal admin notes
- `createdAt` (date, auto) - Order creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp
- `confirmedAt` (date) - Confirmation timestamp
- `shippedAt` (date) - Shipping timestamp
- `deliveredAt` (date) - Delivery timestamp

**Relationships**:

- One-to-many with OrderItems collection
- Many-to-one with Users collection (optional)

**Admin UI**:

- Default columns: orderNumber, user, status, total, paymentStatus, createdAt
- Group: "E-commerce"
- Use orderNumber as title field

---

### 11. Order Items Collection (`order-items`)

**Purpose**: Manage individual items in orders (with product snapshots)

**Fields**:

- `order` (relationship to orders, required) - Order reference
- `product` (relationship to products, required) - Product reference
- `productSnapshot` (group) - Product details at time of order: name, sku, image
- `variant` (relationship to product-variants) - Product variant (optional)
- `variantSnapshot` (group) - Variant details at time of order: name, sku, options
- `quantity` (number, required, min: 1) - Quantity
- `price` (number, required, min: 0) - Unit price at time of order (VND)
- `subtotal` (number, required, min: 0) - Quantity × Unit Price (VND)
- `discount` (number, default: 0, min: 0) - Discount for this item (VND)
- `total` (number, required, min: 0) - Subtotal - Discount (VND)
- `createdAt` (date, auto) - Creation timestamp

**Relationships**:

- Many-to-one with Orders collection
- Many-to-one with Products collection
- Many-to-one with ProductVariants collection (optional)

**Admin UI**:

- Default columns: order, product, variant, quantity, price
- Group: "E-commerce"
- Use id as title field

---

### 12. Product Reviews Collection (`product-reviews`)

**Purpose**: Manage customer reviews and ratings for products

**Fields**:

- `product` (relationship to products, required) - Product reference
- `user` (relationship to users) - User reference (null for guest reviews)
- `guestName` (text) - Name for guest reviews
- `guestEmail` (email) - Email for guest reviews (not displayed publicly)
- `order` (relationship to orders) - Order reference for verified purchase badge
- `rating` (number, required, min: 1, max: 5) - Rating from 1 to 5 stars
- `title` (text, required) - Review title (short summary)
- `content` (textarea, required) - Detailed review text
- `images` (upload, hasMany) - Customer photos of the product
- `pros` (textarea) - Positive aspects
- `cons` (textarea) - Negative aspects
- `helpfulCount` (number, default: 0, min: 0) - Number of helpful votes
- `notHelpfulCount` (number, default: 0, min: 0) - Number of not helpful votes
- `adminResponse` (group) - Admin response: content, respondedBy, respondedAt
- `status` (select: pending/approved/rejected/spam, default: pending) - Review status
- `flagged` (checkbox, default: false) - Review flagged by users
- `flagReason` (select: spam/inappropriate/fake/other) - Reason for flag
- `createdAt` (date, auto) - Creation timestamp
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Many-to-one with Products collection
- Many-to-one with Users collection (optional)
- Many-to-one with Orders collection (optional, for verified purchase)

**Admin UI**:

- Default columns: product, user, rating, status, createdAt
- Group: "E-commerce"
- Use id as title field

---

### 13. Wishlists Collection (`wishlists`)

**Purpose**: Manage user wishlists (saved products for later)

**Fields**:

- `user` (relationship to users, required) - User reference
- `product` (relationship to products, required) - Product reference
- `variant` (relationship to product-variants) - Specific variant (optional)
- `notes` (textarea) - Personal notes about this product
- `priority` (select: low/medium/high, default: medium) - Priority level
- `notifyOnPriceChange` (checkbox, default: false) - Send notification when price drops
- `notifyOnBackInStock` (checkbox, default: false) - Send notification when available again
- `createdAt` (date, auto) - Timestamp when added to wishlist
- `updatedAt` (date, auto) - Last modified timestamp

**Relationships**:

- Many-to-one with Users collection
- Many-to-one with Products collection
- Many-to-one with ProductVariants collection (optional)

**Indexes**:

- Unique index on (user, product) combination

**Admin UI**:

- Default columns: user, product, createdAt
- Group: "E-commerce"
- Use id as title field

---

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

## Relationships Diagram

```
┌─────────────────┐
│   Categories    │
└────────┬────────┘
         │
         │ many-to-many
         │
         ▼
┌─────────────────┐         ┌──────────────────┐
│    Products     │◄────────┤ Product Variants │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         │ featured filter           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│   Cart Items    │         │   Order Items    │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│     Carts       │         │     Orders       │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         └───────────┬───────────────┘
                     │
                     ▼
              ┌─────────────┐
              │    Users    │
              └──────┬──────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│  Wishlists   │ │ Product  │ │   Orders     │
│              │ │ Reviews  │ │  (customer)  │
└──────────────┘ └──────────┘ └──────────────┘

┌─────────────────┐
│      Posts      │◄─── featured filter for home page
└─────────────────┘     searchable

┌─────────────────┐
│      Pages      │◄─── featured filter for home page
└─────────────────┘

┌─────────────────┐
│   Showcases     │◄─── featured filter for home page
└─────────────────┘     category-based filtering

┌─────────────────┐
│ Contact         │
│ Inquiries       │ (independent, stores form submissions)
└─────────────────┘

┌─────────────────┐
│ Company Info    │ (global singleton)
└─────────────────┘
```

## State Transitions

### Product Status Flow

```
draft → published → archived
  ↑         ↓
  └─────────┘ (can revert published back to draft)
```

### Cart Status Flow

```
active → abandoned
  │          │
  │          ▼
  │      expired
  ▼
converted (becomes order)
```

### Order Status Flow

```
pending → confirmed → processing → shipping → delivered → completed
  │                                                            │
  └─────────────────► cancelled ◄────────────────────────────┘
                          │
                          ▼
                      refunded
```

### Review Status Flow

```
pending → approved
  │          │
  │          ▼
  │       (published)
  ▼
rejected / spam
```

### Contact Inquiry Status Flow

```
new → in-progress → responded → closed
```

### Post Status Flow

```
draft → published → archived
```

### Page Status Flow

```
draft → published → archived
  ↑         ↓
  └─────────┘ (can revert published back to draft)
```

### Showcase Status Flow

```
draft → published → archived
  ↑         ↓
  └─────────┘ (can revert published back to draft)
```

## Indexing Strategy

**Required Indexes** (for query performance):

**Content Collections**:

- `products.slug` (unique index) - Product detail page lookups
- `products.featured` (index) - Home page featured products query
- `products.status` (index) - Filter published products
- `categories.slug` (unique index) - Category page lookups
- `categories.displayOrder` (index) - Sorted category listings
- `posts.slug` (unique index) - Article detail page lookups
- `posts.featured` (index) - Home page featured posts query
- `pages.slug` (unique index) - Page detail lookups
- `pages.featured` (index) - Home page featured pages query
- `showcases.slug` (unique index) - Showcase detail page lookups
- `showcases.featured` (index) - Home page featured showcases query
- `showcases.category` (index) - Filter showcases by category
- `contact-inquiries.status` (index) - Admin filtering by status
- `contact-inquiries.submittedAt` (index) - Chronological sorting

**E-commerce Collections**:

- `product-variants.sku` (unique index) - Variant lookups
- `product-variants.product` (index) - Get variants for a product
- `product-variants.status` (index) - Filter active variants
- `carts.user` (index) - Get user's cart
- `carts.sessionId` (index) - Get guest cart by session
- `carts.status` (index) - Filter abandoned/active carts
- `cart-items.cart` (index) - Get items for a cart
- `orders.orderNumber` (unique index) - Order lookups
- `orders.user` (index) - Get user's orders
- `orders.status` (index) - Filter orders by status
- `orders.paymentStatus` (index) - Filter by payment status
- `orders.createdAt` (index) - Chronological sorting
- `order-items.order` (index) - Get items for an order
- `product-reviews.product` (index) - Get reviews for a product
- `product-reviews.user` (index) - Get user's reviews
- `product-reviews.status` (index) - Filter approved reviews
- `wishlists.user` (index) - Get user's wishlist
- `wishlists.user + product` (unique composite index) - Prevent duplicates

## Data Migration Notes

**Existing Data**:

- `posts` collection already exists with basic structure
- Need to add: `featured`, `displayOrder`, `seoTitle`, `seoDescription` fields
- Run `npx payload generate:db-schema` and `generate:types` after modifications

**New Collections**:

- `pages` collection - New, will be created from scratch
- `showcases` collection - New, will be created from scratch
- `product-variants` collection - New, extends products with variants
- `carts` collection - New, for shopping cart functionality
- `cart-items` collection - New, line items in carts
- `orders` collection - New, for order management
- `order-items` collection - New, line items in orders
- `product-reviews` collection - New, for customer reviews
- `wishlists` collection - New, for user wishlists

**Removed**:

- `manufacturing` global - REMOVED (no longer needed)

**Notes**:

- No data migration required for initial launch
- Seed data recommended for categories, sample products, and product variants
- E-commerce collections start empty and populate through user actions
