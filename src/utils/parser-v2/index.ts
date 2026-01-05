// Types
export type {
  ContentType,
  Section,
  SectionNode,
  TimelineItem,
  ListItem,
  HeaderData,
  ParsedResume,
} from './types';

// Main parser
export { parseMarkdown, parseMarkdownSync } from './parseMarkdown';

// Utilities
export { splitIntoSections } from './splitSections';
export { detectContentType, extractSectionData } from './detectContentType';

// Class name utilities
export { generateClassName, createSectionClasses } from './utils';
export type { SectionClasses } from './utils';
