import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FONT_FAMILIES_LATIN } from '@/constant/constant';
import type { SettingOption } from '@/types/setting.type';
import { Type } from 'lucide-react';

type FontFamilySectionProps = SettingOption & {};

export function FontFamilySection({ value, onChange }: FontFamilySectionProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <Type className="w-5 h-5" />
        Font Family
      </Label>
      <div className="grid grid-cols-1 gap-2">
        <div className="space-y-2">
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES_LATIN.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
