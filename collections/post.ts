import { payloadTranslations } from "@/i18n/payload_translations";
import type { CollectionConfig } from "payload";

const t = payloadTranslations;

export const Posts: CollectionConfig = {
  slug: "posts",

  // Admin configuration
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status", "publishedAt", "updatedAt"],
    group: {
      en: t.en.navigation.content,
      vi: t.vi.navigation.content,
    },
  },

  // Labels for the collection
  labels: {
    singular: {
      en: t.en.collections.posts.singular,
      vi: t.vi.collections.posts.singular,
    },
    plural: {
      en: t.en.collections.posts.plural,
      vi: t.vi.collections.posts.plural,
    },
  },

  // Fields definition
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: {
        en: t.en.collections.posts.labels.title,
        vi: t.vi.collections.posts.labels.title,
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: {
        en: t.en.collections.posts.labels.slug,
        vi: t.vi.collections.posts.labels.slug,
      },
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
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
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      label: {
        en: t.en.collections.posts.labels.content,
        vi: t.vi.collections.posts.labels.content,
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: {
            en: "Draft",
            vi: "Bản nháp",
          },
          value: "draft",
        },
        {
          label: {
            en: "Published",
            vi: "Đã xuất bản",
          },
          value: "published",
        },
        {
          label: {
            en: "Archived",
            vi: "Đã lưu trữ",
          },
          value: "archived",
        },
      ],
      label: {
        en: t.en.collections.posts.labels.status,
        vi: t.vi.collections.posts.labels.status,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: {
        en: t.en.collections.posts.labels.publishedAt,
        vi: t.vi.collections.posts.labels.publishedAt,
      },
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
      label: {
        en: t.en.collections.posts.labels.author,
        vi: t.vi.collections.posts.labels.author,
      },
      admin: {
        position: "sidebar",
      },
    },

    // {
    //   name: "category",
    //   type: "relationship",
    //   relationTo: "categories",
    //   hasMany: false,
    //   label: {
    //     en: t.en.collections.posts.labels.category,
    //     vi: t.vi.collections.posts.labels.category,
    //   },
    //   admin: {
    //     position: "sidebar",
    //   },
    // },
    // {
    //   name: "tags",
    //   type: "relationship",
    //   relationTo: "tags",
    //   hasMany: true,
    //   label: {
    //     en: t.en.collections.posts.labels.tags,
    //     vi: t.vi.collections.posts.labels.tags,
    //   },
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
