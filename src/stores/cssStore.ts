import { isObject } from 'lodash-es';
import { create } from 'zustand';

type Styles = {
  [key: string]: unknown;
};

type CounterState = {
  styles: Styles;
  setNewCss: (newCss: unknown) => void;
};

export const useCssStore = create<CounterState>((set) => ({
  styles: {},
  setNewCss: (newCss: unknown) => {
    let cs: Styles = {};
    if (!isObject(newCss)) return;
    for (const [key, value] of Object.entries(newCss)) {
      cs[key] = value;
    }
    // Extract section-specific styles for easier access
    cs = {
      ...cs,
      GLOBAL: (cs['sections'] as Map<string, unknown>).get('ALL') || {},
      HEADER: (cs['sections'] as Map<string, unknown>).get('HEADER') || {},
      CORE_SKILLS:
        (cs['sections'] as Map<string, unknown>).get('CORE_SKILLS') || {},
      WORK_EXPERIENCE:
        (cs['sections'] as Map<string, unknown>).get('WORK_EXPERIENCE') || {},
      EDUCATION:
        (cs['sections'] as Map<string, unknown>).get('EDUCATION') || {},
    };
    set(() => ({ styles: cs }));
  },
}));
