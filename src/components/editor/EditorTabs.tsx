import { Tab } from '@/constant/constant';
import clsx from 'clsx';
import { useState } from 'react';
import CssEditor from './CssEditor';
import MarkdownEditor from './MarkdownEditor';

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
  const [tab, setTab] = useState<Tab>(Tab.Markdown);

  return (
    <div className="h-[calc(100vh-32px)] flex flex-col rounded-lg overflow-hidden border-solid border border-gray-200">
      <div className="flex gap-1 p-1 bg-gray-100 rounded-t-lg">
        <button
          className={clsx(
            'px-4 py-2 text-sm rounded-md transition-colors',
            tab === Tab.Markdown
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
          onClick={() => setTab(Tab.Markdown)}
        >
          Markdown
        </button>
        <button
          className={clsx(
            'px-4 py-2 text-sm rounded-md transition-colors',
            tab === Tab.CSS
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
          onClick={() => setTab(Tab.CSS)}
        >
          CSS
        </button>
      </div>

      <div className="flex-1 h-full">
        {tab === Tab.Markdown ? (
          <MarkdownEditor value={markdown} onChange={onMarkdownChange} />
        ) : (
          <CssEditor value={css} onChange={onCssChange} />
        )}
      </div>
    </div>
  );
}
