import { useRealtimeStyle } from '@/hooks/useRealtimeStyle';
import { useSettingsStore } from '@/stores/settingsStore';
import { FIELDS, SETTING_FIELDS, type Settings } from '@/types/setting.type';
import { FontFamilySection } from './FontFamily';
import { FontSizeSection } from './FontSize';
import { MarginsSection } from './Margins';
import { PaperSizeSection } from './PaperSize';
import { ParagraphSpacingSection } from './ParagraphSpacing';
import { ThemeColorSection } from './ThemeColor';

export function SettingsPanel() {
  const { settings, handleSettingChange } = useSettingsStore();
  const { applyGlobal } = useRealtimeStyle();

  function handleChangeOption<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    handleSettingChange(key, value);
    const fields = renderFields(key);
    applyGlobal(fields, String(value));
  }

  function renderFields<K extends keyof Settings>(k: K) {
    if (k === SETTING_FIELDS.THEME_COLOR) {
      return ['color', 'border-color'];
    }
    return [FIELDS[k]];
  }

  return (
    <div className="w-full h-[calc(100vh-32px)] max-w-sm space-y-6 bg-white p-6 rounded-lg border border-gray-200 overflow-y-auto">
      <PaperSizeSection
        value={settings.paperSize}
        onChange={(value) =>
          handleChangeOption(SETTING_FIELDS.PAPER_SIZE, value as string)
        }
      />

      <ThemeColorSection
        value={settings.themeColor}
        onChange={(value) =>
          handleChangeOption(SETTING_FIELDS.THEME_COLOR, value as string)
        }
        onColorClick={(color) =>
          handleChangeOption(SETTING_FIELDS.THEME_COLOR, color)
        }
      />

      <FontFamilySection
        value={settings.fontFamilyLatin}
        onChange={(value) =>
          handleChangeOption(SETTING_FIELDS.FONT_FAMILY_LATIN, value as string)
        }
      />

      <FontSizeSection
        value={settings.fontSize}
        onChange={(value) =>
          handleChangeOption(SETTING_FIELDS.FONT_SIZE, value as number)
        }
      />

      <MarginsSection
        marginTopBottom={settings.marginTopBottom}
        marginLeftRight={settings.marginLeftRight}
        onTopBottomChange={(value) =>
          handleChangeOption(SETTING_FIELDS.MARGIN_TOP_BOTTOM, value)
        }
        onLeftRightChange={(value) =>
          handleChangeOption(SETTING_FIELDS.MARGIN_LEFT_RIGHT, value)
        }
      />

      <ParagraphSpacingSection
        value={settings.paragraphSpacing}
        onChange={(value) =>
          handleChangeOption(SETTING_FIELDS.PARAGRAPH_SPACING, value as number)
        }
      />
    </div>
  );
}
