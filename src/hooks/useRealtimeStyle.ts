import type { CssSection } from '@/utils/parser/parseCssEditor';
import { useCallback, useEffect, useRef } from 'react';

type SectionMap = Map<string, CssSection>;

export function useRealtimeStyle() {
  const styleElRef = useRef<HTMLStyleElement | null>(null);
  const sectionsRef = useRef<SectionMap>(new Map());

  // Initialize style element
  useEffect(() => {
    let styleEl = document.getElementById(
      'style-cv'
    ) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'style-cv';
      document.head.appendChild(styleEl);
    }

    styleElRef.current = styleEl;

    return () => {
      styleEl.remove();
      styleElRef.current = null;
      sectionsRef.current.clear();
    };
  }, []);

  const apply = useCallback(() => {
    if (!styleElRef.current) return;

    let cssText = '';

    sectionsRef.current.forEach((css, name) => {
      cssText += `/* ===== @section ${name} ===== */ \n ${css.cssText} \n\n`;
    });

    styleElRef.current.innerHTML = cssText;
  }, []);

  const updateSection = useCallback(
    (section: string, css: CssSection) => {
      if (!section) return;
      sectionsRef.current.set(section, css);
      apply();
    },
    [apply]
  );

  const removeSection = useCallback(
    (section: string) => {
      sectionsRef.current.delete(section);
      apply();
    },
    [apply]
  );

  const setAll = useCallback(
    (map: SectionMap) => {
      sectionsRef.current = new Map(map);
      apply();
    },
    [apply]
  );

  const clear = useCallback(() => {
    sectionsRef.current.clear();
    if (styleElRef.current) {
      styleElRef.current.innerHTML = '';
    }
  }, []);

  return {
    updateSection,
    removeSection,
    setAll,
    clear,
  };
}
