import { PAPER_SIZES } from '@/app/config/constants';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import type { SettingOption } from '@/types/setting.type';
import { FileText } from 'lucide-react';

type PaperSizeSectionProps = SettingOption & {};

export function PaperSizeSection({ value, onChange }: PaperSizeSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <FileText className="w-5 h-5" />
        Paper Size
      </Label>
      <Select value={value as string} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PAPER_SIZES.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
