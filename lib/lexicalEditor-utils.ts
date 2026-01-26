import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  defaultColors,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";

export const lexicalEditorConfig = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Headings
    HeadingFeature({
      enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    }),

    // Text Formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),

    // Paragraph
    ParagraphFeature(),

    // Links
    LinkFeature({
      enabledCollections: ["posts", "products"],
    }),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    // Alignment & Indentation
    AlignFeature(),
    IndentFeature(),

    // Blocks
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Upload Images
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: "alt",
              type: "text",
              required: true,
              label: { en: "Alt Text", vi: "Văn bản thay thế" },
            },
            {
              name: "caption",
              type: "text",
              label: { en: "Caption", vi: "Chú thích" },
            },
          ],
        },
      },
    }),

    // Relationships
    RelationshipFeature({
      enabledCollections: ["posts", "products"],
    }),

    // Custom Text States
    TextStateFeature({
      state: {
        color: {
          ...defaultColors.text,
          // fancy gradients!
          galaxy: {
            label: "Galaxy",
            css: {
              background: "linear-gradient(to right, #0000ff, #ff0000)",
              color: "white",
            },
          },
          sunset: {
            label: "Sunset",
            css: { background: "linear-gradient(to top, #ff5f6d, #6a3093)" },
          },
        },
        // You can have both colored and underlined text at the same time.
        // If you don't want that, you should group them within the same key.
        // (just like I did with defaultColors and my fancy gradients)
        underline: {
          solid: {
            label: "Solid",
            css: {
              "text-decoration": "underline",
              "text-underline-offset": "4px",
            },
          },
          // You'll probably want to use the CSS light-dark() utility.
          "yellow-dashed": {
            label: "Yellow Dashed",
            css: {
              "text-decoration": "underline dashed",
              "text-decoration-color": "light-dark(#EAB308,yellow)",
              "text-underline-offset": "4px",
            },
          },
        },
      },
    }),
  ],
});
