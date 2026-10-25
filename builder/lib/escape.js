// HTML-safety helpers. Every piece of text that did not come from the code itself
// (config, products, reviews, customer input, translations edited in the panel)
// must pass through one of these before it is placed in an HTML string.

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };

export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"'`]/g, ch => HTML_ESCAPES[ch]);
}

// A value used as a JavaScript argument inside an inline handler, e.g.
//   onclick="app.editProduct(${jsArg(id)})"
// JSON-encode first (JS string safety), then HTML-escape (attribute safety).
export function jsArg(value) {
  return escapeHTML(JSON.stringify(String(value ?? '')));
}

// Rich text with a strict whitelist: <strong>, <b>, <em>, <i> and <br> without attributes.
// Everything else is shown as text. Used for the announcement bar.
const ALLOWED_TAGS = ['strong', 'b', 'em', 'i'];

export function sanitizeInlineHTML(value) {
  let out = escapeHTML(value);
  for (const tag of ALLOWED_TAGS) {
    out = out
      .replace(new RegExp(`&lt;${tag}&gt;`, 'gi'), `<${tag}>`)
      .replace(new RegExp(`&lt;/${tag}&gt;`, 'gi'), `</${tag}>`);
  }
  out = out.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  return balanceTags(out);
}

// Close any whitelisted tags left open so they cannot swallow following markup.
function balanceTags(html) {
  const stack = [];
  html.replace(/<(\/?)(strong|b|em|i)>/gi, (_, closing, tag) => {
    tag = tag.toLowerCase();
    if (!closing) stack.push(tag);
    else if (stack[stack.length - 1] === tag) stack.pop();
    return '';
  });
  return html + stack.reverse().map(t => `</${t}>`).join('');
}

// Plain-text version of whitelisted rich text (for <title>, aria-labels, WhatsApp).
export function stripTags(value) {
  return String(value ?? '').replace(/<[^>]*>/g, '');
}

// URLs placed in src/href. Allows http(s), site-relative paths and inline raster images.
export function safeUrl(value, { allowDataImage = false } = {}) {
  const url = String(value ?? '').trim();
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (/^(\.{0,2}\/|#)/.test(url) && !url.startsWith('//')) return url;
  if (allowDataImage && /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(url)) return url;
  return '';
}

// Text for multi-line content (opening hours etc.): escaped, newlines become <br>.
export function escapeMultiline(value) {
  return escapeHTML(value).replace(/\r?\n/g, '<br>');
}
