// Delivery / pickup date handling for <input type="datetime-local">.
//
// The shop's FAQ promises that signature cakes ordered 24 hours ahead are guaranteed,
// so 24 hours is the default lead time. It can be changed with economy.leadTimeHours.
// Opening hours are free text in the config and are not parsed or enforced here.

export const DEFAULT_LEAD_HOURS = 24;

const pad = n => String(n).padStart(2, '0');

export function leadHours(eco) {
  const n = Number(eco?.leadTimeHours);
  return Number.isFinite(n) && n >= 0 && n <= 24 * 30 ? n : DEFAULT_LEAD_HOURS;
}

// Earliest allowed slot: now + lead time, rounded up to the next quarter hour.
export function earliestFulfillment(now = new Date(), hours = DEFAULT_LEAD_HOURS) {
  const d = new Date(now.getTime() + hours * 3600 * 1000);
  d.setSeconds(0, 0);
  const rem = d.getMinutes() % 15;
  if (rem) d.setMinutes(d.getMinutes() + (15 - rem));
  return d;
}

// Local wall-clock value used by datetime-local inputs (YYYY-MM-DDTHH:mm).
export function toLocalInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function parseLocalInput(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(value || '').trim());
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number);
  const date = new Date(y, mo - 1, d, h, mi, 0, 0);
  // Reject impossible dates such as 2026-02-31 that Date would silently roll over.
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d || date.getHours() !== h) return null;
  return date;
}

export function validateFulfillment(value, now = new Date(), hours = DEFAULT_LEAD_HOURS) {
  if (!value) return { ok: false, error: 'missing' };
  const date = parseLocalInput(value);
  if (!date) return { ok: false, error: 'invalid' };
  const earliest = earliestFulfillment(now, hours);
  // Allow the earliest slot itself even if a few seconds have passed since it was computed.
  if (date.getTime() < earliest.getTime() - 15 * 60 * 1000) return { ok: false, error: 'too-soon', earliest };
  const latest = new Date(now.getTime() + 365 * 24 * 3600 * 1000);
  if (date > latest) return { ok: false, error: 'too-far' };
  return { ok: true, date };
}

export function formatFulfillment(date, lang = 'en') {
  const locales = lang === 'ku' ? ['ckb-IQ', 'ckb', 'ar-IQ'] : ['en-GB'];
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  for (const locale of locales) {
    try {
      return new Intl.DateTimeFormat(locale, opts).format(date);
    } catch {
      // try the next locale
    }
  }
  return date.toISOString();
}
