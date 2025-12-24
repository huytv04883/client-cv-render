import { memo } from 'react';
import Editor from '@monaco-editor/react';

interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function CssEditor({ value, onChange }: CssEditorProps) {
  return (
    <Editor
      height="100%"
      language="css"
      value={value}
      onChange={(v) => onChange(v ?? '')}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

export default memo(CssEditor);
