import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "../lib/permissions.utils";
import { createSlugHook } from "../lib/slug-utils";

/**
 * Products Collection Configuration
 * Manages company products with multilingual content, categories, and SEO support
 */
export const Products: CollectionConfig = {
  slug: "products",

  // Access control based on granular permissions
  access: createCollectionAccess("products"),

  // Admin configuration
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "categories",
      "status",
      "featured",
      "bestSeller",
      "updatedAt",
    ],
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Product", vi: "Sản phẩm" },
    plural: { en: "Products", vi: "Sản phẩm" },
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

    // Content
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
      admin: {
        description: {
          en: "Full product description with formatting",
          vi: "Mô tả chi tiết sản phẩm có định dạng",
        },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      label: { en: "Excerpt", vi: "Trích đoạn" },
      admin: {
        description: {
          en: "Short summary for listings and previews",
          vi: "Tóm tắt ngắn gọn cho danh sách và xem trước",
        },
      },
    },
    {
      name: "specifications",
      type: "richText",
      localized: true,
      label: { en: "Specifications", vi: "Thông số kỹ thuật" },
      admin: {
        description: {
          en: "Technical specifications and details",
          vi: "Thông số kỹ thuật và chi tiết",
        },
      },
    },
    {
      name: "benefits",
      type: "richText",
      localized: true,
      label: { en: "Benefits", vi: "Lợi ích" },
      admin: {
        description: {
          en: "Product benefits and advantages",
          vi: "Lợi ích và ưu điểm của sản phẩm",
        },
      },
    },
    {
      name: "usageInstructions",
      type: "richText",
      localized: true,
      label: { en: "Usage Instructions", vi: "Hướng dẫn sử dụng" },
      admin: {
        description: {
          en: "How to use the product",
          vi: "Cách sử dụng sản phẩm",
        },
      },
    },

    // Taxonomy
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true,
      label: { en: "Categories", vi: "Danh mục" },
      admin: {
        position: "sidebar",
        description: {
          en: "Select one or more categories for this product",
          vi: "Chọn một hoặc nhiều danh mục cho sản phẩm này",
        },
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
          en: "Product photos (multiple images supported)",
          vi: "Ảnh sản phẩm (hỗ trợ nhiều ảnh)",
        },
      },
    },

    // Display Settings
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Featured Product", vi: "Sản phẩm nổi bật" },
      admin: {
        position: "sidebar",
        description: {
          en: "Show on home page as featured product",
          vi: "Hiển thị trên trang chủ dưới dạng sản phẩm nổi bật",
        },
      },
    },
    {
      name: "bestSeller",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Best Seller", vi: "Bán chạy nhất" },
      admin: {
        position: "sidebar",
        description: {
          en: "Highlight as best-selling product",
          vi: "Đánh dấu là sản phẩm bán chạy nhất",
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
          en: "Sort order for featured products on home page (lower numbers appear first)",
          vi: "Thứ tự sắp xếp cho sản phẩm nổi bật trên trang chủ (số nhỏ hơn hiển thị trước)",
        },
      },
    },

    // Publishing Settings
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: { en: "Draft", vi: "Bản nháp" }, value: "draft" },
        { label: { en: "Published", vi: "Đã xuất bản" }, value: "published" },
        { label: { en: "Archived", vi: "Đã lưu trữ" }, value: "archived" },
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
          en: "Custom title for search engines (overrides product name)",
          vi: "Tiêu đề tùy chỉnh cho công cụ tìm kiếm (ghi đè tên sản phẩm)",
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
