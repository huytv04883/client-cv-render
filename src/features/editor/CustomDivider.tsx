import { GripVertical } from 'lucide-react';
import type { DividerProps } from 'react-split-pane';

export function CustomDivider({ isDragging, style, ...rest }: DividerProps) {
  const domProps = Object.fromEntries(
    Object.entries(rest).filter(
      ([key]) =>
        key.startsWith('on') ||
        ['id', 'className', 'role', 'tabIndex'].includes(key)
    )
  );

  return (
    <div
      {...domProps}
      className={
        isDragging
          ? 'custom-divider custom-divider--dragging'
          : 'custom-divider'
      }
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'col-resize',
        height: '100%',
        width: '8px',
      }}
    >
      <GripVertical size={22} />
    </div>
  );
}
