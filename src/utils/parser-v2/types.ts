// Content types that can be detected
export type ContentType = 'paragraph' | 'list' | 'timeline' | 'table' | 'mixed';

// Base section content node
export interface SectionNode {
  type:
    | 'text'
    | 'paragraph'
    | 'heading'
    | 'list'
    | 'listItem'
    | 'link'
    | 'strong'
    | 'emphasis'
    | 'code'
    | 'table'
    | 'image';
  value?: string;
  url?: string;
  depth?: number;
  children?: SectionNode[];
}

// Timeline item (for Experience, Education, etc.)
export interface TimelineItem {
  title?: string;
  subtitle?: string;
  duration?: string;
  location?: string;
  description?: string;
  items?: string[];
}

// List item
export interface ListItem {
  text: string;
  children?: ListItem[];
}

// Section extracted from markdown
export interface Section {
  id: string;
  heading: string;
  level: number; // h1=1, h2=2, h3=3...
  contentType: ContentType;
  content: SectionNode[];
  // Extracted structured data based on contentType
  data?: {
    paragraphs?: string[];
    listItems?: ListItem[];
    timelineItems?: TimelineItem[];
    tableData?: string[][];
  };
  children?: Section[]; // Nested sections (e.g., h3 under h2)
}

// Frontmatter/Header data
export interface HeaderData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

// Full parsed resume
export interface ParsedResume {
  header: HeaderData;
  sections: Section[];
}
