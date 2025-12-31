export interface SettingOption {
  value: string | number;
  onChange: (value: string | number) => void;
}

export enum SETTING_FIELDS {
  PAPER_SIZE = 'paperSize',
  THEME_COLOR = 'themeColor',
  FONT_FAMILY_LATIN = 'fontFamilyLatin',
  FONT_SIZE = 'fontSize',
  MARGIN_TOP_BOTTOM = 'marginTopBottom',
  MARGIN_LEFT_RIGHT = 'marginLeftRight',
  PARAGRAPH_SPACING = 'paragraphSpacing',
}
export interface Settings {
  [SETTING_FIELDS.PAPER_SIZE]: string;
  [SETTING_FIELDS.THEME_COLOR]: string;
  [SETTING_FIELDS.FONT_FAMILY_LATIN]: string;
  [SETTING_FIELDS.FONT_SIZE]: number;
  [SETTING_FIELDS.MARGIN_TOP_BOTTOM]: number;
  [SETTING_FIELDS.MARGIN_LEFT_RIGHT]: number;
  [SETTING_FIELDS.PARAGRAPH_SPACING]: number;
}
