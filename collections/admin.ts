import type { CollectionConfig } from "payload";

/**
 * Admin Collection Configuration
 * Manages administrative users with authentication
 * Permissions được xác định bởi role, không lưu trong user record
 */
export const Admin: CollectionConfig = {
  slug: "admins",

  // Enable authentication
  auth: true,

  defaultPopulate: {
    role: true,
  },

  // Admin configuration
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "updatedAt"],
    group: {
      en: "Administration",
      vi: "Quản trị",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Admin", vi: "Quản trị viên" },
    plural: { en: "Admins", vi: "Quản trị viên" },
  },

  // Access control
  access: {
    // Only admins can create other admins
    create: ({ req: { user } }) => !!user,
    // Only admins can read admin list
    read: ({ req: { user } }) => !!user,
    // Admins can only update themselves unless they're super admin
    update: ({ req: { user } }) => {
      if (!user) return false;

      // Get populated role (từ defaultPopulate)
      const role = typeof user.role === "object" ? user.role : null;

      // Super admin can update anyone
      if (role?.slug === "super-admin") return true;

      // Regular admin can only update themselves
      return {
        id: {
          equals: user.id,
        },
      };
    },
    // Only super admin can delete
    delete: ({ req: { user } }) => {
      if (!user) return false;

      // Get populated role (từ defaultPopulate)
      const role = typeof user.role === "object" ? user.role : null;

      return role?.slug === "super-admin";
    },
  },

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
      name: "role",
      type: "relationship",
      relationTo: "roles",
      required: true,
      label: { en: "Role", vi: "Vai trò" },
      admin: {
        position: "sidebar",
        description: {
          en: "User role determines permissions automatically",
          vi: "Vai trò người dùng tự động xác định quyền hạn",
        },
      },
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

    // Status
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: { en: "Active", vi: "Hoạt động" }, value: "active" },
        { label: { en: "Inactive", vi: "Không hoạt động" }, value: "inactive" },
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
  ],

  // Timestamps
  timestamps: true,

  // Hooks
  hooks: {
    beforeLogin: [
      async ({ user }) => {
        // Update last login timestamp
        if (user) {
          user.lastLogin = new Date();
        }
        return user;
      },
    ],
  },
};
