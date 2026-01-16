import type {
  ResumeData,
  ResumeMeta,
  ResumeSkill,
  WorkExperience,
} from '@/types/resume.type';
import { debounce, isEqual } from 'lodash-es';
import { useCallback, useState } from 'react';
import { parserResume } from '../utils/parser/parseResume';

const initialState: ResumeData = {
  header: {
    name: '',
    title: '',
    email: '',
  },
  summaryLines: '',
  coreSkills: [],
  experiences: [],
  education: {
    school: '',
    major: '',
    duration: '',
  },
};

function parseInitialData(markdown: string) {
  const parsed = parserResume(markdown);
  return {
    header: parsed.header,
    summaryLines: parsed.summaryLines.join('\n'),
    coreSkills: parsed.coreSkills,
    experiences: parsed.experiences,
    education: parsed.education,
  };
}

export function useResumeData(initialMarkdown: string) {
  const initialData = parseInitialData(initialMarkdown);

  const [header, setHeader] = useState<ResumeMeta>(
    initialData.header || initialState.header
  );
  const [summaryLines, setSummaryLines] = useState<string>(
    initialData.summaryLines || ''
  );
  const [coreSkills, setCoreSkills] = useState<ResumeSkill[]>(
    initialData.coreSkills || []
  );
  const [experiences, setExperiences] = useState<WorkExperience[]>(
    initialData.experiences || []
  );
  const [education, setEducation] = useState(initialData.education || {});

  // Update function - only updates sections that actually changed
  const updateResumeData = useCallback((markdown: string) => {
    const parsed = parserResume(markdown);
    const newSummary = parsed.summaryLines.join('\n');

    // Preserve references if data hasn't changed (prevents unnecessary re-renders)
    setHeader((prev) => (isEqual(prev, parsed.header) ? prev : parsed.header));
    setSummaryLines((prev) => (prev === newSummary ? prev : newSummary));
    setCoreSkills((prev) =>
      isEqual(prev, parsed.coreSkills) ? prev : parsed.coreSkills
    );
    setExperiences((prev) =>
      isEqual(prev, parsed.experiences) ? prev : parsed.experiences
    );
    setEducation((prev) =>
      isEqual(prev, parsed.education) ? prev : parsed.education
    );
  }, []);

  // Debounced update - 300ms delay to avoid excessive parsing while typing
  const [debouncedUpdate] = useState(() => debounce(updateResumeData, 300));

  return {
    header,
    summaryLines,
    coreSkills,
    experiences,
    education,
    updateResumeData: debouncedUpdate,
  };
}
