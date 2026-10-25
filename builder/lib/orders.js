// Order record construction and validation.
//
// Limitation: prices are recomputed here from the product list the browser has loaded.
// Firestore rules check that totals are internally consistent, but they cannot re-price
// every line against the products collection; the bakery confirms the final price on WhatsApp.

import { computeBreakdown } from './pricing.js';
import { cartSubtotal } from './cart.js';

export const ORDER_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const clip = (v, n) => String(v ?? '').trim().slice(0, n);

export function buildOrderRecord({ customerId, customer = {}, lines, eco, promoCode = '', currency = 'USD', fulfillmentAt, note = '', lang = 'en', ref = '', now = new Date() }) {
  const subtotal = cartSubtotal(lines);
  const b = computeBreakdown(subtotal, eco, promoCode, now);
  return {
    customerId,
    customer: {
      name: clip(customer.name, 80),
      phone: clip(customer.phone, 32),
      address: clip(customer.address, 300),
    },
    items: lines.map(l => ({
      productId: l.productId,
      name: clip(l.name, 120),
      qty: l.qty,
      unitPriceUSD: l.unitPriceUSD,
      exclude: l.exclude || [],
    })),
    totals: { subtotal: b.subtotal, discount: b.discount, delivery: b.delivery, tax: b.tax, total: b.total },
    currency: currency === 'USD' ? 'USD' : String(eco?.secondaryCurrency || 'USD'),
    exchangeRate: Number(eco?.exchangeRate) || null,
    promoCode: b.promoValid ? b.promoCodeName : '',
    fulfillmentAt,
    note: clip(note, 500),
    lang: lang === 'ku' ? 'ku' : 'en',
    status: 'pending',
    source: 'whatsapp',
    ref: clip(ref, 20),
  };
}

// Client-side mirror of the Firestore rule checks, so problems are reported before a write.
export function validateOrderRecord(o) {
  const errors = [];
  if (!o.customerId) errors.push('customer');
  if (!Array.isArray(o.items) || o.items.length === 0 || o.items.length > 50) errors.push('items');
  for (const it of o.items || []) {
    if (!Number.isInteger(it.qty) || it.qty < 1 || it.qty > 99) errors.push('qty');
    if (!(it.unitPriceUSD >= 0)) errors.push('price');
  }
  const t = o.totals || {};
  const expected = (t.subtotal || 0) - (t.discount || 0) + (t.delivery || 0) + (t.tax || 0);
  if (!(t.total >= 0) || Math.abs(t.total - expected) >= 0.01 || t.discount > t.subtotal) errors.push('totals');
  if (!(o.fulfillmentAt instanceof Date) || isNaN(o.fulfillmentAt)) errors.push('date');
  if (o.status !== 'pending') errors.push('status');
  return [...new Set(errors)];
}
