import { SECTION } from '@/constant/constant';
import type { Root } from 'node_modules/remark-parse/lib';

export function parserSummary(nodes: Root) {
  const summaryLines: string[] = [];
  let isSummarySection = false;

  for (const node of nodes.children) {
    if (
      node.type === 'heading' &&
      node.depth === 2 &&
      node.children[0]?.type === 'text'
    ) {
      const headingText = node.children[0].value;
      if (headingText === SECTION.SUMMARY) {
        isSummarySection = true;
        continue;
      } else {
        if (isSummarySection) break;
      }
    }

    if (isSummarySection && node.type === 'paragraph') {
      node.children.forEach((t) => {
        if (t.type === 'text') {
          summaryLines.push(t.value);
        }
      });
    }
  }

  return {
    summaryLines,
  };
}
