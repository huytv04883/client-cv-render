export type ContentType = 'paragraph' | 'list' | 'timeline' | 'table' | 'mixed';

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

export interface TimelineItem {
  title?: string;
  subtitle?: string;
  duration?: string;
  location?: string;
  description?: string;
  items?: string[];
}

export interface ListItem {
  text: string;
  children?: ListItem[];
}

export interface Section {
  id: string;
  heading: string;
  level: number;
  contentType: ContentType;
  content: SectionNode[];
  data?: {
    paragraphs?: string[];
    listItems?: ListItem[];
    timelineItems?: TimelineItem[];
    tableData?: string[][];
  };
  children?: Section[];
}

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

export interface ParsedResume {
  header: HeaderData;
  sections: Section[];
}
