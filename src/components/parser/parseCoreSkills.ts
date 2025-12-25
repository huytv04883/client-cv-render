import { SECTION } from '@/constant/constant';
import type { ResumeSkill } from '@/types/resume.type';
import type { Root } from 'node_modules/remark-parse/lib';

export function parserCoreSkills(nodes: Root) {
  const coreSkills: ResumeSkill[] = [];
  let isCoreSkillsSection = false;

  for (const node of nodes.children) {
    if (
      node.type === 'heading' &&
      node.depth === 2 &&
      node.children[0]?.type === 'text'
    ) {
      const headingText = node.children[0].value;
      if (headingText === SECTION.CORE_SKILLS) {
        isCoreSkillsSection = true;
        continue;
      } else {
        if (isCoreSkillsSection) break;
      }
    }

    if (isCoreSkillsSection && node.type === 'heading') {
      if (node.depth === 3) {
        coreSkills.push({
          name: node.children[0]?.type === 'text' ? node.children[0].value : '',
          children: [],
        });
      }
    }

    if (isCoreSkillsSection && node.type === 'list') {
      coreSkills[coreSkills.length - 1].children = node.children
        .filter((item) => item.type === 'listItem')
        .map((item) => {
          const textNode = item.children.find(
            (child) => child.type === 'paragraph'
          );
          if (textNode) {
            const text = textNode.children
              .filter((child) => child.type === 'text')
              .map((child) => child.value)
              .join('');
            return text;
          }
          return '';
        });
    }
  }

  return {
    coreSkills,
  };
}
