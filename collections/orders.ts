import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "../lib/permissions-utils";

/**
 * Orders Collection Configuration
 * Manages customer orders with order tracking
 */
export const Orders: CollectionConfig = {
  slug: "orders",

  // Access control based on granular permissions
  access: createCollectionAccess("orders"),

  // Admin configuration
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: [
      "orderNumber",
      "user",
      "status",
      "total",
      "paymentStatus",
      "createdAt",
    ],
    group: {
      en: "E-commerce",
      vi: "Thương mại điện tử",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Order", vi: "Đơn hàng" },
    plural: { en: "Orders", vi: "Đơn hàng" },
  },

  // Fields definition
  fields: [
    // Order Number
    {
      name: "orderNumber",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: { en: "Order Number", vi: "Mã đơn hàng" },
      admin: {
        description: {
          en: "Unique order identifier (e.g., ORD-2024-00001)",
          vi: "Mã đơn hàng duy nhất (ví dụ: ORD-2024-00001)",
        },
      },
    },

    // Customer Reference
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      label: { en: "Customer", vi: "Khách hàng" },
      admin: {
        description: {
          en: "Customer who placed the order (null for guest orders)",
          vi: "Khách hàng đặt hàng (null cho đơn khách)",
        },
      },
    },

    // Guest Customer Info
    {
      name: "guestCustomer",
      type: "group",
      label: { en: "Guest Customer", vi: "Khách vãng lai" },
      admin: {
        description: {
          en: "Customer information for guest orders",
          vi: "Thông tin khách hàng cho đơn khách vãng lai",
        },
      },
      fields: [
        {
          name: "email",
          type: "email",
          label: { en: "Email", vi: "Email" },
        },
        {
          name: "name",
          type: "text",
          label: { en: "Full Name", vi: "Họ và tên" },
        },
        {
          name: "phone",
          type: "text",
          label: { en: "Phone", vi: "Số điện thoại" },
        },
      ],
    },

    // Shipping Address
    {
      name: "shippingAddress",
      type: "group",
      label: { en: "Shipping Address", vi: "Địa chỉ giao hàng" },
      fields: [
        {
          name: "fullName",
          type: "text",
          required: true,
          label: { en: "Full Name", vi: "Họ và tên" },
        },
        {
          name: "phone",
          type: "text",
          required: true,
          label: { en: "Phone", vi: "Số điện thoại" },
        },
        {
          name: "address",
          type: "textarea",
          required: true,
          label: { en: "Address", vi: "Địa chỉ" },
        },
        {
          name: "ward",
          type: "text",
          label: { en: "Ward", vi: "Phường/Xã" },
        },
        {
          name: "district",
          type: "text",
          required: true,
          label: { en: "District", vi: "Quận/Huyện" },
        },
        {
          name: "city",
          type: "text",
          required: true,
          label: { en: "City/Province", vi: "Tỉnh/Thành phố" },
        },
        {
          name: "postalCode",
          type: "text",
          label: { en: "Postal Code", vi: "Mã bưu điện" },
        },
      ],
    },

    // Billing Address (optional, can be same as shipping)
    {
      name: "billingAddress",
      type: "group",
      label: { en: "Billing Address", vi: "Địa chỉ thanh toán" },
      fields: [
        {
          name: "sameAsShipping",
          type: "checkbox",
          defaultValue: true,
          label: {
            en: "Same as Shipping Address",
            vi: "Giống địa chỉ giao hàng",
          },
        },
        {
          name: "fullName",
          type: "text",
          label: { en: "Full Name", vi: "Họ và tên" },
        },
        {
          name: "phone",
          type: "text",
          label: { en: "Phone", vi: "Số điện thoại" },
        },
        {
          name: "address",
          type: "textarea",
          label: { en: "Address", vi: "Địa chỉ" },
        },
        {
          name: "ward",
          type: "text",
          label: { en: "Ward", vi: "Phường/Xã" },
        },
        {
          name: "district",
          type: "text",
          label: { en: "District", vi: "Quận/Huyện" },
        },
        {
          name: "city",
          type: "text",
          label: { en: "City/Province", vi: "Tỉnh/Thành phố" },
        },
        {
          name: "postalCode",
          type: "text",
          label: { en: "Postal Code", vi: "Mã bưu điện" },
        },
      ],
    },

    // Order Items (will be queried from order-items collection)
    {
      name: "itemsCount",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Items Count", vi: "Số lượng sản phẩm" },
    },

    // Order Totals
    {
      name: "subtotal",
      type: "number",
      required: true,
      min: 0,
      label: { en: "Subtotal", vi: "Tạm tính" },
      admin: {
        description: {
          en: "Sum of all items before discounts and shipping (VND)",
          vi: "Tổng sản phẩm trước giảm giá và phí ship (VND)",
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
      name: "shippingFee",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Shipping Fee", vi: "Phí vận chuyển" },
      admin: {
        description: {
          en: "Shipping cost (VND)",
          vi: "Chi phí vận chuyển (VND)",
        },
      },
    },
    {
      name: "tax",
      type: "number",
      defaultValue: 0,
      min: 0,
      label: { en: "Tax (VAT)", vi: "Thuế (VAT)" },
      admin: {
        description: {
          en: "Tax amount (VND)",
          vi: "Số tiền thuế (VND)",
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
          en: "Final total amount (VND)",
          vi: "Tổng số tiền cuối cùng (VND)",
        },
      },
    },

    // Coupon/Promo Code
    {
      name: "couponCode",
      type: "text",
      label: { en: "Coupon Code", vi: "Mã giảm giá" },
    },

    // Payment Information
    {
      name: "paymentMethod",
      type: "select",
      required: true,
      options: [
        { label: { en: "COD", vi: "COD" }, value: "cod" },
        {
          label: { en: "Bank Transfer", vi: "Chuyển khoản" },
          value: "bank-transfer",
        },
        {
          label: { en: "Credit Card", vi: "Thẻ tín dụng" },
          value: "credit-card",
        },
        { label: { en: "E-Wallet", vi: "Ví điện tử" }, value: "e-wallet" },
      ],
      label: { en: "Payment Method", vi: "Phương thức thanh toán" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "paymentStatus",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: { en: "Pending", vi: "Chờ xử lý" }, value: "pending" },
        { label: { en: "Paid", vi: "Đã thanh toán" }, value: "paid" },
        { label: { en: "Failed", vi: "Thất bại" }, value: "failed" },
        { label: { en: "Refunded", vi: "Đã hoàn tiền" }, value: "refunded" },
      ],
      label: { en: "Payment Status", vi: "Trạng thái thanh toán" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "transactionId",
      type: "text",
      label: { en: "Transaction ID", vi: "Mã giao dịch" },
      admin: {
        description: {
          en: "Payment gateway transaction ID",
          vi: "Mã giao dịch từ cổng thanh toán",
        },
      },
    },

    // Shipping Information
    {
      name: "shippingMethod",
      type: "select",
      required: true,
      options: [
        {
          label: { en: "Standard Delivery", vi: "Giao hàng tiêu chuẩn" },
          value: "standard",
        },
        {
          label: { en: "Express Delivery", vi: "Giao hàng nhanh" },
          value: "express",
        },
        {
          label: { en: "Same Day Delivery", vi: "Giao trong ngày" },
          value: "same-day",
        },
      ],
      label: { en: "Shipping Method", vi: "Phương thức vận chuyển" },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "trackingNumber",
      type: "text",
      label: { en: "Tracking Number", vi: "Mã vận đơn" },
      admin: {
        description: {
          en: "Shipping tracking number",
          vi: "Mã theo dõi vận chuyển",
        },
      },
    },

    // Order Status
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: { en: "Pending", vi: "Chờ xác nhận" }, value: "pending" },
        { label: { en: "Confirmed", vi: "Đã xác nhận" }, value: "confirmed" },
        { label: { en: "Processing", vi: "Đang xử lý" }, value: "processing" },
        { label: { en: "Shipping", vi: "Đang giao" }, value: "shipping" },
        {
          label: { en: "Delivered", vi: "Đã giao hàng" },
          value: "delivered",
        },
        { label: { en: "Completed", vi: "Hoàn thành" }, value: "completed" },
        { label: { en: "Cancelled", vi: "Đã hủy" }, value: "cancelled" },
        {
          label: { en: "Refunded", vi: "Đã hoàn tiền" },
          value: "refunded",
        },
      ],
      label: { en: "Order Status", vi: "Trạng thái đơn hàng" },
      admin: {
        position: "sidebar",
      },
    },

    // Notes
    {
      name: "customerNotes",
      type: "textarea",
      label: { en: "Customer Notes", vi: "Ghi chú của khách" },
      admin: {
        description: {
          en: "Notes from customer",
          vi: "Ghi chú từ khách hàng",
        },
      },
    },
    {
      name: "adminNotes",
      type: "textarea",
      label: { en: "Admin Notes", vi: "Ghi chú nội bộ" },
      admin: {
        description: {
          en: "Internal notes (not visible to customer)",
          vi: "Ghi chú nội bộ (khách hàng không nhìn thấy)",
        },
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
      label: { en: "Created At", vi: "Ngày đặt" },
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
      name: "confirmedAt",
      type: "date",
      label: { en: "Confirmed At", vi: "Xác nhận lúc" },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "shippedAt",
      type: "date",
      label: { en: "Shipped At", vi: "Giao hàng lúc" },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "deliveredAt",
      type: "date",
      label: { en: "Delivered At", vi: "Đã giao lúc" },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
