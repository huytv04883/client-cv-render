import { CustomDivider } from '@/features/editor/CustomDivider';
import EditorTabs from '@/features/editor/EditorTabs';
import baseMD from '@/shared/templates/BASE.md?raw';
import DEFAULT_CSS from '@/shared/templates/defaultCss.css?raw';
import Preview from '@/features/sections/Preview';
import { SettingsPanel } from '@/features/settings/SettingsPanel';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useRealtimeStyle } from '@/shared/hooks/useRealtimeStyle';
import { useResumeData } from '@/shared/hooks/useResumeData';
import { useAppStore } from '@/stores/appStore';
import clsx from 'clsx';
import { useState } from 'react';
import { Pane, SplitPane } from 'react-split-pane';
import { parseMarkdownSync } from '@/shared/utils/parser-v2/parseMarkdown';
import { parseCssEditor } from '@/shared/utils/parser/parseCssEditor';

export default function EditorPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [markdown, setMarkdown] = useState<string>(baseMD);
  const [css, setCss] = useState<string>(DEFAULT_CSS);
  const { updateResumeData } = useResumeData(baseMD);
  const { header, sections } = parseMarkdownSync(markdown);
  const { isExpandedSidebarSettings } = useAppStore();

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
    <div
      className={clsx(
        'grid grid-cols-1',
        { 'md:grid-cols-[1fr_248px]': isExpandedSidebarSettings },
        'gap-4 overflow-hidden px-4 pt-4'
      )}
    >
      <div className="overflow-hidden border-solid border border-gray-200 rounded-lg">
        <SplitPane direction="horizontal" divider={CustomDivider}>
          <Pane minSize={200} defaultSize={'50%'}>
            <EditorTabs
              markdown={markdown}
              css={css}
              onMarkdownChange={handleMarkdownChange}
              onCssChange={handleCssChange}
            />
          </Pane>
          <Pane minSize={200} defaultSize={'50%'}>
            <Preview data={{ header, sections }} />
          </Pane>
        </SplitPane>
      </div>
      {!isMobile && isExpandedSidebarSettings && <SettingsPanel />}
    </div>
  );
}
