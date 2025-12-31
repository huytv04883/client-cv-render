import { SETTING_FIELDS, type Settings } from '@/types/setting.type';
import { create } from 'zustand';

const initialSettings = {
  [SETTING_FIELDS.PAPER_SIZE]: 'A4',
  [SETTING_FIELDS.THEME_COLOR]: '#000000',
  [SETTING_FIELDS.FONT_FAMILY_LATIN]: 'Minion Pro',
  [SETTING_FIELDS.FONT_SIZE]: 16,
  [SETTING_FIELDS.MARGIN_TOP_BOTTOM]: 50,
  [SETTING_FIELDS.MARGIN_LEFT_RIGHT]: 50,
  [SETTING_FIELDS.PARAGRAPH_SPACING]: 1.5,
};

type SettingsState = {
  settings: Settings;
  handleSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: initialSettings,
  handleSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    }));
  },
}));
