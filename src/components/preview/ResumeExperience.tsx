import type { WorkExperience } from '@/types/resume.type';
import { Briefcase } from 'lucide-react';
import { memo } from 'react';
import SectionHeading from './SectionHeading';

type ResumeExperienceProps = {
  data: WorkExperience[];
};

function ResumeExperience({ data }: ResumeExperienceProps) {
  return (
    <section className="experience">
      <SectionHeading icon={Briefcase} title="Work Experience" />
      <div className="experience__list">
        {data.map((experience) => (
          <div key={experience.company} className="experience__item">
            <div className="experience__header">
              <div>
                <h3 className="experience__company">{experience.company}</h3>
                {experience.role && (
                  <p className="experience__role">{experience.role}</p>
                )}
              </div>
              {experience.duration && (
                <span className="experience__duration">
                  {experience.duration}
                </span>
              )}
            </div>

            {experience.description && (
              <p className="experience__description">
                {experience.description}
              </p>
            )}

            {experience.projects && experience.projects.length > 0 && (
              <div className="experience__projects">
                {experience.projects.map((project) => (
                  <div key={project.name} className="experience__project">
                    <h4 className="experience__project-name">{project.name}</h4>
                    {project.responsibilities &&
                      project.responsibilities.length > 0 && (
                        <ul className="experience__responsibilities">
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
