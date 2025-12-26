import type { WorkExperience } from '@/types/resume.type';
import { Briefcase } from 'lucide-react';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

type ResumeExperienceProps = {
  data: WorkExperience[];
};

function ResumeExperience({ data }: ResumeExperienceProps) {
  return (
    <section className="mb-6">
      <SectionHeading icon={Briefcase} title="Work Experience" />
      <div className="space-y-6">
        {data.map((experience) => (
          <div
            key={experience.company}
            className="relative pl-4 border-l-2 border-blue-200"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {experience.company}
                </h3>
                {experience.role && (
                  <p className="text-blue-600 font-medium">{experience.role}</p>
                )}
              </div>
              {experience.duration && (
                <span className="text-sm text-gray-500 italic">
                  {experience.duration}
                </span>
              )}
            </div>

            {experience.description && (
              <p className="text-gray-600 text-sm mb-3 text-left">
                {experience.description}
              </p>
            )}

            {experience.projects && experience.projects.length > 0 && (
              <div className="space-y-4 mt-3">
                {experience.projects.map((project) => (
                  <div key={project.name}>
                    <h4 className="font-medium text-gray-800 mb-1 text-left">
                      {project.name}
                    </h4>
                    {project.responsibilities &&
                      project.responsibilities.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm text-left">
                          {project.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(ResumeExperience);
