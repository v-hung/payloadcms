import type { CollectionConfig } from "payload";
import { createCollectionAccess } from "../lib/permissions-utils";
import { createSlugHook } from "../lib/slug-utils";

/**
 * Products Collection Configuration
 * Manages company products with multilingual content, categories, and SEO support
 */
export const Products: CollectionConfig = {
  slug: "products",

  // Access control based on granular permissions
  access: createCollectionAccess("products"),

  // Admin configuration
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "categories",
      "status",
      "featured",
      "bestSeller",
      "updatedAt",
    ],
    group: {
      en: "Content",
      vi: "Nội dung",
    },
  },

  // Collection labels
  labels: {
    singular: { en: "Product", vi: "Sản phẩm" },
    plural: { en: "Products", vi: "Sản phẩm" },
  },

  // Fields definition
  fields: [
    // Basic Information
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: { en: "Name", vi: "Tên" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: { en: "Slug", vi: "Đường dẫn" },
      admin: {
        position: "sidebar",
        description: {
          en: "URL-friendly identifier. Auto-generated from name if left empty. Type name first to see auto-generated slug.",
          vi: "Định danh URL. Tự động tạo từ tên nếu để trống. Nhập tên trước để xem slug tự động tạo.",
        },
        components: {
          Field: {
            path: "@/components/admin/SlugField",
            clientProps: { sourceField: "name" },
          },
        },
      },
      hooks: {
        beforeValidate: [createSlugHook("name")],
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
          en: "Product photos (multiple images supported)",
          vi: "Ảnh sản phẩm (hỗ trợ nhiều ảnh)",
        },
      },
    },

    // options
    {
      name: "options",
      type: "array",
      label: { en: "Product Options", vi: "Tùy chọn sản phẩm" },
      admin: {
        description: {
          en: '1️⃣ First, add options like Color, Size, Material. Then click "Generate Variants" button below.',
          vi: '1️⃣ Đầu tiên, thêm tùy chọn như Màu sắc, Kích thước, Chất liệu. Sau đó nhấn nút "Tạo biến thể" bên dưới.',
        },
        initCollapsed: false,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
          label: { en: "Option Name", vi: "Tên tùy chọn" },
          admin: {
            placeholder: {
              en: "e.g., Color, Size, Material",
              vi: "ví dụ: Màu sắc, Kích thước, Chất liệu",
            },
            description: {
              en: "Option name (e.g., Color)",
              vi: "Tên tùy chọn (ví dụ: Màu sắc)",
            },
          },
        },
        {
          name: "values",
          type: "array",
          required: true,
          minRows: 1,
          label: { en: "Option Values", vi: "Giá trị tùy chọn" },
          admin: {
            description: {
              en: "Add option values here",
              vi: "Thêm các giá trị tùy chọn ở đây",
            },
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
              label: { en: "Value Label", vi: "Nhãn giá trị" },
              admin: {
                placeholder: {
                  en: "e.g., Red, Small, Cotton",
                  vi: "ví dụ: Đỏ, Nhỏ, Cotton",
                },
              },
            },
          ],
        },
      ],
    },

    // variants
    {
      name: "variants",
      type: "array",
      label: { en: "Product Variants", vi: "Biến thể sản phẩm" },
      admin: {
        description: {
          en: "2️⃣ Variants are auto-generated from options above. Update price, SKU, and inventory for each variant.",
          vi: "2️⃣ Biến thể được tự động tạo từ các tùy chọn bên trên. Cập nhật giá, SKU và tồn kho cho từng biến thể.",
        },
        initCollapsed: false,
        components: {
          RowLabel: "@/components/admin/VariantRowLabel#VariantRowLabel",
        },
      },
      fields: [
        // VARIANT TITLE (Auto-generated, read-only)
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
          label: { en: "Variant Title", vi: "Tiêu đề biến thể" },
          admin: {
            readOnly: true,
            description: {
              en: '✅ Auto-generated from selected options (e.g., "Red / Small")',
              vi: '✅ Tự động tạo từ các tùy chọn đã chọn (ví dụ: "Đỏ / Nhỏ")',
            },
          },
        },

        // SELECTED OPTIONS (Auto-generated from parent options)
        {
          name: "selectedOptions",
          type: "array",
          required: true,
          label: { en: "Selected Options", vi: "Tùy chọn đã chọn" },
          admin: {
            readOnly: true,
            description: {
              en: "Selected option values for this variant",
              vi: "Giá trị tùy chọn đã chọn cho biến thể này",
            },
          },
          fields: [
            {
              name: "option",
              type: "text",
              required: true,
              localized: true,
              label: { en: "Option Name", vi: "Tên tùy chọn" },
              admin: {
                description: {
                  en: "Option name (e.g., Color)",
                  vi: "Tên tùy chọn (ví dụ: Màu sắc)",
                },
              },
            },
            {
              name: "value",
              type: "text",
              required: true,
              localized: true,
              label: { en: "Option Value", vi: "Giá trị tùy chọn" },
              admin: {
                description: {
                  en: "Option value (e.g., Red)",
                  vi: "Giá trị tùy chọn (ví dụ: Đỏ)",
                },
              },
            },
          ],
        },

        // PRICING
        {
          type: "row",
          fields: [
            {
              name: "price",
              type: "number",
              required: true,
              defaultValue: 0,
              min: 0,
              label: { en: "Price", vi: "Giá" },
              admin: {
                width: "50%",
                description: {
                  en: "Selling price",
                  vi: "Giá bán",
                },
              },
            },
            {
              name: "compareAtPrice",
              type: "number",
              min: 0,
              label: { en: "Compare at Price", vi: "Giá so sánh" },
              admin: {
                width: "50%",
                description: {
                  en: "Original price (for discounts)",
                  vi: "Giá gốc (cho giảm giá)",
                },
              },
            },
          ],
        },

        // SKU & BARCODE
        {
          type: "row",
          fields: [
            {
              name: "sku",
              type: "text",
              label: { en: "SKU", vi: "Mã SKU" },
              admin: {
                width: "50%",
                description: {
                  en: "Stock Keeping Unit",
                  vi: "Mã quản lý hàng hóa",
                },
                placeholder: {
                  en: "e.g., TS-RED-SM-001",
                  vi: "ví dụ: TS-RED-SM-001",
                },
              },
            },
            {
              name: "barcode",
              type: "text",
              label: { en: "Barcode", vi: "Mã vạch" },
              admin: {
                width: "50%",
                description: {
                  en: "Barcode (ISBN, UPC, GTIN, etc.)",
                  vi: "Mã vạch (ISBN, UPC, GTIN, v.v.)",
                },
              },
            },
          ],
        },

        // INVENTORY
        {
          name: "inventory",
          type: "number",
          required: true,
          defaultValue: 0,
          min: 0,
          label: { en: "Inventory", vi: "Tồn kho" },
          admin: {
            description: {
              en: "Available quantity",
              vi: "Số lượng có sẵn",
            },
          },
        },

        // VARIANT IMAGE
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: { en: "Variant Image", vi: "Hình ảnh biến thể" },
          admin: {
            description: {
              en: "Specific image for this variant (optional)",
              vi: "Hình ảnh riêng cho biến thể này (tùy chọn)",
            },
          },
        },

        // AVAILABILITY
        {
          name: "available",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Make this variant available for purchase",
          },
        },
      ],
    },

    // Content
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
      label: { en: "Description", vi: "Mô tả" },
      admin: {
        description: {
          en: "Full product description with formatting",
          vi: "Mô tả chi tiết sản phẩm có định dạng",
        },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      label: { en: "Excerpt", vi: "Trích đoạn" },
      admin: {
        description: {
          en: "Short summary for listings and previews",
          vi: "Tóm tắt ngắn gọn cho danh sách và xem trước",
        },
      },
    },
    {
      name: "specifications",
      type: "richText",
      localized: true,
      label: { en: "Specifications", vi: "Thông số kỹ thuật" },
      admin: {
        description: {
          en: "Technical specifications and details",
          vi: "Thông số kỹ thuật và chi tiết",
        },
      },
    },
    {
      name: "benefits",
      type: "richText",
      localized: true,
      label: { en: "Benefits", vi: "Lợi ích" },
      admin: {
        description: {
          en: "Product benefits and advantages",
          vi: "Lợi ích và ưu điểm của sản phẩm",
        },
      },
    },
    {
      name: "usageInstructions",
      type: "richText",
      localized: true,
      label: { en: "Usage Instructions", vi: "Hướng dẫn sử dụng" },
      admin: {
        description: {
          en: "How to use the product",
          vi: "Cách sử dụng sản phẩm",
        },
      },
    },

    // Taxonomy
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true,
      label: { en: "Categories", vi: "Danh mục" },
      admin: {
        position: "sidebar",
        description: {
          en: "Select one or more categories for this product",
          vi: "Chọn một hoặc nhiều danh mục cho sản phẩm này",
        },
      },
    },

    // Display Settings
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Featured Product", vi: "Sản phẩm nổi bật" },
      admin: {
        position: "sidebar",
        description: {
          en: "Show on home page as featured product",
          vi: "Hiển thị trên trang chủ dưới dạng sản phẩm nổi bật",
        },
      },
    },
    {
      name: "bestSeller",
      type: "checkbox",
      defaultValue: false,
      label: { en: "Best Seller", vi: "Bán chạy nhất" },
      admin: {
        position: "sidebar",
        description: {
          en: "Highlight as best-selling product",
          vi: "Đánh dấu là sản phẩm bán chạy nhất",
        },
      },
    },
    {
      name: "displayOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      label: { en: "Display Order", vi: "Thứ tự hiển thị" },
      admin: {
        position: "sidebar",
        description: {
          en: "Sort order for featured products on home page (lower numbers appear first)",
          vi: "Thứ tự sắp xếp cho sản phẩm nổi bật trên trang chủ (số nhỏ hơn hiển thị trước)",
        },
      },
    },

    // Publishing Settings
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: { en: "Draft", vi: "Bản nháp" }, value: "draft" },
        { label: { en: "Published", vi: "Đã xuất bản" }, value: "published" },
        { label: { en: "Archived", vi: "Đã lưu trữ" }, value: "archived" },
      ],
      label: { en: "Status", vi: "Trạng thái" },
      admin: {
        position: "sidebar",
      },
    },

    // SEO Fields
    {
      name: "seoTitle",
      type: "text",
      localized: true,
      label: { en: "SEO Title", vi: "Tiêu đề SEO" },
      admin: {
        position: "sidebar",
        description: {
          en: "Custom title for search engines (overrides product name)",
          vi: "Tiêu đề tùy chỉnh cho công cụ tìm kiếm (ghi đè tên sản phẩm)",
        },
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      localized: true,
      label: { en: "SEO Description", vi: "Mô tả SEO" },
      admin: {
        position: "sidebar",
        description: {
          en: "Meta description for search engines",
          vi: "Mô tả meta cho công cụ tìm kiếm",
        },
      },
    },
  ],

  // Timestamps
  timestamps: true,

  // Versions
  versions: {
    drafts: true,
  },
};
