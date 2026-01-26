import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "../lib/permissions.utils";

/**
 * Media Collection Configuration
 * Handles file uploads for images and documents
 */
export const Media: CollectionConfig = {
  slug: "media",

  // Access control based on granular permissions
  access: {
    ...createCollectionAccess("media"),
    // Public read access for frontend
    read: () => true,
  },

  // Admin configuration
  admin: {
    group: {
      en: "Content",
      vi: "Nội dung",
    },
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },

  // Collection labels
  labels: {
    singular: { en: "Media", vi: "Phương tiện" },
    plural: { en: "Media", vi: "Phương tiện" },
  },

  // Enable uploads
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "center",
      },
      {
        name: "card",
        width: 640,
        height: 480,
        position: "center",
      },
      {
        name: "featured",
        width: 1200,
        height: 630,
        position: "center",
      },
    ],
  },

  // Fields definition
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      label: { en: "Alt Text", vi: "Văn bản thay thế" },
      admin: {
        description: {
          en: "Describe the image for accessibility and SEO",
          vi: "Mô tả hình ảnh cho khả năng tiếp cận và SEO",
        },
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      label: { en: "Caption", vi: "Chú thích" },
      admin: {
        description: {
          en: "Optional caption displayed with the image",
          vi: "Chú thích tùy chọn hiển thị cùng hình ảnh",
        },
      },
    },
  ],
};
