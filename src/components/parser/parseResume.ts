import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { parserSummary } from './parseSummary';
import { parserCoreSkills } from './parseCoreSkills';
import { parserWorkExperience } from './parseWorkExperience';

export function parserResume(markdown: string) {
  const { content } = matter(markdown);
  const nodes = remark().use(remarkParse).parse(content);
  const summaryLines = parserSummary(nodes).summaryLines;
  const coreSkills = parserCoreSkills(nodes).coreSkills;
  const workExperiences = parserWorkExperience(nodes).workExperiences;
  return {
    summaryLines,
    coreSkills,
    workExperiences,
    nodes,
  };
}
