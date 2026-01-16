import type { Education } from '@/types/resume.type';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

function ResumeEducation({ education }: { education: Education }) {
  return (
    <section className="education">
      <SectionHeading title="Education" />
      <div className="education__item">
        <div className="education__school-major">
          <span className="education__school">{education.school}</span>

          {education.duration && (
            <span className="education__duration">{education.duration}</span>
          )}
        </div>
        {education.major && (
          <span className="education__major">{education.major}</span>
        )}
      </div>
    </section>
  );
}

export default memo(ResumeEducation);
