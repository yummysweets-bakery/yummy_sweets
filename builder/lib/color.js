// WCAG 2.x contrast helpers used when applying a theme, so text placed on the
// accent colour stays readable for every preset in light and dark mode.

function parseHex(hex) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}

export function relativeLuminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export const LIGHT_TEXT = '#FFFFFF';
export const DARK_TEXT = '#1C120D';

// Whichever of white / near-black text reads better on the given background.
export function textOn(background) {
  const light = contrastRatio(LIGHT_TEXT, background);
  const dark = contrastRatio(DARK_TEXT, background);
  if (light === null || dark === null) return LIGHT_TEXT;
  return light >= dark ? LIGHT_TEXT : DARK_TEXT;
}
