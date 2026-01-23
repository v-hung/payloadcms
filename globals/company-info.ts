import type { GlobalConfig } from "payload";

/**
 * Company Info Global Configuration
 * Stores company-wide information displayed on About page, footer, and throughout the site
 */
export const CompanyInfo: GlobalConfig = {
  slug: "company-info",

  // Admin configuration
  admin: {
    group: {
      en: "Settings",
      vi: "Cài đặt",
    },
  },

  // Global labels
  label: {
    en: "Company Information",
    vi: "Thông tin công ty",
  },

  // Fields definition
  fields: [
    // Basic Information
    {
      name: "companyName",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Company Name", vi: "Tên công ty" },
      admin: {
        description: {
          en: "Official company name",
          vi: "Tên chính thức của công ty",
        },
      },
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      label: { en: "Tagline", vi: "Khẩu hiệu" },
      admin: {
        description: {
          en: "Company tagline or slogan",
          vi: "Khẩu hiệu hoặc slogan công ty",
        },
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: { en: "Company Logo", vi: "Logo công ty" },
      admin: {
        description: {
          en: "Company logo image (SVG or PNG recommended)",
          vi: "Hình ảnh logo công ty (khuyên dùng SVG hoặc PNG)",
        },
      },
    },

    // Company Overview
    {
      name: "overview",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Company Overview", vi: "Tổng quan công ty" },
      admin: {
        description: {
          en: "Brief company overview for home page",
          vi: "Tổng quan ngắn gọn về công ty cho trang chủ",
        },
      },
    },

    // Mission, Vision, Values
    {
      name: "vision",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Vision", vi: "Tầm nhìn" },
      admin: {
        description: {
          en: "Company vision statement",
          vi: "Tuyên bố tầm nhìn của công ty",
        },
      },
    },
    {
      name: "mission",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Mission", vi: "Sứ mệnh" },
      admin: {
        description: {
          en: "Company mission statement",
          vi: "Tuyên bố sứ mệnh của công ty",
        },
      },
    },
    {
      name: "coreValues",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Core Values", vi: "Giá trị cốt lõi" },
      admin: {
        description: {
          en: "Company core values",
          vi: "Giá trị cốt lõi của công ty",
        },
      },
    },

    // Contact Information
    {
      name: "address",
      type: "textarea",
      required: true,
      localized: true,
      label: { en: "Address", vi: "Địa chỉ" },
      admin: {
        description: {
          en: "Physical company address",
          vi: "Địa chỉ trụ sở công ty",
        },
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: { en: "Phone", vi: "Số điện thoại" },
      admin: {
        description: {
          en: "Contact phone number",
          vi: "Số điện thoại liên hệ",
        },
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: { en: "Email", vi: "Email" },
      admin: {
        description: {
          en: "Contact email address",
          vi: "Địa chỉ email liên hệ",
        },
      },
    },

    // Social Media
    {
      name: "socialMedia",
      type: "array",
      label: { en: "Social Media", vi: "Mạng xã hội" },
      admin: {
        description: {
          en: "Social media links (optional)",
          vi: "Liên kết mạng xã hội (tùy chọn)",
        },
      },
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "YouTube", value: "youtube" },
            { label: "Twitter", value: "twitter" },
          ],
          label: { en: "Platform", vi: "Nền tảng" },
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: { en: "URL", vi: "Đường dẫn" },
          admin: {
            placeholder: "https://...",
          },
        },
      ],
    },
  ],
};
