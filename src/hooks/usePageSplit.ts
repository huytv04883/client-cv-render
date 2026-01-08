import { A4_HEIGHT_MM, MM_TO_PX } from '@/constant/constant';
import { usePageMeasureStore } from '@/stores/pageMeasureStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { SETTING_FIELDS } from '@/types/setting.type';
import type { Section } from '@/utils/parser-v2/types';
import { useCallback, useMemo, useRef, useState } from 'react';

export type PageContent = {
  showHeader: boolean;
  sections: Section[];
};

export function usePageSplit(sections: Section[]) {
  const { settings } = useSettingsStore();
  const { setMeasurements } = usePageMeasureStore();

  // Calculate page content height based on padding settings
  const pageContentHeightPx = useMemo(() => {
    const paddingTopBottom = settings[SETTING_FIELDS.PADDING_TOP_BOTTOM] || 16;
    const contentHeightMm = A4_HEIGHT_MM - paddingTopBottom * 2;
    return contentHeightMm * MM_TO_PX;
  }, [settings]);

  // Get paragraph spacing for gap calculation
  const paragraphSpacing = useMemo(() => {
    return settings[SETTING_FIELDS.PARAGRAPH_SPACING] || 20;
  }, [settings]);

  // Ref for first page (used for measuring on first load)
  const firstPageRef = useRef<HTMLDivElement>(null);

  // Initial state: all sections in one page (for measuring)
  const [pages, setPages] = useState<PageContent[]>([
    { showHeader: true, sections },
  ]);

  // Split pages based on heights
  const splitPages = useCallback(
    (
      headerHeight: number,
      sectionHeightList: { id: string; height: number }[]
    ) => {
      const newPages: PageContent[] = [];
      let currentPage: PageContent = { showHeader: true, sections: [] };
      let currentHeight = headerHeight + paragraphSpacing;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const measurement = sectionHeightList[i];
        if (!measurement) continue;

        const sectionHeight = measurement.height + paragraphSpacing;

        const hasContent =
          currentPage.showHeader || currentPage.sections.length > 0;
        const wouldExceedHeight =
          currentHeight + sectionHeight > pageContentHeightPx;

        if (hasContent && wouldExceedHeight) {
          newPages.push(currentPage);
          currentPage = { showHeader: false, sections: [] };
          currentHeight = 0;
        }

        currentPage.sections.push(section);
        currentHeight += sectionHeight;

        if (currentHeight >= pageContentHeightPx && i < sections.length - 1) {
          newPages.push(currentPage);
          currentPage = { showHeader: false, sections: [] };
          currentHeight = 0;
        }
      }

      if (currentPage.showHeader || currentPage.sections.length > 0) {
        newPages.push(currentPage);
      }

      setPages(
        newPages.length > 0 ? newPages : [{ showHeader: true, sections }]
      );
    },
    [sections, pageContentHeightPx, paragraphSpacing]
  );

  // Measure from first page (contains all sections on first load) and save to store
  const measureAndSave = useCallback(() => {
    if (!firstPageRef.current) return;

    // Filter out page-number element
    const children = Array.from(firstPageRef.current.children).filter(
      (el) => !el.classList.contains('page-number')
    ) as HTMLElement[];

    if (children.length === 0) return;

    const headerHeight = children[0]?.offsetHeight || 0;
    const sectionHeightList = sections.map((section, index) => ({
      id: section.id,
      height: children[index + 1]?.offsetHeight || 0,
    }));

    // Save to store
    setMeasurements(headerHeight, sectionHeightList);

    // Split pages
    splitPages(headerHeight, sectionHeightList);
  }, [sections, setMeasurements, splitPages]);

  // Recalculate pages from stored measurements (when settings change)
  const recalculateFromStore = useCallback(() => {
    // Get latest values directly from store
    const store = usePageMeasureStore.getState();
    const { headerHeight, sectionHeights: storedSections } = store;

    if (headerHeight === 0 || storedSections.length === 0) {
      return;
    }
    splitPages(headerHeight, storedSections);
  }, [splitPages]);

  return {
    firstPageRef,
    pages,
    measureAndSave,
    recalculateFromStore,
    pageContentHeightPx,
    paragraphSpacing,
  };
}
