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
    <header className="header">
      <h1 className="header__name">{name}</h1>
      {title && <p className="header__title">{title}</p>}
      <div className="header__contact">
        {email && (
          <a href={`mailto:${email}`} className="header__contact-item">
            <Mail size={14} />
            {email}
          </a>
        )}

        {phone && (
          <a href={`tel:${phone}`} className="header__contact-item">
            <Phone size={14} />
            {phone}
          </a>
        )}

        {location && (
          <span className="header__contact-item">
            <MapPin size={14} />
            {location}
          </span>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="header__contact-item"
          >
            <Github size={14} />
            {github}
          </a>
        )}

        {years_experience && (
          <span className="header__contact-item">
            <Target size={14} />
            {years_experience} years exp.
          </span>
        )}
      </div>
    </header>
  );
}

export default memo(ResumeHeader);
