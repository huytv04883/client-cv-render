import { create } from 'zustand';

export type SectionMeasurement = {
  id: string;
  height: number;
};

type PageMeasureState = {
  headerHeight: number;
  sectionHeights: SectionMeasurement[];
  setHeaderHeight: (height: number) => void;
  setSectionHeights: (heights: SectionMeasurement[]) => void;
  setMeasurements: (
    headerHeight: number,
    sectionHeights: SectionMeasurement[]
  ) => void;
};

export const usePageMeasureStore = create<PageMeasureState>((set) => ({
  headerHeight: 0,
  sectionHeights: [],
  setHeaderHeight: (height) => set({ headerHeight: height }),
  setSectionHeights: (heights) => set({ sectionHeights: heights }),
  setMeasurements: (headerHeight, sectionHeights) =>
    set({ headerHeight, sectionHeights }),
}));
