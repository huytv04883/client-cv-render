import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { THEME_COLORS } from '@/constant/constant';
import { cn } from '@/lib/utils';
import type { SettingOption } from '@/types/setting.type';
import { Palette } from 'lucide-react';

type ThemeColorSectionProps = SettingOption & {
  onColorClick: (color: string) => void;
};

export function ThemeColorSection({
  value,
  onChange,
  onColorClick,
}: ThemeColorSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <Palette className="w-5 h-5" />
        Theme Color
      </Label>
      <div className="flex gap-2 flex-wrap">
        {THEME_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onColorClick(color)}
            className={cn(
              'w-5 h-5 rounded transition-all',
              value === color ? 'ring-2 ring-offset-1 ring-gray-400' : ''
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#377BB5"
        className="text-sm"
      />
    </div>
  );
}
