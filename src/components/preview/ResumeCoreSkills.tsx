import type { ResumeSkill } from '@/types/resume.type';
import { Wrench } from 'lucide-react';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

type ResumeCoreSkillsProps = {
  data: ResumeSkill[];
};

function ResumeCoreSkills({ data }: ResumeCoreSkillsProps) {
  return (
    <section className="mb-6">
      <SectionHeading icon={Wrench} title="Core Skills" />
      <div className="space-y-3">
        {data.map((skill, index) => (
          <div key={index} className="flex flex-wrap items-start gap-2">
            <span className="font-semibold text-gray-800 min-w-[120px]">
              {skill.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {skill.children.map((child) => (
                <span
                  key={child}
                  className="px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded-md"
                >
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
