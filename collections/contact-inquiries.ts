import type { CollectionConfig } from "payload";

/**
 * Contact Inquiries Collection Configuration
 * Stores contact form submissions from website visitors
 */
export const ContactInquiries: CollectionConfig = {
  slug: "contact-inquiries",

  // Admin configuration
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "submittedAt"],
    group: {
      en: "Inquiries",
      vi: "Yêu cầu",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Contact Inquiry", vi: "Yêu cầu liên hệ" },
    plural: { en: "Contact Inquiries", vi: "Yêu cầu liên hệ" },
  },

  // Fields definition
  fields: [
    // Visitor Information
    {
      name: "name",
      type: "text",
      required: true,
      minLength: 2,
      label: { en: "Name", vi: "Tên" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: { en: "Email", vi: "Email" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      minLength: 10,
      label: { en: "Phone", vi: "Số điện thoại" },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: { en: "Message", vi: "Tin nhắn" },
      admin: {
        readOnly: true,
      },
      validate: (value) => {
        if (value && value.length < 10) {
          return "Message must be at least 10 characters long";
        }
        return true;
      },
    },

    // Admin Management
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: { en: "New", vi: "Mới" }, value: "new" },
        {
          label: { en: "In Progress", vi: "Đang xử lý" },
          value: "in-progress",
        },
        { label: { en: "Responded", vi: "Đã phản hồi" }, value: "responded" },
        { label: { en: "Closed", vi: "Đã đóng" }, value: "closed" },
      ],
      label: { en: "Status", vi: "Trạng thái" },
      admin: {
        position: "sidebar",
        description: {
          en: "Follow-up status (editable by admin)",
          vi: "Trạng thái theo dõi (admin có thể chỉnh sửa)",
        },
      },
    },
    {
      name: "notes",
      type: "textarea",
      label: { en: "Admin Notes", vi: "Ghi chú của admin" },
      admin: {
        description: {
          en: "Internal notes about this inquiry (not visible to visitor)",
          vi: "Ghi chú nội bộ về yêu cầu này (không hiển thị cho người gửi)",
        },
      },
    },

    // Metadata
    {
      name: "submittedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date(),
      label: { en: "Submitted At", vi: "Thời gian gửi" },
      admin: {
        position: "sidebar",
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "ipAddress",
      type: "text",
      label: { en: "IP Address", vi: "Địa chỉ IP" },
      admin: {
        position: "sidebar",
        readOnly: true,
        description: {
          en: "Visitor IP for spam prevention",
          vi: "IP của người gửi để phòng chống spam",
        },
      },
    },
    {
      name: "userAgent",
      type: "text",
      label: { en: "User Agent", vi: "User Agent" },
      admin: {
        position: "sidebar",
        readOnly: true,
        description: {
          en: "Browser information for analytics",
          vi: "Thông tin trình duyệt để phân tích",
        },
      },
    },
  ],

  // Timestamps
  timestamps: true,
};
