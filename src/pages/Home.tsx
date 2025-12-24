import EditorTabs from '@/components/editor/EditorTabs';
import { useState } from 'react';

export default function HomePage() {
  const [markdown, setMarkdown] = useState<string>('# Hello, MCV!');

  const [css, setCss] = useState<string>(
    'body { font-family: Arial, sans-serif; }'
  );

  return (
    <div className="h-full">
      <EditorTabs
        markdown={markdown}
        css={css}
        onMarkdownChange={setMarkdown}
        onCssChange={setCss}
      />
    </div>
  );
}
