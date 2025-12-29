import { User } from 'lucide-react';
import { memo } from 'react';
import SectionHeading from './SectionHeading';
import type { Education } from '@/types/resume.type';

function ResumeEducation({ education }: { education: Education }) {
  return (
    <section className="education">
      <SectionHeading icon={User} title="Education" />
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
