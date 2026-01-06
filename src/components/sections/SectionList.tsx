import { createSectionClasses } from '@/utils/classNames';
import type { Section } from '@/utils/parser-v2/types';
import { memo } from 'react';

type SectionListProps = {
  section: Section;
};

function SectionList({ section }: SectionListProps) {
  const items = section.data?.listItems || [];
  const classes = createSectionClasses(section.id);

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <li key={item.text} className={classes.listItem}>
          {item.text}
          {item.children && item.children.length > 0 && (
            <ul className={classes.nestedList}>
              {item.children.map((child) => (
                <li key={child.text} className={classes.nestedItem}>
                  {child.text}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default memo(SectionList);
