// Structured data (schema.org Bakery) built from the live shop config.
// Only fields the owner has actually set are emitted; nothing is filled with placeholders.

import { normalizeWhatsAppNumber } from './whatsapp.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A real profile link, not a bare network homepage such as https://instagram.com
function isProfileUrl(u) {
  if (typeof u !== 'string') return false;
  try {
    const url = new URL(u);
    return url.protocol === 'https:' && url.pathname.replace(/\/+$/, '').length > 1;
  } catch { return false; }
}

export function buildStructuredData(config = {}, { name = 'Yummy Sweets', description = '', url = '', image = '' } = {}) {
  const data = { '@context': 'https://schema.org', '@type': 'Bakery', name };
  if (description) data.description = description;
  if (url) data.url = url;
  if (image) data.image = image;

  const contact = config.contact || {};
  const phone = normalizeWhatsAppNumber(contact.phone) || normalizeWhatsAppNumber(contact.whatsapp);
  if (phone) data.telephone = `+${phone}`;
  const email = String(contact.email || '').trim();
  if (EMAIL.test(email)) data.email = email;

  const street = String(contact.address?.en || '').trim();
  data.address = { '@type': 'PostalAddress', addressLocality: 'Erbil', addressCountry: 'IQ' };
  if (street) data.address.streetAddress = street;

  const sameAs = Object.values(config.socials || {})
    .map(s => (typeof s === 'string' ? s : s?.url))
    .filter(isProfileUrl);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}
