import type { ResumeMeta } from '@/types/resume.type';
import { Github, Mail, MapPin, Phone, Target } from 'lucide-react';
import { memo } from 'react';

type ResumeHeaderProps = {
  data: ResumeMeta;
};

function ResumeHeader({ data }: ResumeHeaderProps) {
  const { name, title, email, phone, location, github, years_experience } =
    data;

  return (
    <header className="text-center pb-4 border-b border-gray-200 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{name}</h1>

      {title && (
        <p className="text-lg text-blue-600 font-medium mb-3">{title}</p>
      )}

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Mail size={14} />
            {email}
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Phone size={14} />
            {phone}
          </a>
        )}

        {location && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            {location}
          </span>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Github size={14} />
            {github}
          </a>
        )}

        {years_experience && (
          <span className="inline-flex items-center gap-1">
            <Target size={14} />
            {years_experience} years exp.
          </span>
        )}
      </div>
    </header>
  );
}

export default memo(ResumeHeader);
