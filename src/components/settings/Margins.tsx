import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Scaling as Spacing } from 'lucide-react';

type MarginsSectionProps = {
  marginTopBottom: number;
  marginLeftRight: number;
  onTopBottomChange: (value: number) => void;
  onLeftRightChange: (value: number) => void;
};

export function MarginsSection({
  marginTopBottom,
  marginLeftRight,
  onTopBottomChange,
  onLeftRightChange,
}: MarginsSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold">
        <Spacing className="w-5 h-5" />
        Margins
      </Label>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Top & Bottom</span>
          <span className="text-gray-700 font-medium">{marginTopBottom}px</span>
        </div>
        <Slider
          value={[marginTopBottom]}
          onValueChange={(val) => onTopBottomChange(val[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0px</span>
          <span>50px</span>
          <span>100px</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Left & Right</span>
          <span className="text-gray-700 font-medium">{marginLeftRight}px</span>
        </div>
        <Slider
          value={[marginLeftRight]}
          onValueChange={(val) => onLeftRightChange(val[0])}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0px</span>
          <span>50px</span>
          <span>100px</span>
        </div>
      </div>
    </div>
  );
}
