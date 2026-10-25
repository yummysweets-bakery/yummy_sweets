import { escapeHTML } from './escape.js';

// Kurdish/Arabic-script normalisation: strip harakat and fold look-alike letters
// so "كيك" and "کێک"-style spellings match each other.
export function normalizeKurdish(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ه/g, 'ە')
    .trim();
}

export function searchTokens(query) {
  return String(query || '').trim().split(/\s+/).map(normalizeKurdish).filter(Boolean);
}

export function matchesSearch(product, tokens) {
  if (!tokens.length) return true;
  const haystack = normalizeKurdish([
    product.name?.en, product.desc?.en, product.name?.ku, product.desc?.ku, product.category, product.tag,
  ].filter(Boolean).join(' '));
  return tokens.every(tok => haystack.includes(tok));
}

// Returns escaped HTML with <mark> around query matches.
// Matching runs on the raw text and each segment is escaped separately,
// so markup in the text can never become live and entities are never split.
export function highlightMatches(text, query) {
  const raw = String(text ?? '');
  const tokens = String(query || '').trim().split(/\s+/).filter(Boolean);
  if (!raw || !tokens.length) return escapeHTML(raw);

  const pattern = tokens
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
    .join('|');
  let regex;
  try {
    regex = new RegExp(`(${pattern})`, 'giu');
  } catch {
    return escapeHTML(raw);
  }

  let out = '';
  let last = 0;
  for (const m of raw.matchAll(regex)) {
    if (!m[0]) continue;
    out += escapeHTML(raw.slice(last, m.index));
    out += `<mark class="search-highlight">${escapeHTML(m[0])}</mark>`;
    last = m.index + m[0].length;
  }
  return out + escapeHTML(raw.slice(last));
}
