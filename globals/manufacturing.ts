import type { GlobalConfig } from "payload";

/**
 * Manufacturing Capability Global Configuration
 * Stores manufacturing facility information and capabilities
 */
export const Manufacturing: GlobalConfig = {
  slug: "manufacturing",

  // Admin configuration
  admin: {
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Global labels
  label: {
    en: "Manufacturing Capability",
    vi: "Năng lực sản xuất",
  },

  // Fields definition
  fields: [
    // Basic Information
    {
      name: "headline",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Headline", vi: "Tiêu đề" },
      admin: {
        description: {
          en: "Section headline for manufacturing page",
          vi: "Tiêu đề phần cho trang sản xuất",
        },
      },
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
      admin: {
        description: {
          en: "Overview of manufacturing capabilities",
          vi: "Tổng quan về năng lực sản xuất",
        },
      },
    },

    // Capacity Metrics
    {
      name: "factorySize",
      type: "text",
      localized: true,
      label: { en: "Factory Size", vi: "Quy mô nhà máy" },
      admin: {
        description: {
          en: 'Factory size (e.g., "50,000 sqm")',
          vi: 'Quy mô nhà máy (ví dụ: "50.000 m²")',
        },
        placeholder: {
          en: "50,000 sqm",
          vi: "50.000 m²",
        },
      },
    },
    {
      name: "productionCapacity",
      type: "text",
      localized: true,
      label: { en: "Production Capacity", vi: "Công suất sản xuất" },
      admin: {
        description: {
          en: "Monthly or annual production capacity",
          vi: "Công suất sản xuất hàng tháng hoặc hàng năm",
        },
        placeholder: {
          en: "10,000 units/month",
          vi: "10.000 đơn vị/tháng",
        },
      },
    },
    {
      name: "leadTimes",
      type: "text",
      localized: true,
      label: { en: "Lead Times", vi: "Thời gian giao hàng" },
      admin: {
        description: {
          en: "Typical order lead times",
          vi: "Thời gian giao hàng thông thường",
        },
        placeholder: {
          en: "2-4 weeks",
          vi: "2-4 tuần",
        },
      },
    },

    // Quality & Processes
    {
      name: "certifications",
      type: "richText",
      localized: true,
      label: { en: "Certifications", vi: "Chứng nhận" },
      admin: {
        description: {
          en: "Quality certifications and standards",
          vi: "Chứng nhận chất lượng và tiêu chuẩn",
        },
      },
    },
    {
      name: "processes",
      type: "richText",
      localized: true,
      label: { en: "Manufacturing Processes", vi: "Quy trình sản xuất" },
      admin: {
        description: {
          en: "Description of manufacturing processes",
          vi: "Mô tả quy trình sản xuất",
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
          en: "Factory photos and process documentation",
          vi: "Ảnh nhà máy và tài liệu quy trình",
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
        description: {
          en: "Meta description for search engines",
          vi: "Mô tả meta cho công cụ tìm kiếm",
        },
      },
    },
  ],
};
