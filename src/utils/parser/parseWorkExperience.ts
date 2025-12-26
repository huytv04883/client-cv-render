import { SECTION } from '@/constant/constant';
import { NodeType } from '@/types/markdown.type';
import type { WorkExperience } from '@/types/resume.type';
import type { Root } from 'node_modules/remark-parse/lib';

export function parserWorkExperience(nodes: Root) {
  const workExperiences: WorkExperience[] = [];
  let isWorkExperienceSection = false;
  let currentProjects: { name: string; responsibilities?: string[] }[] = [];

  for (const node of nodes.children) {
    if (
      node.type === NodeType.Heading &&
      node.depth === 2 &&
      node.children[0]?.type === NodeType.Text
    ) {
      const headingText = node.children[0].value;
      if (headingText === SECTION.EXPERIENCE) {
        isWorkExperienceSection = true;
        continue;
      } else {
        if (isWorkExperienceSection) break;
      }
    }

    if (!isWorkExperienceSection) continue;

    if (node.type === NodeType.Heading && node.depth === 3) {
      if (workExperiences.length > 0 && currentProjects.length > 0) {
        workExperiences[workExperiences.length - 1].projects = [
          ...currentProjects,
        ];
      }
      currentProjects = [];

      workExperiences.push({
        company:
          node.children[0]?.type === NodeType.Text
            ? node.children[0].value
            : '',
        duration: '',
        description: '',
        projects: [],
      });
    }

    // Paragraph detection: duration (has **strong**) vs description (plain text)
    if (node.type === NodeType.Paragraph && workExperiences.length > 0) {
      const strongNode = node.children.find((c) => c.type === NodeType.Strong);

      if (strongNode && strongNode.type === NodeType.Strong) {
        // Duration: **11/2023 – Present**
        const duration = strongNode.children
          .filter((c) => c.type === NodeType.Text)
          .map((c) => c.value)
          .join('');
        workExperiences[workExperiences.length - 1].duration = duration;
      } else {
        // Description: plain text paragraph (no strong/emphasis)
        const description = node.children
          .filter((c) => c.type === NodeType.Text)
          .map((c) => c.value)
          .join('');

        if (
          description &&
          !workExperiences[workExperiences.length - 1].description
        ) {
          workExperiences[workExperiences.length - 1].description = description;
        }
      }
    }

    if (node.type === NodeType.Heading && node.depth === 4) {
      const projectName = node.children
        .filter((c) => c.type === NodeType.Text)
        .map((c) => c.value)
        .join('');
      currentProjects.push({
        name: projectName,
        responsibilities: [],
      });
    }

    if (node.type === NodeType.List && currentProjects.length > 0) {
      const responsibilities = node.children
        .filter((item) => item.type === NodeType.ListItem)
        .map((item) => {
          const paragraph = item.children.find(
            (c) => c.type === NodeType.Paragraph
          );
          if (paragraph && paragraph.type === NodeType.Paragraph) {
            return paragraph.children
              .filter((c) => c.type === NodeType.Text)
              .map((c) => c.value)
              .join('');
          }
          return '';
        });

      currentProjects[currentProjects.length - 1].responsibilities =
        responsibilities;
    }
  }

  if (workExperiences.length > 0 && currentProjects.length > 0) {
    workExperiences[workExperiences.length - 1].projects = [...currentProjects];
  }

  return {
    workExperiences,
  };
}
