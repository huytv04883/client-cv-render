import type { ResumeSkill } from '@/types/resume.type';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

type ResumeCoreSkillsProps = {
  data: ResumeSkill[];
};

function ResumeCoreSkills({ data }: ResumeCoreSkillsProps) {
  return (
    <section className="core-skills">
      <SectionHeading title="Core Skills" />
      <div className="core-skills__list">
        {data.map((skill) => (
          <div key={skill.name} className="core-skills__row">
            <span className="core-skills__name">{skill.name}:</span>
            <div className="core-skills__tags">
              {skill.children.map((child) => (
                <span key={child} className="core-skills__tag">
                  {child}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(ResumeCoreSkills);
