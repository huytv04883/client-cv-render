// Replaces the value of a given CSS attribute in the provided CSS text.
const WITH_PX = [
  'font-size',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'gap',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'line-height',
];

export const replaceCssAttrValue = (
  fields: string[],
  cssText: string,
  value: string
) => {
  fields.forEach((f) => {
    cssText = cssText.replace(
      new RegExp(`${f}\\s*:\\s*[^;]+;`, 'g'),
      `${f}: ${WITH_PX.includes(f) ? `${value}px` : value};`
    );
  });
  return cssText;
};

export const createInstanceStyle = (id: string): HTMLStyleElement | null => {
  let instance = document.getElementById(id) as HTMLStyleElement | null;

  if (!instance) {
    instance = document.createElement('style');
    instance.id = id;
    document.head.appendChild(instance);
  }

  return instance;
};
