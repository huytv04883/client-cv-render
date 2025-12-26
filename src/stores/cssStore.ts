import { isObject } from 'lodash-es';
import { create } from 'zustand';

type CounterState = {
  styles: unknown;
  setNewCss: (newCss: unknown) => void;
};

export const useCssStore = create<CounterState>((set) => ({
  styles: {},
  setNewCss: (newCss: unknown) => {
    const cs: Array<Record<string, unknown>> = [];
    if (!isObject(newCss)) return;
    for (const [key, value] of Object.entries(newCss)) {
      cs.push({
        [`${key}`]: value,
      });
    }
    set(() => ({ styles: cs }));
  },
}));
