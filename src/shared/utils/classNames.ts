/**
 * Generate unique class name for a section
 */
export function generateClassName(sectionId: string, element?: string): string {
  const base = `section-${sectionId}`;
  return element ? `${base}__${element}` : base;
}

/**
 * Create class names object for a section
 */
export function createSectionClasses(sectionId: string) {
  return {
    root: generateClassName(sectionId),
    heading: generateClassName(sectionId, 'heading'),
    content: generateClassName(sectionId, 'content'),
    children: generateClassName(sectionId, 'children'),
    // Paragraph
    paragraph: generateClassName(sectionId, 'paragraph'),
    text: generateClassName(sectionId, 'text'),
    // List
    list: generateClassName(sectionId, 'list'),
    listItem: generateClassName(sectionId, 'list-item'),
    nestedList: generateClassName(sectionId, 'nested-list'),
    nestedItem: generateClassName(sectionId, 'nested-item'),
    // Timeline
    timeline: generateClassName(sectionId, 'timeline'),
    timelineItem: generateClassName(sectionId, 'timeline-item'),
    timelineHeader: generateClassName(sectionId, 'timeline-header'),
    timelineTitle: generateClassName(sectionId, 'timeline-title'),
    timelineSubtitle: generateClassName(sectionId, 'timeline-subtitle'),
    timelineDuration: generateClassName(sectionId, 'timeline-duration'),
    timelineLocation: generateClassName(sectionId, 'timeline-location'),
    timelineDescription: generateClassName(sectionId, 'timeline-description'),
    timelineList: generateClassName(sectionId, 'timeline-list'),
    timelineListItem: generateClassName(sectionId, 'timeline-list-item'),
    // Table
    table: generateClassName(sectionId, 'table'),
    tableHead: generateClassName(sectionId, 'table-head'),
    tableBody: generateClassName(sectionId, 'table-body'),
    tableRow: generateClassName(sectionId, 'table-row'),
    tableTh: generateClassName(sectionId, 'table-th'),
    tableTd: generateClassName(sectionId, 'table-td'),
    // Mixed
    mixed: generateClassName(sectionId, 'mixed'),
    mixedParagraph: generateClassName(sectionId, 'mixed-paragraph'),
    mixedList: generateClassName(sectionId, 'mixed-list'),
    mixedListItem: generateClassName(sectionId, 'mixed-list-item'),
  };
}

export type SectionClasses = ReturnType<typeof createSectionClasses>;
