const getRegexSection = (name: string) => {
  return new RegExp(
    String.raw`\/\*\s*@${name}\s+([\w-]+)\s*\*\/([\s\S]*?)(?=\/\*\s*@section|\s*$)`,
    'g'
  );
};

export interface CssSection {
  name: string;
  cssText: string;
}

export function parseCssSections(
  css: string,
  name: string
): Map<string, CssSection> {
  const map = new Map<string, CssSection>();
  for (const match of css.matchAll(getRegexSection(name))) {
    const [, name, body] = match;
    map.set(name, {
      name,
      cssText: body.trim(),
    });
  }

  return map;
}

export const parseCssEditor = (css: string) => {
  const sections = parseCssSections(css, 'section');
  const globalCss = parseCssSections(css, 'global');
  return {
    sections,
    globalCss,
  };
};
