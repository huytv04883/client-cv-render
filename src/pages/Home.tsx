import EditorTabs from '@/components/editor/EditorTabs';
import Resume from '@/components/preview/Resume';
import baseMD from '@/components/preview/templates/BASE.md?raw';
import DEFAULT_CSS from '@/components/preview/templates/defaultCss.css?raw';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRealtimeStyle } from '@/hooks/useRealtimeStyle';
import { useResumeData } from '@/hooks/useResumeData';
import { parseCssEditor } from '@/utils/parser/parseCssEditor';
import { useEffect, useState } from 'react';
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
    console.log('sections', sections);
    setCss(value);
    sections.sections.forEach((css, name) => {
      style.updateSection(name, css);
    });
  };

  useEffect(() => {
    // Initialize default CSS
    if (!DEFAULT_CSS) return;
    const sections = parseCssEditor(DEFAULT_CSS); //@TODO: Load from BE
    console.log('sections', sections);

    sections.sections.forEach((css, name) => {
      style.updateSection(name, css);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_248px] gap-4 overflow-hidden">
      <SplitPane direction="horizontal">
        <Pane minSize={200} defaultSize={isMobile ? '100%' : '50%'}>
          <EditorTabs
            markdown={markdown}
            css={css}
            onMarkdownChange={handleMarkdownChange}
            onCssChange={handleCssChange}
          />
        </Pane>
        <Pane minSize={200} defaultSize={isMobile ? '100%' : '50%'}>
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
      {!isMobile && <SettingsPanel />}
    </div>
  );
}
