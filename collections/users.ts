import { createCollectionAccess } from "@/lib/permissions/utils";
import type { CollectionConfig } from "payload";

/**
 * Users Collection Configuration
 * Manages regular users (customers) with authentication
 * Separate from Admin collection for different permission levels
 */
export const Users: CollectionConfig = {
  slug: "users",

  // Admin configuration
  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "email",
      "name",
      "phone",
      "status",
      "verified",
      "createdAt",
    ],
    group: {
      en: "User Management",
      vi: "Quản lý người dùng",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "User", vi: "Người dùng" },
    plural: { en: "Users", vi: "Người dùng" },
  },

  // Access control
  access: createCollectionAccess("users"),

  // Fields definition
  fields: [
    // User Information
    {
      name: "name",
      type: "text",
      required: true,
      label: { en: "Full Name", vi: "Họ và tên" },
    },
    {
      name: "email",
      type: "text",
      required: true,
      label: { en: "Email", vi: "Email" },
    },

    // Contact Information
    {
      name: "phone",
      type: "text",
      label: { en: "Phone Number", vi: "Số điện thoại" },
      admin: {
        description: {
          en: "Contact phone number",
          vi: "Số điện thoại liên hệ",
        },
      },
    },

    {
      name: "address",
      type: "textarea",
      label: { en: "Address", vi: "Địa chỉ" },
      admin: {
        description: {
          en: "Full address",
          vi: "Địa chỉ đầy đủ",
        },
      },
    },

    // Status
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: { en: "Active", vi: "Hoạt động" }, value: "active" },
        { label: { en: "Inactive", vi: "Không hoạt động" }, value: "inactive" },
        { label: { en: "Suspended", vi: "Đã khóa" }, value: "suspended" },
      ],
      label: { en: "Status", vi: "Trạng thái" },
      admin: {
        position: "sidebar",
        description: {
          en: "Account status",
          vi: "Trạng thái tài khoản",
        },
      },
    },

    // Verification Status
    {
      name: "verified",
      type: "checkbox",
      defaultValue: false,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      label: { en: "Email Verified", vi: "Đã xác thực email" },
    },

    // Last Login
    {
      name: "lastLogin",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
        date: {
          displayFormat: "dd/MM/yyyy HH:mm",
        },
      },
      label: { en: "Last Login", vi: "Đăng nhập lần cuối" },
    },

    // Newsletter subscription
    {
      name: "newsletter",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Subscribe to Newsletter", vi: "Đăng ký nhận tin" },
      admin: {
        position: "sidebar",
        description: {
          en: "Receive product updates and news",
          vi: "Nhận thông tin sản phẩm và tin tức",
        },
      },
    },

    // User preferences
    {
      name: "preferences",
      type: "group",
      label: { en: "Preferences", vi: "Tùy chọn" },
      fields: [
        {
          name: "language",
          type: "select",
          defaultValue: "vi",
          options: [
            { label: { en: "Vietnamese", vi: "Tiếng Việt" }, value: "vi" },
            { label: { en: "English", vi: "Tiếng Anh" }, value: "en" },
          ],
          label: { en: "Preferred Language", vi: "Ngôn ngữ ưa thích" },
        },
      ],
    },
  ],

  // Timestamps
  timestamps: true,
};
