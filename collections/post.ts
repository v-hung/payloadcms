import type { CollectionConfig } from "payload";

/**
 * Posts Collection Configuration
 * Manages blog posts and articles with multilingual content support
 */
export const Posts: CollectionConfig = {
  slug: "posts",

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
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              // Auto-generate slug from title
              return data.title
                .toLowerCase()
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
      relationTo: "users",
      required: true,
      label: { en: "Author", vi: "Tác giả" },
      admin: {
        position: "sidebar",
      },
    },

    // Featured Image (optional, add if needed)
    // {
    //   name: "featuredImage",
    //   type: "upload",
    //   relationTo: "media",
    //   label: { en: "Featured Image", vi: "Ảnh đại diện" },
    //   admin: {
    //     position: "sidebar",
    //   },
    // },

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
