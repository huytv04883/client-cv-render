import type { CssSection } from '@/utils/parser/parseCssEditor';
import { useCallback, useEffect, useRef } from 'react';

type SectionMap = Map<string, CssSection>;

export function useRealtimeStyle() {
  const sectionsStyleElRef = useRef<HTMLStyleElement | null>(null);
  const globalStyleElRef = useRef<HTMLStyleElement | null>(null);
  const sectionsRef = useRef<SectionMap>(new Map());
  const globalStyleRef = useRef<SectionMap>(new Map());

  // Initialize style element
  useEffect(() => {
    let styleEl = document.getElementById(
      'style-cv'
    ) as HTMLStyleElement | null;

    let globalStyleEl = document.getElementById(
      'style-global'
    ) as HTMLStyleElement | null;

    if (!globalStyleEl) {
      globalStyleEl = document.createElement('style');
      globalStyleEl.id = 'style-global';
      document.head.appendChild(globalStyleEl);
    }

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'style-cv';
      document.head.appendChild(styleEl);
    }

    sectionsStyleElRef.current = styleEl;
    globalStyleElRef.current = globalStyleEl;
    const sections = sectionsRef.current;
    const globalStyles = globalStyleRef.current;

    return () => {
      styleEl?.remove();
      globalStyleEl?.remove();
      globalStyleElRef.current = null;
      sectionsStyleElRef.current = null;
      sections.clear();
      globalStyles.clear();
    };
  }, []);

  const apply = useCallback(() => {
    if (!sectionsStyleElRef.current) return;

    let cssText = '';

    sectionsRef.current.forEach((css, name) => {
      cssText += `/* ===== @section ${name} ===== */ \n ${css.cssText} \n\n`;
    });

    sectionsStyleElRef.current.innerHTML = cssText;
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
    if (sectionsStyleElRef.current) {
      sectionsStyleElRef.current.innerHTML = '';
    }
  }, []);

  return {
    updateSection,
    removeSection,
    setAll,
    clear,
  };
}
