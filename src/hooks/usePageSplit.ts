import { usePageMeasureStore } from '@/stores/pageMeasureStore';
import { useSettingsStore } from '@/stores/settingsStore';
import {
  CONTENT_HEIGHT_SETTINGS,
  pageRender,
  type PageContent,
} from '@/utils/caculatePageRender';
import type { Section } from '@/utils/parser-v2/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export function usePageSplit(sections: Section[]) {
  const { setMeasurements } = usePageMeasureStore();
  const [pages, setPages] = useState<PageContent[]>(() => [
    { showHeader: true, sections },
  ]);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const firstPageRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const prevSettingsRef = useRef(useSettingsStore.getState().settings);

  // Split pages using pageRender utility
  const splitPages = useCallback(
    (
      headerHeight: number,
      sectionHeightList: { id: string; height: number }[]
    ) => {
      const newPages = pageRender.splitPages(
        sections,
        headerHeight,
        sectionHeightList
      );
      setPages(newPages);
    },
    [sections]
  );

  // Measure from first page and save to store
  const measureAndSave = useCallback(() => {
    if (!firstPageRef.current) return;

    const measurements = pageRender.measureElements(
      firstPageRef.current,
      sections
    );
    if (!measurements) return;

    const { headerHeight, sectionHeights } = measurements;
    setMeasurements(headerHeight, sectionHeights);
    splitPages(headerHeight, sectionHeights);
    setIsMeasuring(false);
  }, [sections, setMeasurements, splitPages]);

  // Recalculate pages from stored measurements
  const recalculateFromStore = useCallback(() => {
    const { headerHeight, sectionHeights } = usePageMeasureStore.getState();
    if (headerHeight === 0 || sectionHeights.length === 0) return;
    splitPages(headerHeight, sectionHeights);
  }, [splitPages]);

  // Start measuring (reset to single page)
  const startMeasuring = useCallback(() => {
    setIsMeasuring(true);
    setPages([{ showHeader: true, sections }]);
  }, [sections]);

  // Handle sections change - measure on first load
  useEffect(() => {
    startMeasuring();
    const timer = setTimeout(measureAndSave, 100);
    return () => clearTimeout(timer);
  }, [sections, startMeasuring, measureAndSave]);

  // Subscribe to settings changes
  useEffect(() => {
    const unsubscribe = useSettingsStore.subscribe((state) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        prevSettingsRef.current = state.settings;
        return;
      }

      const prevSettings = prevSettingsRef.current;
      const newSettings = state.settings;
      prevSettingsRef.current = newSettings;

      // Check if content height settings changed
      const needsRemeasure = CONTENT_HEIGHT_SETTINGS.some(
        (key) => newSettings[key] !== prevSettings[key]
      );

      if (needsRemeasure) {
        // Font changed - re-measure DOM
        startMeasuring();
        setTimeout(measureAndSave, 100);
      } else {
        // Layout settings changed - recalculate from store
        recalculateFromStore();
      }
    });

    return unsubscribe;
  }, [startMeasuring, measureAndSave, recalculateFromStore]);

  return {
    firstPageRef,
    pages,
    isMeasuring,
  };
}
