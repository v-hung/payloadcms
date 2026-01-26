import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
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
  ],
});
