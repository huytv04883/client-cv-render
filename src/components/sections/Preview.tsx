import { usePageSplit } from '@/hooks/usePageSplit';
import { useSettingsStore } from '@/stores/settingsStore';
import type { ParsedResume } from '@/utils/parser-v2/types';
import { useEffect, useRef } from 'react';
import ResumeHeader from '../preview/ResumeHeader';
import { DynamicSection } from './DynamicSection';

type PreviewProps = {
  data: ParsedResume;
};

function Preview({ data }: PreviewProps) {
  const { header, sections } = data;
  const { settings } = useSettingsStore();
  const { firstPageRef, pages, measureAndSave, recalculateFromStore } =
    usePageSplit(sections);
  const isFirstRender = useRef(true);
  const hasMeasured = useRef(false);

  useEffect(() => {
    if (hasMeasured.current) return;

    const timer = setTimeout(() => {
      measureAndSave();
      hasMeasured.current = true;
    }, 100);
    return () => clearTimeout(timer);
    // Init data page
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    recalculateFromStore();
  }, [settings]);

  return (
    <div className="h-[calc(100vh-82px)] overflow-auto bg-gray-100 border-solid border-l border-gray-200 p-6">
      <div className="flex flex-col gap-6 mx-auto items-center">
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            id="resume-preview"
            data-page={pageIndex + 1}
            className="relative"
            ref={pageIndex === 0 ? firstPageRef : undefined}
          >
            {page.showHeader && <ResumeHeader data={header} />}
            {page.sections.map((section) => (
              <DynamicSection key={section.id} section={section} />
            ))}
            <div className="page-number absolute bottom-2 right-4 text-xs text-gray-400">
              {pageIndex + 1} / {pages.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
