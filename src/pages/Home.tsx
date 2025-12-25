import Control from '@/components/controls/Control';
import EditorTabs from '@/components/editor/EditorTabs';
import { parserResume } from '@/components/parser/parseResume';
import Preview from '@/components/preview/Preview';
import baseMD from '@/components/preview/templates/BASE.md?raw';
import { useState } from 'react';

export default function HomePage() {
  const [markdown, setMarkdown] = useState<string>(baseMD);
  const [css, setCss] = useState<string>(
    'body { font-family: Arial, sans-serif; }'
  );

  const { nodes, summaryLines, coreSkills, workExperiences } =
    parserResume(markdown);
  console.log('tree', nodes);
  console.log('summaryLines', summaryLines);
  console.log('coreSkills', coreSkills);
  console.log('workExperiences', workExperiences);

  return (
    <div className="h-full grid grid-cols-[1fr_1fr_248px] gap-4">
      <EditorTabs
        markdown={markdown}
        css={css}
        onMarkdownChange={setMarkdown}
        onCssChange={setCss}
      />
      <Preview />
      <Control />
    </div>
  );
}
