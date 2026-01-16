import { usePageSplit } from '@/shared/hooks/usePageSplit';
import ResumeHeader from '../preview/ResumeHeader';
import { DynamicSection } from './DynamicSection';
import type { ParsedResume } from '@/shared/utils/parser-v2/types';

type PreviewProps = {
  data: ParsedResume;
};

function Preview({ data }: PreviewProps) {
  const { header, sections } = data;
  const { firstPageRef, pages, isMeasuring } = usePageSplit(sections);

  return (
    <div className="h-[calc(100vh-82px)] overflow-auto bg-gray-100 border-solid border-l border-gray-200 p-6 mr-2">
      <div className="flex flex-col gap-6 mx-auto items-center">
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            id="resume-preview"
            data-page={pageIndex + 1}
            className="relative"
            ref={pageIndex === 0 ? firstPageRef : undefined}
            style={
              isMeasuring && pageIndex === 0
                ? { height: 'auto', overflow: 'visible' }
                : undefined
            }
          >
            {page.showHeader && <ResumeHeader data={header} />}
            {page.sections.map((section) => (
              <DynamicSection key={section.id} section={section} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
