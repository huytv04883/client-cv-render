import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        placeholder="1.5"
        step={0.1}
        min={1}
        max={3}
        className="font-mono text-sm"
      />
    </div>
  );
}
