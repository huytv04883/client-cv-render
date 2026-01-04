export interface SettingOption {
  value: string | number;
  onChange: (value: string | number) => void;
}

export enum SETTING_FIELDS {
  PAPER_SIZE = 'paperSize',
  THEME_COLOR = 'themeColor',
  FONT_FAMILY_LATIN = 'fontFamilyLatin',
  FONT_SIZE = 'fontSize',
  PADDING_TOP_BOTTOM = 'paddingTopBottom',
  PADDING_LEFT_RIGHT = 'paddingLeftRight',
  PARAGRAPH_SPACING = 'paragraphSpacing',
}
export interface Settings {
  [SETTING_FIELDS.PAPER_SIZE]: string;
  [SETTING_FIELDS.THEME_COLOR]: string;
  [SETTING_FIELDS.FONT_FAMILY_LATIN]: string;
  [SETTING_FIELDS.FONT_SIZE]: number;
  [SETTING_FIELDS.PADDING_TOP_BOTTOM]: number;
  [SETTING_FIELDS.PADDING_LEFT_RIGHT]: number;
  [SETTING_FIELDS.PARAGRAPH_SPACING]: number;
}

export const FIELDS = {
  [SETTING_FIELDS.THEME_COLOR]: ['color', 'border-color'],
  [SETTING_FIELDS.FONT_SIZE]: ['font-size'],
  [SETTING_FIELDS.FONT_FAMILY_LATIN]: ['font-family'],
  [SETTING_FIELDS.PADDING_TOP_BOTTOM]: ['padding-top', 'padding-bottom'],
  [SETTING_FIELDS.PADDING_LEFT_RIGHT]: ['padding-left', 'padding-right'],
  [SETTING_FIELDS.PARAGRAPH_SPACING]: ['gap'],
} as unknown as Record<SETTING_FIELDS, string[]>;
