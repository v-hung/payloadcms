import type { CollectionConfig } from "payload";

/**
 * Wishlists Collection Configuration
 * Manages user wishlists (saved products for later)
 */
export const Wishlists: CollectionConfig = {
  slug: "wishlists",

  // Admin configuration
  admin: {
    hidden: true,
  },

  // Collection labels
  labels: {
    singular: { en: "Wishlist Item", vi: "Sản phẩm yêu thích" },
    plural: { en: "Wishlist Items", vi: "Sản phẩm yêu thích" },
  },

  // Fields definition
  fields: [
    // User Reference
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: { en: "User", vi: "Người dùng" },
      admin: {
        description: {
          en: "User who saved this product",
          vi: "Người dùng đã lưu sản phẩm này",
        },
      },
    },

    // Product Reference
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      label: { en: "Product", vi: "Sản phẩm" },
      admin: {
        description: {
          en: "Product saved to wishlist",
          vi: "Sản phẩm được lưu vào danh sách yêu thích",
        },
      },
    },

    // Notes
    {
      name: "notes",
      type: "textarea",
      label: { en: "Notes", vi: "Ghi chú" },
      admin: {
        description: {
          en: "Personal notes about this product",
          vi: "Ghi chú cá nhân về sản phẩm này",
        },
      },
    },

    // Priority
    {
      name: "priority",
      type: "select",
      defaultValue: "medium",
      options: [
        { label: { en: "Low", vi: "Thấp" }, value: "low" },
        { label: { en: "Medium", vi: "Trung bình" }, value: "medium" },
        { label: { en: "High", vi: "Cao" }, value: "high" },
      ],
      label: { en: "Priority", vi: "Độ ưu tiên" },
      admin: {
        description: {
          en: "How much the user wants this product",
          vi: "Mức độ người dùng muốn sản phẩm này",
        },
      },
    },

    // Notifications
    {
      name: "notifyOnPriceChange",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: "Notify on Price Change",
        vi: "Thông báo khi giá thay đổi",
      },
      admin: {
        description: {
          en: "Send notification when product price drops",
          vi: "Gửi thông báo khi giá sản phẩm giảm",
        },
      },
    },
    {
      name: "notifyOnBackInStock",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: "Notify when Back in Stock",
        vi: "Thông báo khi có hàng trở lại",
      },
      admin: {
        description: {
          en: "Send notification when out-of-stock product is available again",
          vi: "Gửi thông báo khi sản phẩm hết hàng có sẵn trở lại",
        },
      },
    },

    // Timestamps
    {
      name: "createdAt",
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
    {
      name: "updatedAt",
      type: "date",
      admin: {
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
  ],
};
