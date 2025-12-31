// Replaces the value of a given CSS attribute in the provided CSS text.
const WITH_PX = [
  'font-size',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
];

export const replaceCssAttrValue = (
  field: string,
  cssText: string,
  value: string
) =>
  cssText.replace(
    new RegExp(`${field}\\s*:\\s*[^;]+;`, 'g'),
    `${field}: ${WITH_PX.includes(field) ? `${value}px` : value};`
  );

export const createInstanceStyle = (id: string): HTMLStyleElement | null => {
  let instance = document.getElementById(id) as HTMLStyleElement | null;

  if (!instance) {
    instance = document.createElement('style');
    instance.id = id;
    document.head.appendChild(instance);
  }

  return instance;
};
