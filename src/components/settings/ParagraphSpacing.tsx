import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { SettingOption } from '@/types/setting.type';
import { Type } from 'lucide-react';

type ParagraphSpacingSectionProps = SettingOption & {};

export function ParagraphSpacingSection({
  value,
  onChange,
}: ParagraphSpacingSectionProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-200">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <Type className="w-5 h-5" />
        Paragraph Spacing
      </Label>
      <div className="space-y-2">
        <Slider
          value={[Number(value)]}
          onValueChange={(vals) => onChange(vals[0])}
          min={0}
          max={50}
          step={1}
          className="flex-1"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0px</span>
          <span>25px</span>
          <span>50px</span>
        </div>
      </div>
    </div>
  );
}
