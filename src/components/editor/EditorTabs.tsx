import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import CssEditor from './CssEditor';

interface EditorTabsProps {
  markdown: string;
  css: string;
  onMarkdownChange: (v: string) => void;
  onCssChange: (v: string) => void;
}

export default function EditorTabs({
  markdown,
  css,
  onMarkdownChange,
  onCssChange,
}: EditorTabsProps) {
  const [tab, setTab] = useState<'md' | 'css'>('md');

  return (
    <div className="h-full flex flex-col">
      <div className="editor-tabs">
        <button
          className={tab === 'md' ? 'active' : ''}
          onClick={() => setTab('md')}
        >
          Markdown
        </button>
        <button
          className={tab === 'css' ? 'active' : ''}
          onClick={() => setTab('css')}
        >
          CSS
        </button>
      </div>

      <div className="flex-1 h-0">
        {tab === 'md' ? (
          <MarkdownEditor value={markdown} onChange={onMarkdownChange} />
        ) : (
          <CssEditor value={css} onChange={onCssChange} />
        )}
      </div>
    </div>
  );
}
