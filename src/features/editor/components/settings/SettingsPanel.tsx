import { useRealtimeStyle } from '@/features/editor/hooks/useRealtimeStyle';
import { useSettingsStore } from '@/stores/settingsStore';
import { FIELDS, SETTING_FIELDS, type Settings } from '@/types/setting.type';
import { FontFamilySection } from './FontFamily';
import { FontSizeSection } from './FontSize';
import { MarginsSection } from './Margins';
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
    applyGlobal(FIELDS[key], String(value));
  }

  return (
    <div className="w-full h-[calc(100vh-82px)] max-w-sm space-y-6 bg-white p-6 rounded-lg border border-gray-200 overflow-y-auto">
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
        marginTopBottom={settings.paddingTopBottom}
        marginLeftRight={settings.paddingLeftRight}
        onTopBottomChange={(value) =>
          handleChangeOption(SETTING_FIELDS.PADDING_TOP_BOTTOM, value)
        }
        onLeftRightChange={(value) =>
          handleChangeOption(SETTING_FIELDS.PADDING_LEFT_RIGHT, value)
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
