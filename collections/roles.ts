import type { CollectionConfig } from "payload";
import { generatePermissionFields } from "../lib/permissions-fields";

/**
 * Roles Collection Configuration
 * Quản lý vai trò và permissions - tất cả trong 1 collection duy nhất
 */
export const Roles: CollectionConfig = {
  slug: "roles",

  // Admin configuration
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "description", "isSystem", "updatedAt"],
    group: {
      en: "Administration",
      vi: "Quản trị",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Role", vi: "Vai trò" },
    plural: { en: "Roles", vi: "Vai trò" },
  },

  // Access control - chỉ super admin
  access: {
    create: async ({ req: { user } }) => {
      if (!user) return false;
      // user.role đã populated từ defaultPopulate
      const role = typeof user.role === "object" ? user.role : null;
      return role?.slug === "super-admin";
    },
    read: ({ req: { user } }) => !!user,
    update: async ({ req: { user } }) => {
      if (!user) return false;
      const role = typeof user.role === "object" ? user.role : null;
      return role?.slug === "super-admin";
    },
    delete: async ({ req: { user } }) => {
      if (!user) return false;
      const role = typeof user.role === "object" ? user.role : null;
      return role?.slug === "super-admin";
    },
  },

  // Fields definition
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Role Name", vi: "Tên vai trò" },
      admin: {
        description: {
          en: "Display name of the role",
          vi: "Tên hiển thị của vai trò",
        },
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: { en: "Slug", vi: "Mã định danh" },
      admin: {
        description: {
          en: "Unique identifier for the role (lowercase, no spaces)",
          vi: "Mã định danh duy nhất cho vai trò (chữ thường, không dấu cách)",
        },
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              const nameValue =
                typeof data.name === "object"
                  ? data.name.en || data.name.vi
                  : data.name;
              return nameValue
                ?.toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-")
                .trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
      admin: {
        description: {
          en: "Brief description of this role's purpose",
          vi: "Mô tả ngắn gọn về mục đích của vai trò này",
        },
      },
    },
    {
      name: "isSystem",
      type: "checkbox",
      defaultValue: false,
      label: { en: "System Role", vi: "Vai trò hệ thống" },
      admin: {
        position: "sidebar",
        description: {
          en: "System roles cannot be deleted",
          vi: "Vai trò hệ thống không thể xóa",
        },
        readOnly: true,
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      label: { en: "Display Order", vi: "Thứ tự hiển thị" },
      admin: {
        position: "sidebar",
        description: {
          en: "Order in role selection dropdown",
          vi: "Thứ tự trong dropdown chọn vai trò",
        },
      },
    },

    // Permissions - Group fields cho từng collection
    {
      name: "permissions",
      type: "group",
      label: { en: "Permissions", vi: "Phân quyền" },
      admin: {
        description: {
          en: "Define what this role can do in each collection",
          vi: "Định nghĩa vai trò này có thể làm gì trong từng collection",
        },
      },
      fields: generatePermissionFields(),
    },
  ],

  // Timestamps
  timestamps: true,

  // Hooks
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        // Không cho xóa system roles
        const role = await req.payload.findByID({
          collection: "roles",
          id,
        });

        if (role.isSystem) {
          throw new Error("Cannot delete system role");
        }

        // Check xem có users đang dùng role này không
        const usersWithRole = await req.payload.find({
          collection: "admins",
          where: {
            role: {
              equals: id,
            },
          },
          limit: 1,
        });

        if (usersWithRole.docs.length > 0) {
          throw new Error(
            "Cannot delete role: There are users assigned to this role",
          );
        }
      },
    ],
  },
};
