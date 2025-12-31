import { memo } from 'react';
import SectionHeading from './SectionHeading';

function ResumeSummary({ summary }: { summary: string }) {
  return (
    <section className="mb-6">
      <SectionHeading title="Summary" />
      <p className="text-gray-700 leading-relaxed text-left">{summary}</p>
    </section>
  );
}

export default memo(ResumeSummary);
