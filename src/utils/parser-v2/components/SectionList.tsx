import type { Section } from '../types';
import { createSectionClasses } from '../utils/classNames';

interface SectionListProps {
  section: Section;
}

export function SectionList({ section }: SectionListProps) {
  const items = section.data?.listItems || [];
  const classes = createSectionClasses(section.id);

  return (
    <ul className={classes.list}>
      {items.map((item, index) => (
        <li key={index} className={classes.listItem}>
          {item.text}
          {item.children && item.children.length > 0 && (
            <ul className={classes.nestedList}>
              {item.children.map((child, childIndex) => (
                <li key={childIndex} className={classes.nestedItem}>
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
