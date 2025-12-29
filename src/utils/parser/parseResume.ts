import type { ResumeMeta } from '@/types/resume.type';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { parserCoreSkills } from './parseCoreSkills';
import { parserEducation } from './parseEducation';
import { parserSummary } from './parseSummary';
import { parserWorkExperience } from './parseWorkExperience';

export function parserResume(markdown: string) {
  const { content, data } = matter(markdown);
  const nodes = remark().use(remarkParse).parse(content);
  const summaryLines = parserSummary(nodes).summaryLines;
  const coreSkills = parserCoreSkills(nodes).coreSkills;
  const experiences = parserWorkExperience(nodes).workExperiences;
  const education = parserEducation(nodes).educationLines;

  return {
    header: data as ResumeMeta,
    summaryLines,
    coreSkills,
    experiences,
    education,
    nodes,
  };
}
