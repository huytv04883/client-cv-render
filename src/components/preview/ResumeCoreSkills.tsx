import type { ResumeSkill } from '@/types/resume.type';
import { Wrench } from 'lucide-react';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

type ResumeCoreSkillsProps = {
  data: ResumeSkill[];
};

function ResumeCoreSkills({ data }: ResumeCoreSkillsProps) {
  return (
    <section className="resume-core-skills-section">
      <SectionHeading icon={Wrench} title="Core Skills" />
      <div className="resume-skills-list">
        {data.map((skill, index) => (
          <div key={index} className="resume-skill-row">
            <span className="resume-skill-name">{skill.name}:</span>
            <div className="resume-skill-tags">
              {skill.children.map((child) => (
                <span key={child} className="resume-skill-tag">
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
