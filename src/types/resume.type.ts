export interface ResumeMeta {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  years_experience?: string;
  role_target?: string;
}

export interface ResumeSkill {
  name: string;
  children: string[];
}

export interface ExperienceProject {
  name: string;
  responsibilities?: string[];
}

export interface WorkExperience {
  company: string;
  role?: string;
  duration?: string;
  description?: string;
  projects?: ExperienceProject[];
}

export interface ResumeProject {
  name: string;
  client?: string;
  description?: string;
  techStack?: string[];
  highlights: string[];
  source?: {
    type: 'github' | 'manual';
    repo?: string;
  };
}

export interface Education {
  school: string;
  major: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  header: ResumeMeta;
  summaryLines: string;
  coreSkills: ResumeSkill[];
  experiences: WorkExperience[];
  projects: ResumeProject[];
  education: Education[];
}
