import matter from 'gray-matter';
import type { Root } from 'mdast';
import { remark } from 'remark';
import { extractSectionData } from './detectContentType';
import { splitIntoSections } from './splitSections';
import type { HeaderData, ParsedResume, Section } from './types';

// Parse markdown string into structured resume data
export function parseMarkdownSync(markdown: string): ParsedResume {
  const { data: frontmatter, content } = matter(markdown);
  const ast = remark().parse(content) as Root;
  let sections = splitIntoSections(ast);
  sections = sections.map((section) => extractSectionData(section));
  const header = extractHeaderData(frontmatter, sections);

  return {
    header,
    sections,
  };
}

// Extract header/personal info from frontmatter or first section
function extractHeaderData(
  frontmatter: Record<string, unknown>,
  sections: Section[]
): HeaderData {
  // If frontmatter has data, use it
  if (Object.keys(frontmatter).length > 0) {
    return normalizeHeaderData(frontmatter);
  }

  // Otherwise, try to extract from first h1 section
  const firstH1 = sections.find((s) => s.level === 1);
  if (firstH1) {
    return {
      name: firstH1.heading,
      ...extractHeaderFromContent(firstH1),
    };
  }

  return {};
}

// Normalize frontmatter to HeaderData
function normalizeHeaderData(data: Record<string, unknown>): HeaderData {
  const header: HeaderData = {};

  const fieldMappings: Record<string, string> = {
    name: 'name',
    title: 'title',
    email: 'email',
    phone: 'phone',
    location: 'location',
    address: 'location',
    website: 'website',
    url: 'website',
    github: 'github',
    linkedin: 'linkedin',
  };

  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = fieldMappings[key.toLowerCase()] || key;
    if (typeof value === 'string') {
      header[normalizedKey] = value;
    }
  }

  return header;
}

// Try to extract header info from section content
function extractHeaderFromContent(section: Section): Partial<HeaderData> {
  const header: Partial<HeaderData> = {};

  if (!section.data?.paragraphs) return header;

  const text = section.data.paragraphs.join(' ');

  // Email pattern
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) header.email = emailMatch[0];

  // Phone pattern
  const phoneMatch = text.match(
    /[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}/
  );
  if (phoneMatch) header.phone = phoneMatch[0];

  // GitHub pattern
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  if (githubMatch) header.github = `https://${githubMatch[0]}`;

  // LinkedIn pattern
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) header.linkedin = `https://${linkedinMatch[0]}`;

  return header;
}
