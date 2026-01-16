import { createSectionClasses } from '@/shared/utils/classNames';
import type { Section } from '@/shared/utils/parser-v2/types';
import { memo } from 'react';

type SectionTimelineProps = {
  section: Section;
};

function SectionTimeline({ section }: SectionTimelineProps) {
  const items = section.data?.timelineItems || [];
  const classes = createSectionClasses(section.id);

  return (
    <div className={classes.timeline}>
      {items.map((item, index) => (
        <div key={index} className={classes.timelineItem}>
          <div className={classes.timelineHeader}>
            <div>
              {item.title && (
                <h3 className={classes.timelineTitle}>{item.title}</h3>
              )}
              {item.subtitle && (
                <span className={classes.timelineSubtitle}>
                  {item.subtitle}
                </span>
              )}
            </div>
            {item.duration && (
              <span className={classes.timelineDuration}>{item.duration}</span>
            )}
          </div>

          {item.location && (
            <span className={classes.timelineLocation}>{item.location}</span>
          )}

          {item.description && (
            <p className={classes.timelineDescription}>{item.description}</p>
          )}

          {item.items && item.items.length > 0 && (
            <ul className={classes.timelineList}>
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex} className={classes.timelineListItem}>
                  {listItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(SectionTimeline);
