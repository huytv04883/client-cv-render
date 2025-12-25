import type { MDEditor } from '@/types/markdown.type';
import Editor from '@monaco-editor/react';
import { memo } from 'react';

function MarkdownEditor({ value, onChange }: MDEditor) {
  return (
    <Editor
      height="100%"
      language="markdown"
      value={value}
      onChange={(v) => onChange(v ?? '')}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

export default memo(MarkdownEditor);
