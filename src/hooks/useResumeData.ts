import { parserResume } from '@/components/parser/parseResume';
import type {
  ResumeData,
  ResumeMeta,
  ResumeSkill,
  WorkExperience,
} from '@/types/resume.type';
import { debounce, isEqual } from 'lodash-es';
import { useCallback, useState } from 'react';

const initialState: ResumeData = {
  header: {
    name: '',
    title: '',
    email: '',
  },
  summaryLines: '',
  coreSkills: [],
  experiences: [],
  education: [],
  projects: [],
};

function parseInitialData(markdown: string) {
  const parsed = parserResume(markdown);
  return {
    header: parsed.header,
    summaryLines: parsed.summaryLines.join('\n'),
    coreSkills: parsed.coreSkills,
    experiences: parsed.experiences,
  };
}

export function useResumeData(initialMarkdown: string) {
  const [initialData] = useState(() => parseInitialData(initialMarkdown));

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
  }, []);

  // Debounced update - 300ms delay to avoid excessive parsing while typing
  const [debouncedUpdate] = useState(() => debounce(updateResumeData, 300));

  return {
    header,
    summaryLines,
    coreSkills,
    experiences,
    updateResumeData: debouncedUpdate,
  };
}
