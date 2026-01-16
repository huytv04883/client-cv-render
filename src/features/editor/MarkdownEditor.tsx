import { LANGUAGE } from '@/app/config/constants';
import { Editor } from '@monaco-editor/react';
import { memo } from 'react';
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <Editor
      height="100%"
      language={LANGUAGE.MARKDOWN}
      value={value}
      onChange={(v) => onChange(v ?? '')}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 13,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

export default memo(MarkdownEditor);
