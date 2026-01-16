import DEFAULT_CSS from '@/shared/templates/defaultCss.css?raw';
import { useCallback, useEffect, useRef } from 'react';
import { parseCssEditor } from '../../../shared/utils/parser/parseCssEditor';
import type { CssSection } from '@/types/css.type';
import {
  createInstanceStyle,
  replaceCssAttrValue,
} from '../../../shared/utils/replaceField';

export type SectionMap = Map<string, CssSection>;

const sections = parseCssEditor(DEFAULT_CSS);

export function useRealtimeStyle() {
  const sectionStyleTagRef = useRef<HTMLStyleElement | null>(null);
  const globalStyleTagRef = useRef<HTMLStyleElement | null>(null);

  const sectionCssMapRef = useRef<SectionMap>(new Map());
  const globalCssMapRef = useRef<SectionMap>(sections.sections);

  const applySections = useCallback(() => {
    if (!sectionStyleTagRef.current) return;

    let cssText = '';
    sectionCssMapRef.current.forEach((css, name) => {
      cssText += `/* ===== @section ${name} ===== */ \n ${css.cssText} \n\n`;
    });

    sectionStyleTagRef.current.innerHTML = cssText;
  }, []);

  const applyGlobal = useCallback((fields?: string[], value?: string) => {
    if (!globalStyleTagRef.current) return;

    let globalCssText = '';
    globalCssMapRef.current.forEach((css, name) => {
      const updatedCss = { ...css };
      if (fields && value) {
        updatedCss.cssText = replaceCssAttrValue(fields, css.cssText, value);
        globalCssMapRef.current.set(name, updatedCss);
      }
      globalCssText += `/* ===== @section ${name} ===== */ \n ${updatedCss.cssText} \n\n`;
    });
    globalStyleTagRef.current.innerHTML = globalCssText;
  }, []);

  const updateSection = useCallback(
    (section: string, css: CssSection) => {
      if (!section) return;

      if (section === 'SETTINGS' || section === 'ALL') {
        globalCssMapRef.current.set(section, css);
        applyGlobal();
      } else {
        sectionCssMapRef.current.set(section, css);
        applySections();
      }
    },
    [applySections, applyGlobal]
  );

  const removeSection = useCallback(
    (section: string) => {
      sectionCssMapRef.current.delete(section);
      applySections();
    },
    [applySections]
  );

  const setAll = useCallback(
    (map: SectionMap) => {
      sectionCssMapRef.current = new Map(map);
      applySections();
    },
    [applySections]
  );

  const clear = useCallback(() => {
    sectionCssMapRef.current.clear();
    globalCssMapRef.current.clear();

    if (sectionStyleTagRef.current) {
      sectionStyleTagRef.current.innerHTML = '';
    }

    if (globalStyleTagRef.current) {
      globalStyleTagRef.current.innerHTML = '';
    }
  }, []);

  useEffect(() => {
    const commonCvm = createInstanceStyle('common-cvm');
    const sectionCvm = createInstanceStyle('section-cvm');

    sectionStyleTagRef.current = sectionCvm;
    globalStyleTagRef.current = commonCvm;

    const sectionMap = sectionCssMapRef.current;
    const globalMap = globalCssMapRef.current;

    return () => {
      sectionCvm?.remove();
      commonCvm?.remove();

      sectionStyleTagRef.current = null;
      globalStyleTagRef.current = null;

      sectionMap.clear();
      globalMap.clear();
    };
  }, []);

  useEffect(() => {
    // Initialize default CSS
    if (!DEFAULT_CSS) return;
    const sections = parseCssEditor(DEFAULT_CSS); //@TODO: Load from BE
    sections.sections.forEach((css, name) => {
      updateSection(name, css);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    updateSection,
    applyGlobal,
    removeSection,
    setAll,
    clear,
  };
}
