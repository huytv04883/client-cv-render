import type { Section } from '../types';
import { createSectionClasses } from '../utils/classNames';

interface SectionTableProps {
  section: Section;
}

export function SectionTable({ section }: SectionTableProps) {
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
