import { SECTION } from '@/app/config/constants';
import type { Education } from '@/types/resume.type';
import type { Root } from 'node_modules/remark-parse/lib';

export function parserEducation(nodes: Root) {
  const educationLines: Education = {
    school: '',
    major: '',
    duration: '',
  };
  let isEducationSection = false;

  for (const node of nodes.children) {
    if (
      node.type === 'heading' &&
      node.depth === 2 &&
      node.children[0]?.type === 'text'
    ) {
      const headingText = node.children[0].value;
      if (headingText === SECTION.EDUCATION) {
        isEducationSection = true;
        continue;
      } else {
        if (isEducationSection) break;
      }
    }

    if (!isEducationSection) continue;

    if (isEducationSection && node.type === 'heading') {
      if (node.depth === 3) {
        educationLines.school = node.children
          .map((child) => (child.type === 'text' ? child.value : ''))
          .join('');
      }
    }

    if (isEducationSection && node.type === 'paragraph') {
      if (node.type === 'paragraph') {
        for (const child of node.children) {
          if (child.type === 'strong') {
            educationLines.duration = child.children
              .map((grandChild) =>
                grandChild.type === 'text' ? grandChild.value : ''
              )
              .join('');
          }

          if (child.type === 'text') {
            educationLines.major = child.value.replace(/[-–—]/, '').trim();
            break;
          }
        }
      }
    }
  }

  return {
    educationLines,
  };
}
