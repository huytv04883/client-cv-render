import { useSettingsStore } from '@/stores/settingsStore';
import { SETTING_FIELDS } from '@/types/setting.type';
import type { Section } from './parser-v2/types';
import { A4_HEIGHT_PX } from '@/app/config/constants';

export type PageContent = {
  showHeader: boolean;
  sections: Section[];
};

export type SectionHeight = {
  id: string;
  height: number;
};

// Settings that affect content height (need re-measure DOM)
export const CONTENT_HEIGHT_SETTINGS = [
  SETTING_FIELDS.FONT_SIZE,
  SETTING_FIELDS.FONT_FAMILY_LATIN,
];

export const pageRender = {
  /**
   * Calculate content height based on padding
   */
  getContentHeight(paddingTopBottom: number): number {
    return A4_HEIGHT_PX - paddingTopBottom * 2;
  },

  /**
   * Split sections into pages based on heights
   */
  splitPages(
    sections: Section[],
    headerHeight: number,
    sectionHeightList: SectionHeight[]
  ): PageContent[] {
    const { settings } = useSettingsStore.getState();
    const paddingTopBottom = settings[SETTING_FIELDS.PADDING_TOP_BOTTOM] || 16;
    const paragraphSpacingPx = settings[SETTING_FIELDS.PARAGRAPH_SPACING] || 20;
    const pageContentHeightPx = this.getContentHeight(paddingTopBottom);

    const pages: PageContent[] = [];
    let currentPage: PageContent = { showHeader: true, sections: [] };
    let currentHeight = headerHeight;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const measurement = sectionHeightList[i];

      if (!measurement) continue;

      const sectionHeight = measurement.height;
      const hasContentInPage =
        currentPage.showHeader || currentPage.sections.length > 0;
      const gapNeeded = hasContentInPage ? paragraphSpacingPx : 0;
      const heightToAdd = gapNeeded + sectionHeight;
      const newTotal = currentHeight + heightToAdd;

      if (newTotal > pageContentHeightPx && hasContentInPage) {
        pages.push(currentPage);
        currentPage = { showHeader: false, sections: [] };
        currentHeight = sectionHeight;
        currentPage.sections.push(section);
      } else {
        currentPage.sections.push(section);
        currentHeight = newTotal;
      }
    }

    if (currentPage.showHeader || currentPage.sections.length > 0) {
      pages.push(currentPage);
    }

    return pages.length > 0 ? pages : [{ showHeader: true, sections }];
  },

  /**
   * Measure elements from a container
   */
  measureElements(
    container: HTMLDivElement,
    sections: Section[]
  ): { headerHeight: number; sectionHeights: SectionHeight[] } | null {
    const children = Array.from(container.children).filter(
      (el) => !el.classList.contains('page-number')
    ) as HTMLElement[];

    if (children.length === 0) return null;

    const headerHeight = children[0]?.offsetHeight || 0;
    const sectionHeights = sections.map((section, index) => ({
      id: section.id,
      height: children[index + 1]?.offsetHeight || 0,
    }));

    return { headerHeight, sectionHeights };
  },
};
