import { createSectionClasses } from '@/utils/classNames';
import type { Section } from '@/utils/parser-v2/types';

type SectionParagraphProps = {
  section: Section;
};

export function SectionParagraph({ section }: SectionParagraphProps) {
  const paragraphs = section.data?.paragraphs || [];
  const classes = createSectionClasses(section.id);

  return (
    <div className={classes.paragraph}>
      {paragraphs.map((text, index) => (
        <p key={index} className={classes.text}>
          {text}
        </p>
      ))}
    </div>
  );
}
