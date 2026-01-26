/**
 * Centralized Permissions Configuration
 */
export const PERMISSION_COLLECTIONS = [
  {
    slug: "posts",
    labels: {
      en: "Posts",
      vi: "Bài viết",
    },
  },
  {
    slug: "products",
    labels: {
      en: "Products",
      vi: "Sản phẩm",
    },
  },
  {
    slug: "categories",
    labels: {
      en: "Categories",
      vi: "Danh mục",
    },
  },
  {
    slug: "media",
    labels: {
      en: "Media",
      vi: "Phương tiện",
    },
  },
] as const;

/**
 * Available actions
 */
export const PERMISSION_ACTIONS = [
  {
    slug: "view",
    labels: {
      en: "View",
      vi: "Xem",
    },
  },
  {
    slug: "create",
    labels: {
      en: "Create",
      vi: "Tạo mới",
    },
  },
  {
    slug: "update",
    labels: {
      en: "Update",
      vi: "Cập nhật",
    },
  },
  {
    slug: "delete",
    labels: {
      en: "Delete",
      vi: "Xóa",
    },
  },
] as const;

/**
 * Define default roles and permissions
 * Format: { [role]: { [collection]: { [action]: boolean } } }
 */
export const ROLE_PERMISSIONS_CONFIG = {
  "super-admin": {
    // Super admin has full permissions, but still defined for clarity
    posts: { view: true, create: true, update: true, delete: true },
    products: { view: true, create: true, update: true, delete: true },
    categories: { view: true, create: true, update: true, delete: true },
    media: { view: true, create: true, update: true, delete: true },
  },
  admin: {
    posts: { view: true, create: true, update: true, delete: true },
    products: { view: true, create: true, update: true, delete: true },
    categories: { view: true, create: true, update: true, delete: false },
    media: { view: true, create: true, update: true, delete: true },
  },
  editor: {
    posts: { view: true, create: true, update: true, delete: false },
    products: { view: true, create: true, update: true, delete: false },
    categories: { view: true, create: false, update: false, delete: false },
    media: { view: true, create: true, update: true, delete: false },
  },
  viewer: {
    posts: { view: true, create: false, update: false, delete: false },
    products: { view: true, create: false, update: false, delete: false },
    categories: { view: true, create: false, update: false, delete: false },
    media: { view: true, create: false, update: false, delete: false },
  },
} as const;

/**
 * Type helpers - Auto-generated from config
 */
export type PermissionCollection =
  (typeof PERMISSION_COLLECTIONS)[number]["slug"];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number]["slug"];
export type RoleName = keyof typeof ROLE_PERMISSIONS_CONFIG;
