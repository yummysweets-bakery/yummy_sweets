import { describe, expect, it } from 'vitest';
import { escapeHTML, jsArg, sanitizeInlineHTML, safeUrl, stripTags, escapeMultiline } from '../../builder/lib/escape.js';
import { computeBreakdown, formatMoney, checkPromo, DEFAULT_ECONOMY, hasSecondaryCurrency } from '../../builder/lib/pricing.js';
import { normalizeKurdish, highlightMatches, matchesSearch, searchTokens } from '../../builder/lib/search.js';
import { parseMenuHash, buildMenuHash, inPriceRange } from '../../builder/lib/urlstate.js';
import { sanitizeCart, loadCart, saveCart, addItem, changeQty, setQty, removeItem, priceLines, cartSubtotal, cartCount, CART_STORAGE_KEY } from '../../builder/lib/cart.js';
import { earliestFulfillment, toLocalInputValue, parseLocalInput, validateFulfillment, formatFulfillment, leadHours } from '../../builder/lib/dates.js';
import { normalizeWhatsAppNumber, buildWhatsAppUrl, buildOrderMessage } from '../../builder/lib/whatsapp.js';
import { buildOrderRecord, validateOrderRecord } from '../../builder/lib/orders.js';

const eco = { ...DEFAULT_ECONOMY };

describe('escapeHTML', () => {
  it('escapes all HTML-significant characters', () => {
    expect(escapeHTML(`<img src=x onerror="alert('1')">&\``)).toBe('&lt;img src=x onerror=&quot;alert(&#39;1&#39;)&quot;&gt;&amp;&#96;');
  });
  it('handles null and numbers', () => {
    expect(escapeHTML(null)).toBe('');
    expect(escapeHTML(undefined)).toBe('');
    expect(escapeHTML(42)).toBe('42');
  });
});

describe('jsArg', () => {
  it('produces an attribute-safe JS string literal', () => {
    const v = jsArg(`p1');alert(1);('`);
    expect(v).not.toContain("'");
    expect(v).not.toContain('"');
    // Decoding the attribute yields a single valid JSON string literal.
    const decoded = v.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    expect(JSON.parse(decoded)).toBe(`p1');alert(1);('`);
  });
});

describe('sanitizeInlineHTML (announcement whitelist)', () => {
  it('keeps <strong>/<em>/<br> and escapes everything else', () => {
    expect(sanitizeInlineHTML('Free <strong>delivery</strong><br/>today')).toBe('Free <strong>delivery</strong><br>today');
    expect(sanitizeInlineHTML('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(sanitizeInlineHTML('<img src=x onerror=alert(1)>')).not.toContain('<img');
    expect(sanitizeInlineHTML('<strong onclick="x()">hi</strong>')).not.toContain('onclick="');
    expect(sanitizeInlineHTML('<a href="javascript:alert(1)">x</a>')).not.toContain('<a');
    expect(sanitizeInlineHTML('<svg onload=alert(1)>')).not.toContain('<svg');
  });
  it('closes unbalanced tags', () => {
    expect(sanitizeInlineHTML('<strong>open')).toBe('<strong>open</strong>');
  });
  it('stripTags gives plain text', () => {
    expect(stripTags('Free <strong>delivery</strong>')).toBe('Free delivery');
  });
});

describe('safeUrl', () => {
  it('allows http(s) and relative URLs only', () => {
    expect(safeUrl('https://instagram.com/x')).toBe('https://instagram.com/x');
    expect(safeUrl('./img.png')).toBe('./img.png');
    expect(safeUrl('javascript:alert(1)')).toBe('');
    expect(safeUrl(' JaVaScRiPt:alert(1)')).toBe('');
    expect(safeUrl('//evil.example')).toBe('');
    expect(safeUrl('data:text/html;base64,PHNjcmlwdD4=', { allowDataImage: true })).toBe('');
    expect(safeUrl('data:image/png;base64,iVBORw0KGgo=', { allowDataImage: true })).toBe('data:image/png;base64,iVBORw0KGgo=');
    expect(safeUrl('data:image/png;base64,iVBORw0KGgo=')).toBe('');
  });
  it('escapeMultiline converts newlines after escaping', () => {
    expect(escapeMultiline('a<b>\nc')).toBe('a&lt;b&gt;<br>c');
  });
});

describe('formatMoney', () => {
  it('formats USD with two decimals', () => {
    expect(formatMoney(38, eco, 'USD')).toBe('$38.00');
    expect(formatMoney('x', eco, 'USD')).toBe('$0.00');
  });
  it('converts and rounds to the configured rule', () => {
    expect(formatMoney(38, eco, 'IQD')).toBe('49,750 د.ع'); // 49,780 → nearest 250
    expect(formatMoney(1, { ...eco, roundingRule: 1000 }, 'IQD')).toBe('1,000 د.ع');
    expect(formatMoney(10, { ...eco, roundingRule: 1, secondaryCurrency: 'EUR', currencySymbol: '€', exchangeRate: 0.9 }, 'EUR')).toBe('€ 9.00');
  });
  it('falls back to USD when the secondary currency is disabled', () => {
    expect(hasSecondaryCurrency({ ...eco, showSecondary: false })).toBe(false);
    expect(formatMoney(5, { ...eco, showSecondary: false }, 'IQD')).toBe('$5.00');
    expect(formatMoney(5, { ...eco, secondaryCurrency: 'None' }, 'IQD')).toBe('$5.00');
  });
});

describe('computeBreakdown', () => {
  it('charges delivery below the free threshold', () => {
    const b = computeBreakdown(40, eco);
    expect(b.delivery).toBe(8);
    expect(b.isFreeDelivery).toBe(false);
    expect(b.total).toBe(48);
  });
  it('makes delivery free at and above the threshold', () => {
    expect(computeBreakdown(60, eco).delivery).toBe(0);
    expect(computeBreakdown(60, eco).isFreeDelivery).toBe(true);
    expect(computeBreakdown(10, { ...eco, freeDeliveryOver: 0 }).isFreeDelivery).toBe(true);
  });
  it('pickup-only orders have no delivery fee', () => {
    const b = computeBreakdown(10, { ...eco, pickupOnly: true });
    expect(b.delivery).toBe(0);
    expect(b.isPickupOnly).toBe(true);
    expect(b.isFreeDelivery).toBe(false);
  });
  it('applies percent and fixed promos, capped at the subtotal', () => {
    const pct = { ...eco, promoCode: 'SWEET10', promoType: 'percent', promoValue: 10 };
    expect(computeBreakdown(50, pct, 'sweet10').discount).toBe(5);
    expect(computeBreakdown(50, pct, 'WRONG').discount).toBe(0);
    const fixed = { ...eco, promoCode: 'FIVE', promoType: 'fixed', promoValue: 500 };
    expect(computeBreakdown(20, fixed, 'FIVE').discount).toBe(20);
  });
  it('rejects expired promos', () => {
    const exp = { ...eco, promoCode: 'OLD', promoValue: 10, promoExpiry: '2020-01-01' };
    expect(checkPromo(exp, 'OLD', new Date('2026-01-01')).status).toBe('expired');
    expect(computeBreakdown(50, exp, 'OLD', new Date('2026-01-01')).discount).toBe(0);
    expect(checkPromo(exp, 'OLD', new Date('2019-12-31')).status).toBe('valid');
  });
  it('adds tax only when it is not included in prices', () => {
    expect(computeBreakdown(100, { ...eco, freeDeliveryOver: 0, taxEnabled: true, taxIncluded: false, taxRate: 10 }).tax).toBe(10);
    expect(computeBreakdown(100, { ...eco, taxEnabled: true, taxIncluded: true, taxRate: 10 }).tax).toBe(0);
    expect(computeBreakdown(100, { ...eco, taxEnabled: true, taxIncluded: false, taxRate: 99 }).taxRate).toBe(30);
  });
  it('reports the minimum-order shortfall', () => {
    const b = computeBreakdown(15, { ...eco, minimumOrder: 25 });
    expect(b.minOrderMet).toBe(false);
    expect(b.minOrderRemaining).toBe(10);
  });
  it('never returns negative or non-numeric totals', () => {
    expect(computeBreakdown(-5, eco).total).toBeGreaterThanOrEqual(0);
    expect(computeBreakdown('abc', eco).subtotal).toBe(0);
  });
});

describe('search', () => {
  it('normalises Kurdish/Arabic letter variants', () => {
    expect(normalizeKurdish('كيك')).toBe(normalizeKurdish('کیک'));
    expect(normalizeKurdish('شیرینيه')).toBe('شیرینیە');
    expect(normalizeKurdish('مَرحبا')).toBe('مرحبا');
  });
  it('matches every token in names/descriptions', () => {
    const p = { name: { en: 'Belgian Dark Truffle', ku: 'کێکی شوکولاتە' }, desc: { en: 'chocolate' }, category: 'cakes' };
    expect(matchesSearch(p, searchTokens('dark choc'))).toBe(true);
    expect(matchesSearch(p, searchTokens('vanilla'))).toBe(false);
    expect(matchesSearch(p, searchTokens('شوكولاتە'))).toBe(true);
  });
  it('highlights without enabling markup', () => {
    expect(highlightMatches('Dark choc', 'choc')).toBe('Dark <mark class="search-highlight">choc</mark>');
    const out = highlightMatches('<img src=x onerror=alert(1)> cake', 'cake');
    expect(out).not.toContain('<img');
    expect(out).toContain('&lt;img');
    expect(highlightMatches('Fish & chips', 'amp')).toBe('Fish &amp; chips');
    expect(highlightMatches('a+b', '+')).toBe('a<mark class="search-highlight">+</mark>b');
  });
});

describe('URL hash state', () => {
  it('round-trips filter state', () => {
    const state = { q: 'choc', cat: 'cupcakes', sort: 'price-asc', range: 'under-20' };
    expect(parseMenuHash(buildMenuHash(state))).toEqual(state);
    expect(buildMenuHash({})).toBe('#menu');
  });
  it('ignores unknown values and other hashes', () => {
    expect(parseMenuHash('#menu?cat=<script>&sort=evil&range=x')).toEqual({ q: '', cat: 'all', sort: 'popular', range: 'any' });
    expect(parseMenuHash('#faq')).toEqual({ q: '', cat: 'all', sort: 'popular', range: 'any' });
  });
  it('price ranges have inclusive bounds', () => {
    expect(inPriceRange(19.99, 'under-20')).toBe(true);
    expect(inPriceRange(20, '20-40')).toBe(true);
    expect(inPriceRange(40, '40-60')).toBe(true);
    expect(inPriceRange(60, 'over-60')).toBe(false);
  });
});

const products = [
  { id: 'p1', priceUSD: 38, name: { en: 'Rose Cake', ku: 'کێکی گوڵ' }, exclusions: [{ id: 'nuts', en: 'Nuts', ku: 'گوێز' }] },
  { id: 'p2', priceUSD: 18, name: { en: 'Cupcakes' } },
];

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: k => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: k => { delete data[k]; },
    data,
  };
}

describe('cart', () => {
  it('adds, merges, changes and removes lines', () => {
    let c = addItem([], 'p1');
    c = addItem(c, 'p1');
    c = addItem(c, 'p1', ['nuts']);
    expect(c).toHaveLength(2);
    expect(c[0].qty).toBe(2);
    c = changeQty(c, c[0].id, -1);
    expect(c[0].qty).toBe(1);
    c = changeQty(c, c[0].id, -1);
    expect(c).toHaveLength(1);
    c = setQty(c, c[0].id, 500);
    expect(c[0].qty).toBe(99);
    expect(removeItem(c, c[0].id)).toEqual([]);
  });
  it('drops missing products, bad quantities and unknown exclusions', () => {
    const raw = [
      { productId: 'p1', qty: 2, exclude: ['nuts', 'evil'] },
      { productId: 'gone', qty: 1 },
      { productId: 'p2', qty: -3 },
      { productId: 'p2', qty: 'abc' },
      null,
      { productId: 'p2', qty: 1, priceUSD: 0.01 },
    ];
    const c = sanitizeCart(raw, products);
    expect(c).toEqual([
      { id: 'p1|nuts', productId: 'p1', qty: 2, exclude: ['nuts'] },
      { id: 'p2|', productId: 'p2', qty: 1, exclude: [] },
    ]);
  });
  it('survives corrupted storage and stores no prices', () => {
    expect(loadCart(memoryStorage({ [CART_STORAGE_KEY]: '{not json' }), products)).toEqual([]);
    const s = memoryStorage();
    saveCart(s, [{ id: 'p1|', productId: 'p1', qty: 3, exclude: [], lineTotalUSD: 999 }]);
    expect(JSON.parse(s.data[CART_STORAGE_KEY])).toEqual([{ productId: 'p1', qty: 3, exclude: [] }]);
    expect(loadCart(s, products)[0].qty).toBe(3);
    saveCart(s, []);
    expect(CART_STORAGE_KEY in s.data).toBe(false);
  });
  it('prices lines from current product prices', () => {
    const lines = priceLines([{ id: 'p1|nuts', productId: 'p1', qty: 2, exclude: ['nuts'] }, { id: 'x', productId: 'gone', qty: 1, exclude: [] }], products, 'ku');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ name: 'کێکی گوڵ', unitPriceUSD: 38, lineTotalUSD: 76, excludeLabels: ['گوێز'] });
    expect(cartSubtotal(lines)).toBe(76);
    expect(cartCount(lines)).toBe(2);
  });
});

describe('fulfillment dates', () => {
  const now = new Date(2026, 9, 25, 10, 7);
  it('earliest slot is lead time ahead, rounded up to 15 minutes', () => {
    expect(toLocalInputValue(earliestFulfillment(now, 24))).toBe('2026-10-26T10:15');
    expect(leadHours({ leadTimeHours: 48 })).toBe(48);
    expect(leadHours({ leadTimeHours: 'x' })).toBe(24);
    expect(leadHours({})).toBe(24);
  });
  it('validates input values', () => {
    expect(validateFulfillment('', now).error).toBe('missing');
    expect(validateFulfillment('garbage', now).error).toBe('invalid');
    expect(validateFulfillment('2026-02-31T10:00', now).error).toBe('invalid');
    expect(validateFulfillment('2020-01-01T10:00', now).error).toBe('too-soon');
    expect(validateFulfillment('2026-10-25T18:00', now, 24).error).toBe('too-soon');
    expect(validateFulfillment('2030-01-01T10:00', now).error).toBe('too-far');
    const ok = validateFulfillment('2026-10-27T14:30', now, 24);
    expect(ok.ok).toBe(true);
    expect(ok.date.getHours()).toBe(14);
  });
  it('parses and formats localised dates', () => {
    expect(parseLocalInput('2026-10-27T14:30').getDate()).toBe(27);
    expect(formatFulfillment(new Date(2026, 9, 27, 14, 30), 'en')).toMatch(/27 October 2026/);
    expect(formatFulfillment(new Date(2026, 9, 27, 14, 30), 'ku').length).toBeGreaterThan(5);
  });
});

describe('WhatsApp', () => {
  it('rejects placeholder and malformed numbers', () => {
    expect(normalizeWhatsAppNumber('15551234567')).toBeNull();
    expect(normalizeWhatsAppNumber('+1 555 123 4567')).toBeNull();
    expect(normalizeWhatsAppNumber('123')).toBeNull();
    expect(normalizeWhatsAppNumber('+964 750 111 2233')).toBe('9647501112233');
    expect(buildWhatsAppUrl('15551234567', 'hi')).toBeNull();
    expect(buildWhatsAppUrl('+9647501112233', 'a & b')).toBe('https://wa.me/9647501112233?text=a%20%26%20b');
  });
  it('formats every price in the selected currency', () => {
    const lines = priceLines([{ id: 'a', productId: 'p1', qty: 2, exclude: ['nuts'] }], products, 'en');
    const b = computeBreakdown(cartSubtotal(lines), eco);
    const fmt = v => formatMoney(v, eco, 'IQD');
    const msg = buildOrderMessage({ lang: 'en', shopName: 'Yummy Sweets', lines, breakdown: b, fmt,
      customer: { name: 'Sara', phone: '+964750', address: 'Erbil' }, fulfillmentText: 'Tuesday 27 October', note: 'Happy birthday' });
    expect(msg).toContain('• 2 × Rose Cake — 99,500 د.ع');
    expect(msg).toContain('No Nuts');
    expect(msg).toContain('Subtotal: 99,500 د.ع');
    expect(msg).toContain('Delivery: Free');
    expect(msg).toContain('Total: 99,500 د.ع');
    expect(msg).toContain('Name: Sara');
    expect(msg).toContain('Requested date & time: Tuesday 27 October');
    expect(msg).toContain('Note for the baker: Happy birthday');
    expect(msg).not.toContain('$');
  });
  it('writes Kurdish labels', () => {
    const lines = priceLines([{ id: 'a', productId: 'p2', qty: 1, exclude: [] }], products, 'ku');
    const msg = buildOrderMessage({ lang: 'ku', shopName: 'یامی سویتس', lines, breakdown: computeBreakdown(18, eco), fmt: v => formatMoney(v, eco, 'USD') });
    expect(msg).toContain('کۆی گشتی: $26.00');
    expect(msg).toContain('گەیاندن: $8.00');
  });
});

describe('order records', () => {
  const lines = priceLines([{ id: 'a', productId: 'p1', qty: 2, exclude: [] }], products);
  it('recomputes totals and keeps date and note', () => {
    const when = new Date(Date.now() + 48 * 3600e3);
    const o = buildOrderRecord({ customerId: 'u1', customer: { name: 'Sara' }, lines, eco, fulfillmentAt: when, note: 'x'.repeat(900) });
    expect(o.totals).toEqual({ subtotal: 76, discount: 0, delivery: 0, tax: 0, total: 76 });
    expect(o.fulfillmentAt).toBe(when);
    expect(o.note).toHaveLength(500);
    expect(o.status).toBe('pending');
    expect(validateOrderRecord(o)).toEqual([]);
  });
  it('flags tampered or incomplete records', () => {
    const o = buildOrderRecord({ customerId: 'u1', lines, eco, fulfillmentAt: new Date() });
    expect(validateOrderRecord({ ...o, totals: { ...o.totals, total: 1 } })).toContain('totals');
    expect(validateOrderRecord({ ...o, items: [] })).toContain('items');
    expect(validateOrderRecord({ ...o, status: 'confirmed' })).toContain('status');
    expect(validateOrderRecord({ ...o, fulfillmentAt: 'tomorrow' })).toContain('date');
  });
});

import { contrastRatio, textOn, relativeLuminance } from '../../builder/lib/color.js';
import { sessionFromToken, isPrivileged, canAccessTab } from '../../builder/lib/session.js';

describe('color contrast', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
    expect(relativeLuminance('nope')).toBeNull();
  });
  it('picks readable text on the accent colours', () => {
    expect(textOn('#8B4A32')).toBe('#FFFFFF'); // light-mode berry
    expect(textOn('#E07A5F')).toBe('#1C120D'); // dark-mode terracotta
    expect(contrastRatio(textOn('#E07A5F'), '#E07A5F')).toBeGreaterThan(4.5);
    expect(contrastRatio(textOn('#C99A3D'), '#C99A3D')).toBeGreaterThan(4.5);
  });
});

describe('session from Firebase token (no localStorage trust)', () => {
  const user = { uid: 'u1', email: 'Person@Example.com', emailVerified: true, displayName: 'P', providerData: [{ providerId: 'google.com' }] };
  const now = Date.now();
  it('defaults to customer without claims', () => {
    const s = sessionFromToken(user, { auth_time: now / 1000 });
    expect(s.role).toBe('customer');
    expect(isPrivileged(s)).toBe(false);
    expect(canAccessTab(s, 'products')).toBe(false);
  });
  it('uses role claims and filters unknown permissions', () => {
    const s = sessionFromToken(user, { role: 'staff', perms: ['products', 'users', 'evil'], auth_time: now / 1000 });
    expect(s.perms).toEqual(['products']);
    expect(canAccessTab(s, 'products')).toBe(true);
    expect(canAccessTab(s, 'users')).toBe(false);
    expect(canAccessTab(s, 'economy')).toBe(false);
  });
  it('ignores unknown roles and malformed perms', () => {
    expect(sessionFromToken(user, { role: 'superuser' }).role).toBe('customer');
    expect(sessionFromToken(user, { role: 'staff', perms: 'products' }).perms).toEqual([]);
  });
  it('bootstraps owners only with a verified email', () => {
    expect(sessionFromToken({ ...user, email: 'yumy.swets@gmail.com' }, { auth_time: now / 1000 }).role).toBe('dev');
    expect(sessionFromToken({ ...user, email: 'yumy.swets@gmail.com', emailVerified: false }, {}).role).toBe('customer');
  });
  it('handles users without an email', () => {
    const s = sessionFromToken({ uid: 'p1', email: null, phoneNumber: '+964750', providerData: [] }, {});
    expect(s.email).toBe('');
    expect(s.phone).toBe('+964750');
  });
  it('expires old staff sign-ins', () => {
    const s = sessionFromToken(user, { role: 'admin', auth_time: (now - 8 * 24 * 3600e3) / 1000 }, now);
    expect(s.expired).toBe(true);
    expect(isPrivileged(s)).toBe(false);
  });
  it('admins see every tab except developer data; devs see all', () => {
    const a = sessionFromToken(user, { role: 'admin', auth_time: now / 1000 });
    expect(canAccessTab(a, 'economy')).toBe(true);
    expect(canAccessTab(a, 'data')).toBe(false);
    expect(canAccessTab(sessionFromToken(user, { role: 'dev', auth_time: now / 1000 }), 'data')).toBe(true);
  });
});

import { googleFontsUrl, fontFamilyParam, ensureFonts } from '../../builder/lib/fonts.js';

describe('font loading', () => {
  it('builds Google Fonts URLs and rejects unsafe names', () => {
    expect(googleFontsUrl(['DM Sans'])).toBe('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
    expect(fontFamilyParam('Bad"><script>')).toBeNull();
    expect(googleFontsUrl([])).toBeNull();
  });
  it('requests only families that are not loaded yet', () => {
    const appended = [];
    const doc = { createElement: () => ({ dataset: {} }), head: { appendChild: el => appended.push(el) } };
    expect(ensureFonts(['DM Sans', 'Vazirmatn'], doc)).toEqual([]);
    expect(ensureFonts(['Cairo', 'Lora', 'Cairo'], doc)).toEqual(['Cairo', 'Lora']);
    expect(ensureFonts(['Cairo'], doc)).toEqual([]);
    expect(appended).toHaveLength(1);
    expect(appended[0].href).toContain('family=Cairo');
  });
});

import { srcsetFor, isUnsplash } from '../../builder/lib/images.js';

describe('responsive images', () => {
  it('builds srcsets only for Unsplash photos', () => {
    const s = srcsetFor('https://images.unsplash.com/photo-1?w=800&auto=format&fit=crop&q=80', [400, 800]);
    expect(s).toBe('https://images.unsplash.com/photo-1?w=400&auto=format&fit=crop&q=80 400w, https://images.unsplash.com/photo-1?w=800&auto=format&fit=crop&q=80 800w');
    expect(srcsetFor('data:image/png;base64,AAA')).toBe('');
    expect(isUnsplash('https://evil.example/images.unsplash.com/x')).toBe(false);
  });
});

import { buildStructuredData } from '../../builder/lib/seo.js';

describe('seo: structured data', () => {
  it('omits contact fields that are empty or placeholders', () => {
    const d = buildStructuredData({ contact: { whatsapp: '+964 750 123 4567', phone: '', email: 'not-an-email' }, socials: { instagram: 'https://instagram.com' } });
    expect(d.telephone).toBeUndefined();
    expect(d.email).toBeUndefined();
    expect(d.sameAs).toBeUndefined();
    expect(d.address).toEqual({ '@type': 'PostalAddress', addressLocality: 'Erbil', addressCountry: 'IQ' });
  });

  it('uses configured values', () => {
    const d = buildStructuredData(
      { contact: { phone: '+964 770 111 2233', email: 'shop@example.com', address: { en: 'Main St 1' } }, socials: { instagram: 'https://instagram.com/yummy' } },
      { name: 'Shop', url: 'https://example.com/' },
    );
    expect(d).toMatchObject({ name: 'Shop', url: 'https://example.com/', telephone: '+9647701112233', email: 'shop@example.com', sameAs: ['https://instagram.com/yummy'] });
    expect(d.address.streetAddress).toBe('Main St 1');
  });
});
