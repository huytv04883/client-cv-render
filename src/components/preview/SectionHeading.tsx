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
    <h2 className="section-heading">
      <Icon size={20} className="section-heading__icon" />
      {title}
    </h2>
  );
}
