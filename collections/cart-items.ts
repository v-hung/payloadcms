import type { CollectionConfig } from "payload";

/**
 * Cart Items Collection Configuration
 * Manages individual items in shopping carts
 */
export const CartItems: CollectionConfig = {
  slug: "cart-items",

  // Admin configuration
  admin: {
    hidden: true,
  },

  // Collection labels
  labels: {
    singular: { en: "Cart Item", vi: "Sản phẩm trong giỏ" },
    plural: { en: "Cart Items", vi: "Sản phẩm trong giỏ" },
  },

  // Fields definition
  fields: [
    // Cart Reference
    {
      name: "cart",
      type: "relationship",
      relationTo: "carts",
      required: true,
      label: { en: "Cart", vi: "Giỏ hàng" },
    },

    // Product Reference
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      label: { en: "Product", vi: "Sản phẩm" },
    },

    // Quantity
    {
      name: "quantity",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 1,
      label: { en: "Quantity", vi: "Số lượng" },
    },

    // Price at time of adding (snapshot)
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      label: { en: "Price", vi: "Giá" },
      admin: {
        description: {
          en: "Price at time of adding to cart (VND)",
          vi: "Giá tại thời điểm thêm vào giỏ (VND)",
        },
      },
    },

    // Metadata
    {
      name: "addedAt",
      type: "date",
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      label: { en: "Added At", vi: "Thêm vào lúc" },
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
