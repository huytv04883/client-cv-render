import { LANGUAGE } from '@/constant/constant';
import type { CssEditor } from '@/types/markdown.type';
import { Editor } from '@monaco-editor/react';
import { memo } from 'react';

function CssEditor({ value, onChange }: CssEditor) {
  return (
    <Editor
      height="100%"
      language={LANGUAGE.CSS}
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
