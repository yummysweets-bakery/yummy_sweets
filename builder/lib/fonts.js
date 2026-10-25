// Google Fonts loading. Only the default families load with the page; any other
// family chosen in the Fonts tab is requested when it is actually used.

export const BASE_FONTS = ['Cormorant Garamond', 'DM Sans', 'Vazirmatn'];

const WEIGHTS = {
  'Cormorant Garamond': 'ital,wght@0,400;0,500;0,600;0,700;1,400;1,500',
  'Playfair Display': 'ital,wght@0,500;0,600;0,700;1,500',
  'Lora': 'ital,wght@0,400;0,500;0,600;0,700;1,400',
  'DM Serif Display': 'wght@400',
  'Amiri': 'wght@400;700',
  'Almarai': 'wght@400;700',
  'Tajawal': 'wght@400;500;700',
};

export function fontFamilyParam(family) {
  const name = String(family || '').trim();
  if (!/^[A-Za-z0-9 ]{2,40}$/.test(name)) return null;
  return `family=${name.replace(/ /g, '+')}:${WEIGHTS[name] || 'wght@400;500;600;700'}`;
}

export function googleFontsUrl(families) {
  const params = [...new Set(families)].map(fontFamilyParam).filter(Boolean);
  if (!params.length) return null;
  return `https://fonts.googleapis.com/css2?${params.join('&')}&display=swap`;
}

// Adds a stylesheet for any family not loaded yet. Returns the families requested.
const loaded = new Set(BASE_FONTS);
export function ensureFonts(families, doc = typeof document !== 'undefined' ? document : null) {
  const missing = [...new Set(families)].filter(f => f && !loaded.has(f) && fontFamilyParam(f));
  if (!missing.length || !doc) return [];
  const link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.href = googleFontsUrl(missing);
  link.dataset.fonts = missing.join(',');
  doc.head.appendChild(link);
  missing.forEach(f => loaded.add(f));
  return missing;
}
