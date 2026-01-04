import type { ResumeData } from '@/types/resume.type';
import ResumeCoreSkills from './ResumeCoreSkills';
import ResumeExperience from './ResumeExperience';
import ResumeHeader from './ResumeHeader';
import ResumeSummary from './ResumeSummary';
import ResumeEducation from './ResumeEducation';

type ResumeProps = {
  data: ResumeData;
};

function Resume({ data }: ResumeProps) {
  const { header, summaryLines, coreSkills, experiences, education } = data;
  return (
    <div
      id="resume-preview"
      className="h-[calc(100vh-35px)] overflow-y-auto border-solid border-l border-gray-200"
    >
      <ResumeHeader data={header} />
      <ResumeSummary summary={summaryLines} />
      <ResumeCoreSkills data={coreSkills} />
      <ResumeExperience data={experiences} />
      <ResumeEducation education={education} />
    </div>
  );
}

export default Resume;
