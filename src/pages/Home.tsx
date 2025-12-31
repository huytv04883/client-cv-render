import EditorTabs from '@/components/editor/EditorTabs';
import Resume from '@/components/preview/Resume';
import baseMD from '@/components/preview/templates/BASE.md?raw';
import DEFAULT_CSS from '@/components/preview/templates/defaultCss.css?raw';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRealtimeStyle } from '@/hooks/useRealtimeStyle';
import { useResumeData } from '@/hooks/useResumeData';
import { parseCssEditor } from '@/utils/parser/parseCssEditor';
import { useState } from 'react';
import { Pane, SplitPane } from 'react-split-pane';

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [markdown, setMarkdown] = useState<string>(baseMD);
  const [css, setCss] = useState<string>(DEFAULT_CSS);
  const {
    header,
    summaryLines,
    coreSkills,
    experiences,
    education,
    updateResumeData,
  } = useResumeData(baseMD);

  const style = useRealtimeStyle();

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    updateResumeData(value);
  };

  const handleCssChange = (value: string) => {
    if (!value) return;
    const sections = parseCssEditor(value);
    setCss(value);
    sections.sections.forEach((css, name) => {
      style.updateSection(name, css);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_248px] gap-4 overflow-hidden">
      <div className="overflow-hidden border-solid border border-gray-200 rounded-lg">
        <SplitPane direction="horizontal">
          <Pane minSize={200} defaultSize={'50%'}>
            <EditorTabs
              markdown={markdown}
              css={css}
              onMarkdownChange={handleMarkdownChange}
              onCssChange={handleCssChange}
            />
          </Pane>
          <Pane minSize={200} defaultSize={'50%'}>
            <Resume
              data={{
                header,
                summaryLines,
                coreSkills,
                experiences,
                education,
              }}
            />
          </Pane>
        </SplitPane>
      </div>
      {!isMobile && <SettingsPanel />}
    </div>
  );
}
