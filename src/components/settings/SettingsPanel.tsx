import { useSettingsStore } from '@/stores/settingsStore';
import { SETTING_FIELDS } from '@/types/setting.type';
import { FontFamilySection } from './FontFamily';
import { FontSizeSection } from './FontSize';
import { MarginsSection } from './Margins';
import { PaperSizeSection } from './PaperSize';
import { ParagraphSpacingSection } from './ParagraphSpacing';
import { ThemeColorSection } from './ThemeColor';

export function SettingsPanel() {
  const { settings, handleSettingChange } = useSettingsStore();

  return (
    <div className="w-full h-[calc(100vh-32px)] max-w-sm space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <PaperSizeSection
        value={settings.paperSize}
        onChange={(value) =>
          handleSettingChange(SETTING_FIELDS.PAPER_SIZE, value as string)
        }
      />

      <ThemeColorSection
        value={settings.themeColor}
        onChange={(value) =>
          handleSettingChange(SETTING_FIELDS.THEME_COLOR, value as string)
        }
        onColorClick={(color) =>
          handleSettingChange(SETTING_FIELDS.THEME_COLOR, color)
        }
      />

      <FontFamilySection
        value={settings.fontFamilyLatin}
        onChange={(value) =>
          handleSettingChange(SETTING_FIELDS.FONT_FAMILY_LATIN, value as string)
        }
      />

      <FontSizeSection
        value={settings.fontSize}
        onChange={(value) =>
          handleSettingChange(SETTING_FIELDS.FONT_SIZE, value as number)
        }
      />

      <MarginsSection
        marginTopBottom={settings.marginTopBottom}
        marginLeftRight={settings.marginLeftRight}
        onTopBottomChange={(value) =>
          handleSettingChange(SETTING_FIELDS.MARGIN_TOP_BOTTOM, value)
        }
        onLeftRightChange={(value) =>
          handleSettingChange(SETTING_FIELDS.MARGIN_LEFT_RIGHT, value)
        }
      />

      <ParagraphSpacingSection
        value={settings.paragraphSpacing}
        onChange={(value) =>
          handleSettingChange(SETTING_FIELDS.PARAGRAPH_SPACING, value as number)
        }
      />
    </div>
  );
}
