import type { Section } from '../types';
import { createSectionClasses } from '../utils/classNames';

interface SectionParagraphProps {
  section: Section;
}

export function SectionParagraph({ section }: SectionParagraphProps) {
  console.log(section);

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
