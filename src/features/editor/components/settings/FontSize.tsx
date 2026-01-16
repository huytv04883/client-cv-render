import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';
import type { SettingOption } from '@/types/setting.type';
import { Type } from 'lucide-react';

type FontSizeSectionProps = SettingOption & {
  // Todo: more props
};

export function FontSizeSection({ value, onChange }: FontSizeSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <Type className="w-5 h-5" />
        Font Size
      </Label>
      <div className="space-y-2">
        <Slider
          value={[value as number]}
          onValueChange={(val) => onChange(val[0])}
          min={12}
          max={30}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>12px</span>
          <span className="font-semibold text-gray-700">{value}px</span>
          <span>30px</span>
        </div>
      </div>
    </div>
  );
}
