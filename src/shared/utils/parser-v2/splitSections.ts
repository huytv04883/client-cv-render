import type { Root, RootContent } from 'mdast';
import type { Section, SectionNode } from './types';

/**
 * Split markdown AST into sections based on headings
 * Each heading starts a new section, nested headings become children
 */
export function splitIntoSections(ast: Root): Section[] {
  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let sectionStack: Section[] = []; // Stack to track parent sections for nesting

  for (const node of ast.children) {
    if (node.type === 'heading') {
      const heading = extractHeadingText(node);
      const level = node.depth;

      const newSection: Section = {
        id: generateSectionId(heading),
        heading,
        level,
        contentType: 'mixed', // Will be detected later
        content: [],
        children: [],
      };

      if (level === 1) {
        // Top-level section
        sections.push(newSection);
        sectionStack = [newSection];
        currentSection = newSection;
      } else if (level === 2) {
        // Main section (most common)
        sections.push(newSection);
        sectionStack = [newSection];
        currentSection = newSection;
      } else {
        // Nested section (h3, h4, etc.)
        // Find parent section with lower level
        while (
          sectionStack.length > 0 &&
          sectionStack[sectionStack.length - 1].level >= level
        ) {
          sectionStack.pop();
        }

        if (sectionStack.length > 0) {
          const parent = sectionStack[sectionStack.length - 1];
          parent.children = parent.children || [];
          parent.children.push(newSection);
        } else {
          sections.push(newSection);
        }

        sectionStack.push(newSection);
        currentSection = newSection;
      }
    } else if (currentSection) {
      // Add content to current section
      const convertedNode = convertNode(node);
      if (convertedNode) {
        currentSection.content.push(convertedNode);
      }
    }
  }

  return sections;
}

/**
 * Extract text from heading node
 */
function extractHeadingText(node: RootContent): string {
  if (node.type !== 'heading') return '';

  const texts: string[] = [];

  function traverse(
    n: RootContent | { type: string; value?: string; children?: unknown[] }
  ) {
    if ('value' in n && typeof n.value === 'string') {
      texts.push(n.value);
    }
    if ('children' in n && Array.isArray(n.children)) {
      for (const child of n.children) {
        traverse(child as RootContent);
      }
    }
  }

  traverse(node);
  return texts.join('').trim();
}

/**
 * Convert mdast node to SectionNode
 */
function convertNode(node: RootContent): SectionNode | null {
  switch (node.type) {
    case 'paragraph':
      return {
        type: 'paragraph',
        children: node.children
          .map((child) => convertInlineNode(child))
          .filter(Boolean) as SectionNode[],
      };

    case 'list':
      return {
        type: 'list',
        children: node.children.map((item) => ({
          type: 'listItem' as const,
          children: item.children
            .map((child) => convertNode(child as RootContent))
            .filter(Boolean) as SectionNode[],
        })),
      };

    case 'table':
      return {
        type: 'table',
        children: node.children.map((row) => ({
          type: 'paragraph' as const,
          children: row.children.map((cell) => ({
            type: 'text' as const,
            value: extractTextFromNode(cell),
          })),
        })),
      };

    case 'heading':
      return {
        type: 'heading',
        depth: node.depth,
        children: node.children
          .map((child) => convertInlineNode(child))
          .filter(Boolean) as SectionNode[],
      };

    default:
      return null;
  }
}

/**
 * Convert inline nodes (text, strong, emphasis, link, etc.)
 */
function convertInlineNode(node: unknown): SectionNode | null {
  const n = node as {
    type: string;
    value?: string;
    url?: string;
    children?: unknown[];
  };

  switch (n.type) {
    case 'text':
      return { type: 'text', value: n.value || '' };

    case 'strong':
      return {
        type: 'strong',
        children: (n.children || [])
          .map((child) => convertInlineNode(child))
          .filter(Boolean) as SectionNode[],
      };

    case 'emphasis':
      return {
        type: 'emphasis',
        children: (n.children || [])
          .map((child) => convertInlineNode(child))
          .filter(Boolean) as SectionNode[],
      };

    case 'link':
      return {
        type: 'link',
        url: n.url,
        children: (n.children || [])
          .map((child) => convertInlineNode(child))
          .filter(Boolean) as SectionNode[],
      };

    case 'inlineCode':
      return { type: 'code', value: n.value || '' };
    case 'image':
      return { type: 'image', value: n.url || '' };

    default:
      return null;
  }
}

/**
 * Extract plain text from any node
 */
function extractTextFromNode(node: unknown): string {
  const n = node as { type: string; value?: string; children?: unknown[] };

  if (n.value) return n.value;

  if (n.children) {
    return n.children.map((child) => extractTextFromNode(child)).join('');
  }

  return '';
}

/**
 * Generate unique section ID from heading
 */
function generateSectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
