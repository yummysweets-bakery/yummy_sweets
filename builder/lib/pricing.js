// Pricing engine: pure functions shared by the storefront tray, checkout and the
// Economy tab's live preview. Prices are stored in USD; the secondary currency is display only.

export const DEFAULT_ECONOMY = Object.freeze({
  primaryCurrency: 'USD',
  secondaryCurrency: 'IQD',
  showSecondary: true,
  currencySymbol: 'د.ع',
  exchangeRate: 1310,
  roundingRule: 250,
  autoRefreshRate: false,
  deliveryFee: 8,
  freeDeliveryOver: 60,
  minimumOrder: 0,
  pickupOnly: false,
  taxEnabled: false,
  taxRate: 0,
  taxLabel: 'VAT',
  taxIncluded: true,
  promoCode: '',
  promoType: 'percent',
  promoValue: 0,
  promoExpiry: '',
  leadTimeHours: 24,
  lastUpdatedRate: null,
});

export function hasSecondaryCurrency(eco) {
  return Boolean(eco && eco.showSecondary !== false && eco.secondaryCurrency && eco.secondaryCurrency !== 'None');
}

export function secondarySymbol(eco) {
  if (!eco) return '';
  return eco.currencySymbol || (eco.secondaryCurrency === 'IQD' ? 'د.ع' : eco.secondaryCurrency || '');
}

// Format a USD amount in the requested display currency.
export function formatMoney(usdAmount, eco, currency = 'USD', fallbackRate = 1310) {
  const amount = Number(usdAmount) || 0;
  if (currency !== 'USD' && hasSecondaryCurrency(eco)) {
    const rate = Number(eco.exchangeRate) > 0 ? Number(eco.exchangeRate) : fallbackRate;
    const raw = amount * rate;
    const rule = parseInt(eco.roundingRule, 10) || 250;
    const symbol = secondarySymbol(eco);
    if (rule > 1) {
      const rounded = Math.round(raw / rule) * rule;
      return new Intl.NumberFormat('en-US').format(rounded) + ' ' + symbol;
    }
    return symbol + ' ' + (Math.round(raw * 100) / 100).toFixed(2);
  }
  return '$' + amount.toFixed(2);
}

// Promo check on its own, so the tray can explain why a code was rejected.
export function checkPromo(eco, code, now = new Date()) {
  const testCode = String(code || '').trim().toUpperCase();
  const activeCode = String(eco?.promoCode || '').trim().toUpperCase();
  if (!testCode) return { status: 'empty', code: '' };
  if (!activeCode || testCode !== activeCode) return { status: 'invalid', code: testCode };
  if (eco.promoExpiry) {
    const expiry = new Date(eco.promoExpiry + 'T23:59:59');
    if (!isNaN(expiry.getTime()) && now > expiry) return { status: 'expired', code: activeCode };
  }
  return { status: 'valid', code: activeCode };
}

const round2 = n => Math.round(n * 100) / 100;

export function computeBreakdown(subtotalUSD, eco = DEFAULT_ECONOMY, promoCode = '', now = new Date()) {
  const subtotal = round2(Math.max(0, Number(subtotalUSD) || 0));

  let discount = 0;
  const promo = checkPromo(eco, promoCode, now);
  const promoValid = promo.status === 'valid';
  if (promoValid) {
    const value = Math.max(0, Number(eco.promoValue) || 0);
    discount = eco.promoType === 'percent'
      ? Math.min(subtotal, (subtotal * value) / 100)
      : Math.min(subtotal, value);
  }
  discount = round2(discount);

  const isPickupOnly = Boolean(eco.pickupOnly);
  const fee = Math.max(0, Number(eco.deliveryFee) || 0);
  const threshold = Math.max(0, Number(eco.freeDeliveryOver) || 0);
  let delivery = 0;
  let isFreeDelivery = false;
  if (!isPickupOnly) {
    if (threshold === 0 || subtotal >= threshold) isFreeDelivery = true;
    else delivery = fee;
  }

  const taxRate = Math.min(30, Math.max(0, Number(eco.taxRate) || 0));
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = eco.taxEnabled && !eco.taxIncluded && taxRate > 0 ? round2((taxableAmount * taxRate) / 100) : 0;

  const total = round2(Math.max(0, subtotal - discount + delivery + tax));

  const minOrder = Math.max(0, Number(eco.minimumOrder) || 0);
  const minOrderMet = minOrder === 0 || subtotal >= minOrder;

  return {
    subtotal,
    discount,
    promoCodeName: promoValid ? promo.code : '',
    promoValid,
    promoExpired: promo.status === 'expired',
    delivery,
    isPickupOnly,
    isFreeDelivery,
    deliveryFeeConfig: fee,
    freeDeliveryOverConfig: threshold,
    tax,
    taxRate,
    taxLabel: String(eco.taxLabel || 'VAT').trim(),
    taxEnabled: Boolean(eco.taxEnabled),
    taxIncluded: Boolean(eco.taxIncluded),
    total,
    minOrder,
    minOrderMet,
    minOrderRemaining: minOrderMet ? 0 : round2(minOrder - subtotal),
  };
}
