import { SECTION } from '@/constant/constant';
import type { WorkExperience } from '@/types/resume.type';
import type { Root } from 'node_modules/remark-parse/lib';

export function parserWorkExperience(nodes: Root) {
  const workExperiences: WorkExperience[] = [];
  let isWorkExperienceSection = false;

  for (const node of nodes.children) {
    if (
      node.type === 'heading' &&
      node.depth === 2 &&
      node.children[0]?.type === 'text'
    ) {
      const headingText = node.children[0].value;
      if (headingText === SECTION.EXPERIENCE) {
        isWorkExperienceSection = true;
        continue;
      } else {
        if (isWorkExperienceSection) break;
      }
    }

    if (isWorkExperienceSection && node.type === 'heading') {
      if (node.depth === 3) {
        workExperiences.push({
          company:
            node.children[0]?.type === 'text' ? node.children[0].value : '',
        });
      }
    }

    if (isWorkExperienceSection && node.type === 'paragraph') {
      workExperiences[workExperiences.length - 1].duration = node.children
        .filter((p) => p.type === 'strong')
        .map((t) => {
          return t.children
            .filter((c) => c.type === 'text')
            .map((c) => c.value)
            .join('');
        })
        .join(' ');
    }

    if (isWorkExperienceSection && node.type === 'heading') {
      if (node.depth === 4) {
        const prs = node.children.filter((p) => p.type === 'text')[0].value;
        console.log('prs', prs);
      }
    }
  }

  return {
    workExperiences,
  };
}
