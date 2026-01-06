import { createSectionClasses } from '@/utils/classNames';
import type { Section } from '@/utils/parser-v2/types';
import SectionList from './SectionList';
import SectionMixed from './SectionMixed';
import { SectionParagraph } from './SectionParagraph';
import SectionTable from './SectionTable';
import SectionTimeline from './SectionTimeline';

type DynamicSectionProps = {
  section: Section;
};

export function DynamicSection({ section }: DynamicSectionProps) {
  const { heading } = section;
  const classes = createSectionClasses(section.id);

  return (
    <section className={classes.root}>
      {heading && <h2 className={classes.heading}>{heading}</h2>}
      <div className={classes.content}>{renderContent(section)}</div>
      {section.children && section.children.length > 0 && (
        <div className={classes.children}>
          {section.children.map((child) => (
            <DynamicSection key={child.id} section={child} />
          ))}
        </div>
      )}
    </section>
  );
}

function renderContent(section: Section) {
  switch (section.contentType) {
    case 'paragraph':
      return <SectionParagraph section={section} />;
    case 'list':
      return <SectionList section={section} />;
    case 'timeline':
      return <SectionTimeline section={section} />;
    case 'table':
      return <SectionTable section={section} />;
    case 'mixed':
      return <SectionMixed section={section} />;
    default:
      return <SectionParagraph section={section} />;
  }
}
