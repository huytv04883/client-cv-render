import type { ResumeData } from '@/types/resume.type';
import ResumeHeader from './ResumeHeader';

type ResumeProps = {
  data: ResumeData;
};

function Resume({ data }: ResumeProps) {
  const { header } = data;

  return (
    <div id="resume-preview">
      <ResumeHeader data={header} />
      {/* <ResumeSummary summary={summaryLines} />
      <ResumeCoreSkills data={coreSkills} />
      <ResumeExperience data={experiences} /> */}
    </div>
  );
}

export default Resume;
