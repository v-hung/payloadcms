# Payload CMS - Command Reference

## 🚀 Setup

```bash
pnpm install
npx payload generate:db-schema
npx payload generate:types
npm run seed
pnpm dev
```

**Login:** http://localhost:3000/admin  
**Credentials:** admin@admin.com / Admin@123

---

## 📝 Sau Khi Sửa Collections

```bash
# Chạy 2 lệnh này (theo thứ tự)
npx payload generate:db-schema
npx payload generate:types

# Nếu sửa admin UI components
npx payload generate:importmap
```

---

## 🗄️ Migration

```bash
# Tạo migration mới
npx payload migrate:create <tên-migration>

# Chạy migrations
npx payload migrate

# Xem status
npx payload migrate:status

# Rollback
npx payload migrate:down
```

---

## 🔄 Reset Database

```bash
# Xóa database
Remove-Item data/sqlite.db -ErrorAction SilentlyContinue

# Tạo lại từ đầu
npx payload generate:db-schema
npm run seed
pnpm dev
```

---

## 🛠️ Development

```bash
pnpm dev        # Start dev
pnpm build      # Build production
pnpm lint       # Check lỗi code
```

---

## 📦 Thêm Collection Mới

**1. Tạo file:** `collections/ten-collection.ts`

**2. Import vào:** `payload.config.ts`

**3. Chạy:**

```bash
npx payload generate:db-schema
npx payload generate:types
```

---

## 🔐 Thêm Permission Mới

**1. Sửa:** `lib/permissions.config.ts`

- Thêm vào `PERMISSION_COLLECTIONS`
- Thêm vào `ROLE_PERMISSIONS_CONFIG`

**2. Apply vào collection:**

```typescript
import { createCollectionAccess } from "../lib/permissions.utils";

access: createCollectionAccess("collection-slug"),
```

**3. Chạy:**

```bash
npx payload generate:db-schema
npx payload generate:types
npm run seed
```

---

## 🔍 Debug

```bash
# Xem database
sqlite3 data/sqlite.db
.tables
SELECT * FROM admins;
SELECT * FROM roles;
```

---

**Files quan trọng:**

- `payload.config.ts` - Main config
- `collections/` - Collection definitions
- `lib/permissions.config.ts` - Permissions (single source)
- `scripts/seed.ts` - Seed data
- `.env` - PAYLOAD_SECRET, DATABASE_URL
