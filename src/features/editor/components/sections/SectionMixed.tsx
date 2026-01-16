import { createSectionClasses } from '@/shared/utils/classNames';
import type { Section } from '@/shared/utils/parser-v2/types';
import { memo } from 'react';

type SectionMixedProps = {
  section: Section;
};

function SectionMixed({ section }: SectionMixedProps) {
  const paragraphs = section.data?.paragraphs || [];
  const listItems = section.data?.listItems || [];
  const classes = createSectionClasses(section.id);

  return (
    <div className={classes.mixed}>
      {paragraphs.map((text, index) => (
        <p key={`p-${index}`} className={classes.mixedParagraph}>
          {text}
        </p>
      ))}
      {listItems.length > 0 && (
        <ul className={classes.mixedList}>
          {listItems.map((item, index) => (
            <li key={`li-${index}`} className={classes.mixedListItem}>
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(SectionMixed);
