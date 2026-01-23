/**
 * Utility functions for rendering Payload CMS rich text (Lexical) content
 */

interface LexicalNode {
  type?: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  children?: LexicalNode[];
  [k: string]: unknown;
}

interface LexicalRoot {
  root: {
    children: LexicalNode[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Extract plain text from Lexical JSON structure
 */
export function lexicalToPlainText(lexicalJSON: LexicalRoot): string {
  if (!lexicalJSON || typeof lexicalJSON !== "object") {
    return "";
  }

  const { root } = lexicalJSON;
  if (!root || !root.children) {
    return "";
  }

  function extractText(node: LexicalNode): string {
    if (!node) return "";

    // If node has text property, return it
    if (node.text) {
      return node.text;
    }

    // If node has children, recursively extract text
    if (node.children && Array.isArray(node.children)) {
      return node.children
        .map((child: LexicalNode) => extractText(child))
        .join("");
    }

    return "";
  }

  return root.children
    .map((child: LexicalNode) => extractText(child))
    .join("\n");
}

/**
 * Convert Lexical JSON to basic HTML
 */
export function lexicalToHTML(lexicalJSON: LexicalRoot): string {
  if (!lexicalJSON || typeof lexicalJSON !== "object") {
    return "";
  }

  const { root } = lexicalJSON;
  if (!root || !root.children) {
    return "";
  }

  function nodeToHTML(node: LexicalNode): string {
    if (!node) return "";

    // Text node
    if (node.text) {
      let text = node.text;

      // Apply formatting
      if (node.format) {
        if (node.format & 1) text = `<strong>${text}</strong>`; // Bold
        if (node.format & 2) text = `<em>${text}</em>`; // Italic
        if (node.format & 4) text = `<u>${text}</u>`; // Underline
        if (node.format & 8) text = `<code>${text}</code>`; // Code
      }

      return text;
    }

    // Element node
    const children = node.children
      ? node.children.map((child: LexicalNode) => nodeToHTML(child)).join("")
      : "";

    switch (node.type) {
      case "paragraph":
        return `<p>${children}</p>`;
      case "heading":
        const level = node.tag || "h2";
        return `<${level}>${children}</${level}>`;
      case "list":
        const listTag = node.listType === "number" ? "ol" : "ul";
        return `<${listTag}>${children}</${listTag}>`;
      case "listitem":
        return `<li>${children}</li>`;
      case "link":
        return `<a href="${node.url || "#"}">${children}</a>`;
      case "quote":
        return `<blockquote>${children}</blockquote>`;
      default:
        return children;
    }
  }

  return root.children.map((child: LexicalNode) => nodeToHTML(child)).join("");
}
