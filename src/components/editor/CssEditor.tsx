import type { CssEditor } from '@/types/css.type';
import Editor from '@monaco-editor/react';
import { memo } from 'react';

function CssEditor({ value, onChange }: CssEditor) {
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
