import { memo } from 'react';
import Editor from '@monaco-editor/react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
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
