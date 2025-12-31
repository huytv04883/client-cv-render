import { GripVertical } from 'lucide-react';
import type { DividerProps } from 'react-split-pane';

export function CustomDivider(props: DividerProps) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'col-resize',
        height: '100%',
        width: '6px',
      }}
    >
      <GripVertical size={22} />
    </div>
  );
}
