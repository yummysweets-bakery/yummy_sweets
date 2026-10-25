// Shopping cart model. The stored cart holds only product ids, quantities and
// chosen exclusions — never prices or totals, which are always recomputed from
// the current product list and pricing rules.

export const CART_STORAGE_KEY = 'ys_cart_v1';
export const MAX_QTY = 99;

const clampQty = q => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(q) || 0)));

function lineKey(productId, exclude) {
  return productId + '|' + [...exclude].sort().join(',');
}

// Validate raw (possibly stale or tampered) cart data against the live products.
export function sanitizeCart(raw, products) {
  if (!Array.isArray(raw)) return [];
  const byId = new Map((products || []).map(p => [p.id, p]));
  const merged = new Map();
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const product = byId.get(item.productId);
    if (!product) continue;
    const qty = Math.floor(Number(item.qty));
    if (!Number.isFinite(qty) || qty < 1) continue;
    const allowed = new Set((product.exclusions || []).map(x => x.id));
    const exclude = Array.isArray(item.exclude)
      ? [...new Set(item.exclude.filter(x => typeof x === 'string' && allowed.has(x)))]
      : [];
    const key = lineKey(product.id, exclude);
    const existing = merged.get(key);
    if (existing) existing.qty = clampQty(existing.qty + qty);
    else merged.set(key, { id: key, productId: product.id, qty: clampQty(qty), exclude });
  }
  return [...merged.values()];
}

export function loadCart(storage, products) {
  try {
    const raw = JSON.parse(storage.getItem(CART_STORAGE_KEY) || '[]');
    return sanitizeCart(raw, products);
  } catch {
    return [];
  }
}

export function saveCart(storage, items) {
  try {
    const slim = items.map(({ productId, qty, exclude }) => ({ productId, qty, exclude }));
    if (slim.length) storage.setItem(CART_STORAGE_KEY, JSON.stringify(slim));
    else storage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function addItem(items, productId, exclude = []) {
  const key = lineKey(productId, exclude);
  const existing = items.find(i => i.id === key);
  if (existing) {
    return items.map(i => (i.id === key ? { ...i, qty: clampQty(i.qty + 1) } : i));
  }
  return [...items, { id: key, productId, qty: 1, exclude: [...exclude] }];
}

export function setQty(items, lineId, qty) {
  const n = Math.floor(Number(qty));
  if (!Number.isFinite(n) || n < 1) return removeItem(items, lineId);
  return items.map(i => (i.id === lineId ? { ...i, qty: clampQty(n) } : i));
}

export function changeQty(items, lineId, delta) {
  const line = items.find(i => i.id === lineId);
  if (!line) return items;
  return setQty(items, lineId, line.qty + delta);
}

export function removeItem(items, lineId) {
  return items.filter(i => i.id !== lineId);
}

// Priced lines for display, checkout and order records.
export function priceLines(items, products, lang = 'en') {
  const byId = new Map((products || []).map(p => [p.id, p]));
  const pick = obj => (lang === 'ku' ? (obj?.ku || obj?.en) : obj?.en) || '';
  const lines = [];
  for (const item of items) {
    const p = byId.get(item.productId);
    if (!p) continue;
    const unitPriceUSD = Math.max(0, Number(p.priceUSD) || 0);
    const excludeLabels = (item.exclude || []).map(id => {
      const def = (p.exclusions || []).find(x => x.id === id);
      return def ? pick(def) : id;
    });
    lines.push({
      id: item.id,
      productId: p.id,
      name: pick(p.name),
      qty: item.qty,
      exclude: [...(item.exclude || [])],
      excludeLabels,
      unitPriceUSD,
      lineTotalUSD: Math.round(unitPriceUSD * item.qty * 100) / 100,
    });
  }
  return lines;
}

export function cartSubtotal(lines) {
  return Math.round(lines.reduce((sum, l) => sum + l.lineTotalUSD, 0) * 100) / 100;
}

export function cartCount(lines) {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
