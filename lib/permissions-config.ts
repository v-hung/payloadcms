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
  {
    slug: "users",
    labels: {
      en: "Users",
      vi: "Người dùng",
    },
  },
  {
    slug: "pages",
    labels: {
      en: "Pages",
      vi: "Trang",
    },
  },
  {
    slug: "showcases",
    labels: {
      en: "Showcases",
      vi: "Trưng bày",
    },
  },
  {
    slug: "carts",
    labels: {
      en: "Carts",
      vi: "Giỏ hàng",
    },
  },
  {
    slug: "orders",
    labels: {
      en: "Orders",
      vi: "Đơn hàng",
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
 * Type helpers - Khai báo trước để sử dụng cho cấu trúc object
 */
export type PermissionCollection =
  (typeof PERMISSION_COLLECTIONS)[number]["slug"];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number]["slug"];

// Định nghĩa cấu trúc cho từng Collection: { view: boolean, create: boolean, ... }
export type CollectionPermissions = {
  [K in PermissionAction]: boolean;
};

// Định nghĩa cấu trúc cho từng Role: Phải có ĐỦ các collection trong PermissionCollection
export type RolePermissionStructure = {
  [K in PermissionCollection]: CollectionPermissions;
};

/**
 * Define default roles and permissions
 * Sử dụng Record<string, RolePermissionStructure> hoặc định nghĩa Role cụ thể
 */
export const ROLE_PERMISSIONS_CONFIG = {
  "super-admin": {
    posts: { view: true, create: true, update: true, delete: true },
    products: { view: true, create: true, update: true, delete: true },
    categories: { view: true, create: true, update: true, delete: true },
    media: { view: true, create: true, update: true, delete: true },
    users: { view: true, create: true, update: true, delete: true },
    pages: { view: true, create: true, update: true, delete: true },
    showcases: { view: true, create: true, update: true, delete: true },
    carts: { view: true, create: true, update: true, delete: true },
    orders: { view: true, create: true, update: true, delete: true },
  },
  admin: {
    // Nếu thiếu bất kỳ collection nào (ví dụ thiếu 'pages'), TypeScript sẽ báo lỗi ngay tại đây
    posts: { view: true, create: true, update: true, delete: true },
    products: { view: true, create: true, update: true, delete: true },
    categories: { view: true, create: true, update: true, delete: false },
    media: { view: true, create: true, update: true, delete: true },
    users: { view: true, create: true, update: true, delete: false },
    pages: { view: true, create: true, update: true, delete: false },
    showcases: { view: true, create: true, update: true, delete: false },
    carts: { view: true, create: true, update: true, delete: false },
    orders: { view: true, create: true, update: true, delete: false },
  },
  editor: {
    posts: { view: true, create: true, update: true, delete: false },
    products: { view: true, create: true, update: true, delete: false },
    categories: { view: true, create: false, update: false, delete: false },
    media: { view: true, create: true, update: true, delete: false },
    users: { view: true, create: false, update: false, delete: false },
    pages: { view: true, create: true, update: true, delete: false },
    showcases: { view: true, create: true, update: true, delete: false },
    carts: { view: false, create: false, update: false, delete: false },
    orders: { view: true, create: false, update: false, delete: false },
  },
  viewer: {
    posts: { view: true, create: false, update: false, delete: false },
    products: { view: true, create: false, update: false, delete: false },
    categories: { view: true, create: false, update: false, delete: false },
    media: { view: true, create: false, update: false, delete: false },
    users: { view: false, create: false, update: false, delete: false },
    pages: { view: true, create: false, update: false, delete: false },
    showcases: { view: true, create: false, update: false, delete: false },
    carts: { view: false, create: false, update: false, delete: false },
    orders: { view: false, create: false, update: false, delete: false },
  },
} satisfies Record<string, RolePermissionStructure>;

// Type cho tên Role dựa trên dữ liệu thực tế
export type RoleName = keyof typeof ROLE_PERMISSIONS_CONFIG;
