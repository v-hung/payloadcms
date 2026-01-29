import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "@/lib/permissions/utils";
import { createSlugHook } from "../lib/utils/slug";

/**
 * Posts Collection Configuration
 * Manages blog posts and articles with multilingual content support
 */
export const Posts: CollectionConfig = {
  slug: "posts",

  // Access control based on granular permissions
  access: createCollectionAccess("posts"),

  // Admin configuration
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status", "publishedAt", "updatedAt"],
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Post", vi: "Bài viết" },
    plural: { en: "Posts", vi: "Bài viết" },
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
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Content", vi: "Nội dung" },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: { en: "Excerpt", vi: "Trích đoạn" },
      admin: {
        description: {
          en: "Short description for preview",
          vi: "Mô tả ngắn để hiển thị preview",
        },
      },
    },

    {
      name: "publishedAt",
      type: "date",
      label: { en: "Published Date", vi: "Ngày xuất bản" },
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "admins",
      required: true,
      label: { en: "Author", vi: "Tác giả" },
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: "sidebar",
        description: {
          en: "Defaults to current user",
          vi: "Mặc định là người dùng hiện tại",
        },
      },
    },

    // Featured Settings
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Featured Post", vi: "Bài viết nổi bật" },
      admin: {
        position: "sidebar",
        description: {
          en: "Show on home page as featured post",
          vi: "Hiển thị trên trang chủ dưới dạng bài viết nổi bật",
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
          en: "Sort order for featured posts on home page (lower numbers appear first)",
          vi: "Thứ tự sắp xếp cho bài viết nổi bật trên trang chủ (số nhỏ hơn hiển thị trước)",
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
          en: "Custom title for search engines (overrides post title)",
          vi: "Tiêu đề tùy chỉnh cho công cụ tìm kiếm (ghi đè tiêu đề bài viết)",
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

    // Featured Image
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: { en: "Featured Image", vi: "Ảnh đại diện" },
      admin: {
        position: "sidebar",
      },
    },

    // Taxonomy (commented out - add categories/tags collections first)
    // {
    //   name: "category",
    //   type: "relationship",
    //   relationTo: "categories",
    //   label: { en: "Category", vi: "Danh mục" },
    //   admin: {
    //     position: "sidebar",
    //   },
    // },
    // {
    //   name: "tags",
    //   type: "relationship",
    //   relationTo: "tags",
    //   hasMany: true,
    //   label: { en: "Tags", vi: "Thẻ" },
    //   admin: {
    //     position: "sidebar",
    //   },
    // },
  ],

  // Timestamps
  timestamps: true,

  // Versions
  versions: {
    drafts: true,
  },
};
