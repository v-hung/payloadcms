import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "@/lib/permissions/utils";
import { createSlugHook } from "../lib/utils/slug";

/**
 * Showcases Collection Configuration
 * Manages showcase items with multilingual content support
 */
export const Showcases: CollectionConfig = {
  slug: "showcases",

  // Access control based on granular permissions
  access: createCollectionAccess("showcases"),

  // Admin configuration
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "status", "updatedAt"],
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Showcase", vi: "Trưng bày" },
    plural: { en: "Showcases", vi: "Trưng bày" },
  },

  // Fields definition
  fields: [
    // Basic Information
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Title", vi: "Tiêu đề" },
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
          en: "URL-friendly identifier. Auto-generated from title if left empty. Type title first to see auto-generated slug.",
          vi: "Định danh URL. Tự động tạo từ tiêu đề nếu để trống. Nhập tiêu đề trước để xem slug tự động tạo.",
        },
        components: {
          Field: {
            path: "@/components/admin/SlugField",
            clientProps: { sourceField: "title" },
          },
        },
      },
      hooks: {
        beforeValidate: [createSlugHook("title")],
      },
    },

    // Content
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      label: { en: "Excerpt", vi: "Trích đoạn" },
      admin: {
        description: {
          en: "Short description for preview",
          vi: "Mô tả ngắn để hiển thị preview",
        },
      },
    },

    // Category
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: { en: "Project", vi: "Dự án" }, value: "project" },
        {
          label: { en: "Case Study", vi: "Nghiên cứu tình huống" },
          value: "case-study",
        },
        { label: { en: "Achievement", vi: "Thành tựu" }, value: "achievement" },
        { label: { en: "Partnership", vi: "Đối tác" }, value: "partnership" },
        { label: { en: "Award", vi: "Giải thưởng" }, value: "award" },
        { label: { en: "Other", vi: "Khác" }, value: "other" },
      ],
      label: { en: "Category", vi: "Danh mục" },
      admin: {
        position: "sidebar",
      },
    },

    // Media
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: { en: "Images", vi: "Hình ảnh" },
      admin: {
        description: {
          en: "Showcase images (multiple images supported)",
          vi: "Hình ảnh trưng bày (hỗ trợ nhiều hình ảnh)",
        },
      },
    },

    // Featured Settings
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Featured Showcase", vi: "Trưng bày nổi bật" },
      admin: {
        position: "sidebar",
        description: {
          en: "Show on home page as featured showcase",
          vi: "Hiển thị trên trang chủ dưới dạng trưng bày nổi bật",
        },
      },
    },
    {
      name: "displayOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      label: { en: "Display Order", vi: "Thứ tự hiển thị" },
      admin: {
        position: "sidebar",
        description: {
          en: "Sort order for display (lower numbers appear first)",
          vi: "Thứ tự sắp xếp để hiển thị (số nhỏ hơn hiển thị trước)",
        },
      },
    },

    // Additional Information
    {
      name: "client",
      type: "text",
      localized: true,
      label: { en: "Client/Partner", vi: "Khách hàng/Đối tác" },
      admin: {
        description: {
          en: "Client or partner name (if applicable)",
          vi: "Tên khách hàng hoặc đối tác (nếu có)",
        },
      },
    },
    {
      name: "date",
      type: "date",
      label: { en: "Date", vi: "Ngày" },
      admin: {
        description: {
          en: "Project/achievement date",
          vi: "Ngày dự án/thành tựu",
        },
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "location",
      type: "text",
      localized: true,
      label: { en: "Location", vi: "Địa điểm" },
      admin: {
        description: {
          en: "Project/event location (if applicable)",
          vi: "Địa điểm dự án/sự kiện (nếu có)",
        },
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
          en: "Custom title for search engines (overrides showcase title)",
          vi: "Tiêu đề tùy chỉnh cho công cụ tìm kiếm (ghi đè tiêu đề trưng bày)",
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

  // Versions
  versions: {
    drafts: true,
  },
};
