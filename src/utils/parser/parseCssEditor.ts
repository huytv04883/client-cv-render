export interface CssSection {
  name: string;
  cssText: string;
}

export function parseCssSections(css: string): Map<string, CssSection> {
  const map = new Map<string, CssSection>();
  const regex =
    /\/\*\s*@section\s+([\w-]+)\s*\*\/([\s\S]*?)(?=\/\*\s*@section|\s*$)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(css))) {
    const [, name, css] = match;
    map.set(name, { name, cssText: css.trim() });
  }

  return map;
}

export const parseCssEditor = (css: string) => {
  const sections = parseCssSections(css);
  return {
    sections,
  };
};
