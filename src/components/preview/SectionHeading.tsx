import type { LucideIcon } from 'lucide-react';

type SectionHeadingProps = {
  icon: LucideIcon;
  title: string;
};

export default function SectionHeading({
  icon: Icon,
  title,
}: SectionHeadingProps) {
  return (
    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
      <Icon size={20} className="text-blue-600" />
      {title}
    </h2>
  );
}
