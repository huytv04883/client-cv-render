import { createSectionClasses } from '@/utils/classNames';
import type { Section } from '@/utils/parser-v2/types';
import { memo } from 'react';

type SectionTableProps = {
  section: Section;
};

function SectionTable({ section }: SectionTableProps) {
  const data = section.data?.tableData || [];
  const classes = createSectionClasses(section.id);

  if (data.length === 0) return null;

  const [header, ...rows] = data;

  return (
    <div className={classes.table}>
      <table>
        {header && (
          <thead className={classes.tableHead}>
            <tr>
              {header.map((cell, index) => (
                <th key={index} className={classes.tableTh}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className={classes.tableBody}>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={classes.tableRow}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={classes.tableTd}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(SectionTable);
