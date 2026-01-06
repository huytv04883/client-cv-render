import type {
  ContentType,
  Section,
  SectionNode,
  TimelineItem,
  ListItem,
} from './types';

// Date patterns for timeline detection
const DATE_PATTERNS = [
  /\d{4}\s*[-–—]\s*(Present|Current|\d{4})/i, // 2020 - 2024, 2020 - Present
  /[A-Z][a-z]{2,8}\s+\d{4}/, // Jan 2020, March 2024
  /\d{1,2}\/\d{4}/, // 01/2020
  /\d{4}/, // Just year: 2024
];

/**
 * Detect content type for a section based on its content
 */
export function detectContentType(section: Section): ContentType {
  const { content } = section;

  if (content.length === 0) return 'paragraph';

  // Count node types
  const typeCounts = countNodeTypes(content);
  const hasDatePattern = checkForDatePatterns(content);
  const hasTable = typeCounts.table > 0;
  const hasList = typeCounts.list > 0;
  const hasParagraph = typeCounts.paragraph > 0;

  // Determine content type
  if (hasTable) {
    return 'table';
  }

  if (hasDatePattern && (hasList || hasNestedHeadings(section))) {
    return 'timeline';
  }

  if (hasList && !hasParagraph) {
    return 'list';
  }

  if (hasParagraph && !hasList) {
    return 'paragraph';
  }

  return 'mixed';
}

/**
 * Count occurrences of each node type
 */
function countNodeTypes(nodes: SectionNode[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const node of nodes) {
    counts[node.type] = (counts[node.type] || 0) + 1;
  }

  return counts;
}

/**
 * Check if content contains date patterns (indicates timeline)
 */
function checkForDatePatterns(nodes: SectionNode[]): boolean {
  const text = extractAllText(nodes);
  return DATE_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Check if section has nested headings (children sections)
 */
function hasNestedHeadings(section: Section): boolean {
  return (section.children && section.children.length > 0) || false;
}

/**
 * Extract all text from nodes
 */
function extractAllText(nodes: SectionNode[]): string {
  const texts: string[] = [];

  function traverse(node: SectionNode) {
    if (node.value) {
      texts.push(node.value);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  nodes.forEach(traverse);
  return texts.join(' ');
}

/**
 * Extract structured data based on content type
 */
export function extractSectionData(section: Section): Section {
  const contentType = detectContentType(section);
  section.contentType = contentType;

  switch (contentType) {
    case 'paragraph':
      section.data = { paragraphs: extractParagraphs(section.content) };
      break;

    case 'list':
      section.data = { listItems: extractListItems(section.content) };
      break;

    case 'timeline':
      section.data = { timelineItems: extractTimelineItems(section) };
      break;

    case 'table':
      section.data = { tableData: extractTableData(section.content) };
      break;

    case 'mixed':
      section.data = {
        paragraphs: extractParagraphs(section.content),
        listItems: extractListItems(section.content),
      };
      break;
  }

  // Process children recursively
  if (section.children) {
    section.children = section.children.map((child) =>
      extractSectionData(child)
    );
  }

  return section;
}

/**
 * Extract paragraphs from content
 */
function extractParagraphs(nodes: SectionNode[]): string[] {
  return nodes
    .filter((node) => node.type === 'paragraph')
    .map((node) => extractAllText([node]).trim())
    .filter((text) => text.length > 0);
}

/**
 * Extract list items from content
 */
function extractListItems(nodes: SectionNode[]): ListItem[] {
  const items: ListItem[] = [];

  for (const node of nodes) {
    if (node.type === 'list' && node.children) {
      for (const listItem of node.children) {
        items.push({
          text: extractAllText(listItem.children || []).trim(),
          children: [], // Can be extended for nested lists
        });
      }
    }
  }

  return items;
}

/**
 * Extract timeline items (for Experience, Education, etc.)
 */
function extractTimelineItems(section: Section): TimelineItem[] {
  const items: TimelineItem[] = [];

  // If section has children (nested headings), each child is a timeline item
  if (section.children && section.children.length > 0) {
    for (const child of section.children) {
      const item = extractTimelineItemFromSection(child);
      items.push(item);
    }
  } else {
    // Try to extract from content
    const item = extractTimelineItemFromContent(section.content);
    if (
      item.title ||
      item.description ||
      (item.items && item.items.length > 0)
    ) {
      items.push(item);
    }
  }

  return items;
}

/**
 * Extract timeline item from a section
 */
function extractTimelineItemFromSection(section: Section): TimelineItem {
  const allText = extractAllText(section.content);
  const duration = extractDuration(allText);
  const listItems = extractListItems(section.content);

  return {
    title: section.heading,
    duration: duration || undefined,
    description: extractParagraphs(section.content).join(' ') || undefined,
    items: listItems.map((item) => item.text),
  };
}

/**
 * Extract timeline item from content nodes
 */
function extractTimelineItemFromContent(nodes: SectionNode[]): TimelineItem {
  const allText = extractAllText(nodes);
  const duration = extractDuration(allText);
  const listItems = extractListItems(nodes);
  const paragraphs = extractParagraphs(nodes);

  return {
    duration: duration || undefined,
    description: paragraphs.join(' ') || undefined,
    items: listItems.map((item) => item.text),
  };
}

/**
 * Extract duration from text
 */
function extractDuration(text: string): string | null {
  for (const pattern of DATE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
}

/**
 * Extract table data
 */
function extractTableData(nodes: SectionNode[]): string[][] {
  const table = nodes.find((node) => node.type === 'table');
  if (!table || !table.children) return [];

  return table.children.map((row) => {
    if (!row.children) return [];
    return row.children.map((cell) => cell.value || extractAllText([cell]));
  });
}
