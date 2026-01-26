import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "../lib/permissions.utils";
import { createSlugHook } from "../lib/slug-utils";

/**
 * Categories Collection Configuration
 * Organizes products into browsable categories with SEO support
 */
export const Categories: CollectionConfig = {
  slug: "categories",

  // Access control based on granular permissions
  access: createCollectionAccess("categories"),

  // Admin configuration
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "displayOrder", "status", "updatedAt"],
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Category", vi: "Danh mục" },
    plural: { en: "Categories", vi: "Danh mục" },
  },

  // Fields definition
  fields: [
    // Basic Information
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Name", vi: "Tên" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: { en: "Slug", vi: "Đường dẫn" },
      admin: {
        position: "sidebar",
        description: {
          en: "URL-friendly identifier. Auto-generated from name if left empty. Type name first to see auto-generated slug.",
          vi: "Định danh URL. Tự động tạo từ tên nếu để trống. Nhập tên trước để xem slug tự động tạo.",
        },
        components: {
          Field: {
            path: "@/components/admin/SlugField",
            clientProps: { sourceField: "name" },
          },
        },
      },
      hooks: {
        beforeValidate: [createSlugHook("name")],
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
      admin: {
        description: {
          en: "Brief description of this category",
          vi: "Mô tả ngắn gọn về danh mục này",
        },
      },
    },

    // Display Settings
    {
      name: "displayOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      label: { en: "Display Order", vi: "Thứ tự hiển thị" },
      admin: {
        position: "sidebar",
        description: {
          en: "Lower numbers appear first",
          vi: "Số nhỏ hơn sẽ hiển thị trước",
        },
      },
    },
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
      },
    },

    // SEO Fields
    {
      name: "seoTitle",
      type: "text",
      localized: true,
      label: { en: "SEO Title", vi: "Tiêu đề SEO" },
      admin: {
        position: "sidebar",
        description: {
          en: "Custom title for search engines",
          vi: "Tiêu đề tùy chỉnh cho công cụ tìm kiếm",
        },
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      localized: true,
      label: { en: "SEO Description", vi: "Mô tả SEO" },
      admin: {
        position: "sidebar",
        description: {
          en: "Meta description for search engines",
          vi: "Mô tả meta cho công cụ tìm kiếm",
        },
      },
    },
  ],

  // Timestamps
  timestamps: true,
};
