// WhatsApp checkout message and link.

// Numbers that ship as examples and must never receive real orders.
const PLACEHOLDER_NUMBERS = new Set(['15551234567', '9647501234567', '1234567890']);

// Returns digits only (international format without "+"), or null when the number is unusable.
export function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return null;
  if (PLACEHOLDER_NUMBERS.has(digits)) return null;
  return digits;
}

export function buildWhatsAppUrl(number, message) {
  const n = normalizeWhatsAppNumber(number);
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

const LABELS = {
  en: {
    greeting: shop => `Hello ${shop}! I'd like to place an order:`,
    no: 'No',
    subtotal: 'Subtotal',
    discount: 'Discount',
    delivery: 'Delivery',
    free: 'Free',
    pickup: 'Pickup',
    tax: 'Tax',
    total: 'Total',
    name: 'Name',
    phone: 'Phone',
    address: 'Delivery address',
    when: 'Requested date & time',
    note: 'Note for the baker',
    orderRef: 'Order reference',
  },
  ku: {
    greeting: shop => `سڵاو ${shop}! دەمەوێت ئەم داواکارییە تۆمار بکەم:`,
    no: 'بەبێ',
    subtotal: 'کۆی لاوەکی',
    discount: 'داشکاندن',
    delivery: 'گەیاندن',
    free: 'خۆڕایی',
    pickup: 'وەرگرتن لە چێشتخانە',
    tax: 'باج',
    total: 'کۆی گشتی',
    name: 'ناو',
    phone: 'ژمارەی مۆبایل',
    address: 'ناونیشانی گەیاندن',
    when: 'بەروار و کاتی داواکراو',
    note: 'تێبینی بۆ شیرینیپەز',
    orderRef: 'ژمارەی داواکاری',
  },
};

// fmt: (usdAmount) => formatted string in the customer's selected currency.
export function buildOrderMessage({
  lang = 'en', shopName, lines, breakdown, fmt, customer = {}, fulfillmentText = '', note = '', orderRef = '',
}) {
  const L = LABELS[lang] || LABELS.en;
  const out = [L.greeting(shopName), ''];

  for (const line of lines) {
    out.push(`• ${line.qty} × ${line.name} — ${fmt(line.lineTotalUSD)}`);
    if (line.excludeLabels && line.excludeLabels.length) {
      out.push(`   ${line.excludeLabels.map(x => `${L.no} ${x}`).join(' · ')}`);
    }
  }

  out.push('', `${L.subtotal}: ${fmt(breakdown.subtotal)}`);
  if (breakdown.discount > 0) {
    out.push(`${L.discount}${breakdown.promoCodeName ? ` (${breakdown.promoCodeName})` : ''}: −${fmt(breakdown.discount)}`);
  }
  if (breakdown.isPickupOnly) out.push(`${L.delivery}: ${L.pickup}`);
  else if (breakdown.isFreeDelivery) out.push(`${L.delivery}: ${L.free}`);
  else out.push(`${L.delivery}: ${fmt(breakdown.delivery)}`);
  if (breakdown.tax > 0) out.push(`${L.tax} (${breakdown.taxLabel} ${breakdown.taxRate}%): ${fmt(breakdown.tax)}`);
  out.push('────────────────', `${L.total}: ${fmt(breakdown.total)}`, '');

  if (customer.name) out.push(`${L.name}: ${customer.name}`);
  if (customer.phone) out.push(`${L.phone}: ${customer.phone}`);
  if (fulfillmentText) out.push(`${L.when}: ${fulfillmentText}`);
  out.push(`${L.address}: ${customer.address || ''}`);
  if (note) out.push('', `${L.note}: ${note}`);
  if (orderRef) out.push('', `${L.orderRef}: ${orderRef}`);

  return out.join('\n');
}
