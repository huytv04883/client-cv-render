import Control from '@/components/controls/Control';
import EditorTabs from '@/components/editor/EditorTabs';
import { parseCssEditor } from '@/components/parser/parseCssEditor';
import Resume from '@/components/preview/Resume';
import baseMD from '@/components/preview/templates/BASE.md?raw';
import DEFAULT_CSS from '@/components/preview/templates/defaultCss.css?raw';
import { useResumeData } from '@/hooks/useResumeData';
import { useCssStore } from '@/stores/cssStore';
import { useState } from 'react';

export default function HomePage() {
  const [markdown, setMarkdown] = useState<string>(baseMD);
  const { setNewCss } = useCssStore();
  const [css, setCss] = useState<string>(DEFAULT_CSS);
  const { header, summaryLines, coreSkills, experiences, updateResumeData } =
    useResumeData(baseMD);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    updateResumeData(value);
  };

  const handleCssChange = (value: string) => {
    const cssParse = parseCssEditor(value);
    setNewCss(cssParse);
    setCss(value);
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_1fr_248px] gap-4 p-4 bg-gray-50">
      <EditorTabs
        markdown={markdown}
        css={css}
        onMarkdownChange={handleMarkdownChange}
        onCssChange={handleCssChange}
      />
      <Resume
        data={{
          header,
          summaryLines,
          coreSkills,
          experiences,
          projects: [],
          education: [],
        }}
      />
      <Control />
    </div>
  );
}
