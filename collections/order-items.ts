import type { CollectionConfig } from "payload";

/**
 * Order Items Collection Configuration
 * Manages individual items in orders
 */
export const OrderItems: CollectionConfig = {
  slug: "order-items",

  // Admin configuration
  admin: {
    hidden: true,
  },

  // Collection labels
  labels: {
    singular: { en: "Order Item", vi: "Sản phẩm trong đơn" },
    plural: { en: "Order Items", vi: "Sản phẩm trong đơn" },
  },

  // Fields definition
  fields: [
    // Order Reference
    {
      name: "order",
      type: "relationship",
      relationTo: "orders",
      required: true,
      label: { en: "Order", vi: "Đơn hàng" },
    },

    // Product Reference
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      label: { en: "Product", vi: "Sản phẩm" },
    },

    // Product Snapshot (at time of order)
    {
      name: "productSnapshot",
      type: "group",
      label: { en: "Product Snapshot", vi: "Ảnh chụp sản phẩm" },
      admin: {
        description: {
          en: "Product details at time of order",
          vi: "Chi tiết sản phẩm tại thời điểm đặt hàng",
        },
      },
      fields: [
        {
          name: "name",
          type: "text",
          localized: true,
          label: { en: "Product Name", vi: "Tên sản phẩm" },
        },
        {
          name: "sku",
          type: "text",
          label: { en: "SKU", vi: "Mã SKU" },
        },
        {
          name: "image",
          type: "text",
          label: { en: "Image URL", vi: "URL hình ảnh" },
        },
      ],
    },

    // Quantity
    {
      name: "quantity",
      type: "number",
      required: true,
      min: 1,
      label: { en: "Quantity", vi: "Số lượng" },
    },

    // Pricing (snapshot at time of order)
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      label: { en: "Unit Price", vi: "Đơn giá" },
      admin: {
        description: {
          en: "Price per unit at time of order (VND)",
          vi: "Giá mỗi đơn vị tại thời điểm đặt hàng (VND)",
        },
      },
    },
    {
      name: "subtotal",
      type: "number",
      required: true,
      min: 0,
      label: { en: "Subtotal", vi: "Tạm tính" },
      admin: {
        description: {
          en: "Quantity × Unit Price (VND)",
          vi: "Số lượng × Đơn giá (VND)",
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
          en: "Discount applied to this item (VND)",
          vi: "Giảm giá áp dụng cho sản phẩm này (VND)",
        },
      },
    },
    {
      name: "total",
      type: "number",
      required: true,
      min: 0,
      label: { en: "Total", vi: "Tổng cộng" },
      admin: {
        description: {
          en: "Subtotal - Discount (VND)",
          vi: "Tạm tính - Giảm giá (VND)",
        },
      },
    },

    // Metadata
    {
      name: "createdAt",
      type: "date",
      admin: {
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
  ],
};
