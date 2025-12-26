import type { ResumeData } from '@/types/resume.type';
import ResumeCoreSkills from './ResumeCoreSkills';
import ResumeExperience from './ResumeExperience';
import ResumeHeader from './ResumeHeader';
import ResumeSummary from './ResumeSummary';

type ResumeProps = {
  data: ResumeData;
};

function Resume({ data }: ResumeProps) {
  const { header, summaryLines, coreSkills, experiences } = data;

  return (
    <div className="h-full overflow-y-auto flex flex-col rounded-lg overflow-hidden border-solid border border-gray-200 p-5">
      <ResumeHeader data={header} />
      <ResumeSummary summary={summaryLines} />
      <ResumeCoreSkills data={coreSkills} />
      <ResumeExperience data={experiences} />
    </div>
  );
}

export default Resume;
