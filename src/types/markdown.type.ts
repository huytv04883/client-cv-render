export interface MDEditor {
  value: string;
  onChange: (value: unknown, event: unknown) => void;
}

export interface CssEditor {
  value: string;
  onChange: (value: string) => void;
}

export enum NodeType {
  Heading = 'heading',
  Paragraph = 'paragraph',
  Text = 'text',
  Strong = 'strong',
  List = 'list',
  ListItem = 'listItem',
  Root = 'root',
  Emphasis = 'emphasis',
}
