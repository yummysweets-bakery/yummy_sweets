// Menu filter state <-> URL hash (#menu?q=..&cat=..&sort=..&range=..)

export const CATEGORIES = ['all', 'cakes', 'cupcakes', 'desserts'];
export const SORTS = ['popular', 'newest', 'price-asc', 'price-desc', 'name-asc'];
export const RANGES = ['any', 'under-20', '20-40', '40-60', 'over-60'];

export const DEFAULT_MENU_STATE = Object.freeze({ q: '', cat: 'all', sort: 'popular', range: 'any' });

// Unknown values fall back to defaults so a hand-edited link cannot break the menu.
export function parseMenuHash(hash) {
  const state = { ...DEFAULT_MENU_STATE };
  const h = String(hash || '');
  if (!h.startsWith('#menu')) return state;
  const qIndex = h.indexOf('?');
  if (qIndex === -1) return state;
  const params = new URLSearchParams(h.slice(qIndex + 1));
  state.q = (params.get('q') || '').slice(0, 100);
  if (CATEGORIES.includes(params.get('cat'))) state.cat = params.get('cat');
  if (SORTS.includes(params.get('sort'))) state.sort = params.get('sort');
  if (RANGES.includes(params.get('range'))) state.range = params.get('range');
  return state;
}

export function buildMenuHash({ q = '', cat = 'all', sort = 'popular', range = 'any' } = {}) {
  const params = new URLSearchParams();
  if (q && q.trim()) params.set('q', q.trim());
  if (cat && cat !== 'all') params.set('cat', cat);
  if (sort && sort !== 'popular') params.set('sort', sort);
  if (range && range !== 'any') params.set('range', range);
  const str = params.toString();
  return str ? `#menu?${str}` : '#menu';
}

export function inPriceRange(priceUSD, range) {
  switch (range) {
    case 'under-20': return priceUSD < 20;
    case '20-40': return priceUSD >= 20 && priceUSD <= 40;
    case '40-60': return priceUSD >= 40 && priceUSD <= 60;
    case 'over-60': return priceUSD > 60;
    default: return true;
  }
}
