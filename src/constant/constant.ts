export enum Tab {
  Markdown = 'md',
  CSS = 'css',
}

export const GITHUB_REPO_URL = 'https://github.com/huytv04883/client-cv-render';

export const SECTION = {
  SUMMARY: 'PROFESSIONAL_SUMMARY',
  CORE_SKILLS: 'CORE_SKILLS',
  EXPERIENCE: 'WORK_EXPERIENCE',
  EDUCATION: 'EDUCATION',
  HEADER: 'HEADER',
  ALL: 'ALL',
};

export const LANGUAGE = {
  MARKDOWN: 'markdown',
  CSS: 'css',
};

export const FONT_FAMILIES_LATIN = [
  'Minion Pro',
  'Georgia',
  'Times New Roman',
  'Garamond',
];

export const PAPER_SIZES = ['A4', 'Letter', 'Legal', 'A3', 'A5'];

export const THEME_COLORS = [
  '#000000',
  '#377BB5',
  '#DC3545',
  '#FFA500',
  '#9C27B0',
  '#4CAF50',
];

export const MM_TO_PX = 3.78;
export const A4_HEIGHT_MM = 297;
export const A4_PADDING_MM = 20;
export const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - A4_PADDING_MM * 2;
// Convert mm to px (1mm ≈ 3.78px at 96dpi)
export const PAGE_CONTENT_HEIGHT_PX = CONTENT_HEIGHT_MM * 3.78;
