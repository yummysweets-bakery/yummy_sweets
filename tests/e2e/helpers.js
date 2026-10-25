// Shared helpers for the storefront tests.
import { expect } from '@playwright/test';

// Block everything that is not the local dev server, so tests can never reach
// the live Firebase project (or depend on Google Fonts / Unsplash).
export async function isolate(page, { allowEmulators = false } = {}) {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, route => route.abort());
  if (!allowEmulators) {
    await page.route(/127\.0\.0\.1:(8080|9099|9199|4400)/, route => route.abort());
  }
  await page.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => { window.__opened.push(String(url)); return null; };
  });
}

export async function openStore(page, path = '/') {
  await page.goto(path);
  await expect(page.locator('#menuGrid .cake-card').first()).toBeVisible();
  // Reveal animations would hide cards from screenshots.
  await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  await page.evaluate(() => document.querySelectorAll('[style*="opacity: 0"]').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; }));
}

export const addFirstProduct = (page, n = 0) =>
  page.locator('#menuGrid .cake-card').nth(n).getByRole('button').click();

// Seeds the cached data the app uses when Firestore is unreachable — the same code path
// that renders data coming from Firestore — so malicious content can be injected safely.
export async function seedCache(page, { config, products } = {}) {
  await page.addInitScript(([c, p]) => {
    if (c) localStorage.setItem('sc_config_v2', JSON.stringify(c));
    if (p) localStorage.setItem('sc_products_v2', JSON.stringify(p));
  }, [config || null, products || null]);
}

export function future(hours = 48) {
  const d = new Date(Date.now() + hours * 3600e3);
  d.setMinutes(0, 0, 0);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function contrast(fg, bg) {
  const lum = c => {
    const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [a, b] = [lum(fg), lum(bg)];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
