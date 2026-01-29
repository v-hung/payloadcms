import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "@/lib/permissions/utils";

/**
 * Carts Collection Configuration
 * Manages shopping carts for users and guests
 */
export const Carts: CollectionConfig = {
  slug: "carts",

  // Access control based on granular permissions
  access: createCollectionAccess("carts"),

  // Admin configuration
  admin: {
    useAsTitle: "id",
    defaultColumns: ["user", "status", "itemsCount", "total", "updatedAt"],
    group: {
      en: "E-commerce",
      vi: "Thương mại điện tử",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Cart", vi: "Giỏ hàng" },
    plural: { en: "Carts", vi: "Giỏ hàng" },
  },

  // Fields definition
  fields: [
    // User Reference (optional for guest carts)
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      label: { en: "User", vi: "Người dùng" },
      admin: {
        description: {
          en: "User who owns this cart (null for guest carts)",
          vi: "Người dùng sở hữu giỏ hàng này (null cho khách)",
        },
      },
    },

    // Guest Session ID
    {
      name: "sessionId",
      type: "text",
      index: true,
      label: { en: "Session ID", vi: "ID phiên" },
      admin: {
        description: {
          en: "Session ID for guest carts",
          vi: "ID phiên cho giỏ hàng khách",
        },
      },
    },

    // Cart Items (will be queried from cart-items collection)
    {
      name: "itemsCount",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Items Count", vi: "Số lượng sản phẩm" },
      admin: {
        description: {
          en: "Total number of items in cart",
          vi: "Tổng số sản phẩm trong giỏ",
        },
      },
    },

    // Totals
    {
      name: "subtotal",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Subtotal", vi: "Tạm tính" },
      admin: {
        description: {
          en: "Subtotal before discounts and shipping (VND)",
          vi: "Tạm tính trước giảm giá và phí ship (VND)",
        },
      },
    },
    {
      name: "discount",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Discount", vi: "Giảm giá" },
      admin: {
        description: {
          en: "Total discount amount (VND)",
          vi: "Tổng số tiền giảm giá (VND)",
        },
      },
    },
    {
      name: "total",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Total", vi: "Tổng cộng" },
      admin: {
        description: {
          en: "Total amount (VND)",
          vi: "Tổng số tiền (VND)",
        },
      },
    },

    // Coupon/Promo Code
    {
      name: "couponCode",
      type: "text",
      label: { en: "Coupon Code", vi: "Mã giảm giá" },
      admin: {
        description: {
          en: "Applied coupon code",
          vi: "Mã giảm giá đã áp dụng",
        },
      },
    },

    // Status
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: { en: "Active", vi: "Đang hoạt động" }, value: "active" },
        {
          label: { en: "Abandoned", vi: "Đã bỏ rơi" },
          value: "abandoned",
        },
        {
          label: { en: "Converted", vi: "Đã chuyển đổi" },
          value: "converted",
        },
        { label: { en: "Expired", vi: "Đã hết hạn" }, value: "expired" },
      ],
      label: { en: "Status", vi: "Trạng thái" },
      admin: {
        position: "sidebar",
      },
    },

    // Timestamps
    {
      name: "createdAt",
      type: "date",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      label: { en: "Created At", vi: "Ngày tạo" },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "create" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "updatedAt",
      type: "date",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      label: { en: "Updated At", vi: "Ngày cập nhật" },
      hooks: {
        beforeChange: [
          () => {
            return new Date();
          },
        ],
      },
    },
    {
      name: "expiresAt",
      type: "date",
      label: { en: "Expires At", vi: "Hết hạn lúc" },
      admin: {
        description: {
          en: "Cart expiration date (typically 30 days)",
          vi: "Ngày hết hạn giỏ hàng (thường là 30 ngày)",
        },
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
