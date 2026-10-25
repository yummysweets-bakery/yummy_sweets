// Security regressions for the audit findings (no network; data injected through the
// cached-data path the app uses for Firestore content).
import { test, expect } from '@playwright/test';
import { isolate, openStore, seedCache, addFirstProduct } from './helpers.js';

const PAYLOADS = [
  '<img src=x onerror="window.__xss=(window.__xss||0)+1">',
  '<script>window.__xss=(window.__xss||0)+1</script>',
  '<svg onload="window.__xss=(window.__xss||0)+1"></svg>',
  '"><img src=x onerror="window.__xss=(window.__xss||0)+1">',
  "');window.__xss=(window.__xss||0)+1;('",
];
const evil = PAYLOADS.join(' ');

test.beforeEach(async ({ page }) => {
  await isolate(page);
});

test('malicious product data is rendered as text and never executes', async ({ page }) => {
  await seedCache(page, {
    products: [
      { id: `p1');window.__xss=1;('`, category: 'cakes', priceUSD: 10, emoji: '<img src=x onerror="window.__xss=1">',
        img: 'javascript:window.__xss=1', tag: 'bestseller',
        name: { en: `Evil ${evil}`, ku: evil }, desc: { en: evil, ku: evil }, unit: { en: evil, ku: evil },
        exclusions: [{ id: `x"><img src=x onerror=window.__xss=1>`, en: evil, ku: evil }] },
    ],
  });
  await openStore(page);
  await expect(page.locator('#menuGrid .cake-card')).toHaveCount(1);
  await expect(page.locator('#menuGrid .cake-card__title')).toContainText('<img src=x');
  // search highlighting path
  await page.fill('#menuSearchInput', 'Evil');
  await expect(page.locator('#menuGrid mark')).toHaveCount(1);
  // customise dialog + cart paths
  await addFirstProduct(page);
  await page.locator('#customizeModal input[type=checkbox]').first().check();
  await page.locator('#customizeModal [data-add]').click();
  await page.click('#btnTrayToggle');
  await expect(page.locator('#trayLines .tray-line')).toHaveCount(1);
  await page.locator('#trayLines .qty-btn[data-qty-action="inc"]').click();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  expect(await page.locator('#menuGrid img[src^="javascript"]').count()).toBe(0);
  expect(await page.locator('#menuGrid script, #menuGrid svg[onload]').count()).toBe(0);
});

test('malicious FAQ, reviews, contact and announcement content cannot execute', async ({ page }) => {
  await seedCache(page, {
    config: {
      announcement: { en: `<strong>Hi</strong> ${evil} <a href="javascript:window.__xss=1">x</a>`, ku: evil },
      faq: [{ q: { en: evil, ku: evil }, a: { en: evil, ku: evil } }],
      reviews: [{ initials: '<b>', name: { en: evil, ku: evil }, role: { en: evil, ku: evil }, quote: { en: evil, ku: evil } }],
      contact: { whatsapp: '9647501112233', phone: evil, email: evil, address: { en: evil, ku: evil }, hours: { en: evil, ku: evil } },
      socials: { instagram: 'javascript:window.__xss=1', facebook: 'https://facebook.com/x' },
      shopName: { en: evil, ku: evil },
      tagline: { en: evil, ku: evil },
      logoMode: 'url',
      logoUrl: 'javascript:window.__xss=1',
      aboutUs: { en: evil, ku: evil, imageUrl: 'javascript:window.__xss=1' },
    },
  });
  await openStore(page);
  await page.locator('#faq summary').first().click();
  await page.evaluate(() => app.setLanguage('ku'));
  await page.evaluate(() => app.setLanguage('en'));
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  // Only the whitelisted <strong> survives in the announcement
  await expect(page.locator('#announcementText strong').first()).toHaveText('Hi');
  expect(await page.locator('#announcementText a, #announcementText img').count()).toBe(0);
  expect(await page.locator('#faqWrap img, #reviewsGrid img, #infoContact img, #infoHours img').count()).toBe(0);
  await expect(page.locator('#socialInsta')).toBeHidden();
  await expect(page.locator('#socialFb')).toHaveAttribute('href', 'https://facebook.com/x');
  expect(await page.locator('[data-logo] img').count()).toBe(0);
});

test('a forged localStorage session cannot open the control panel', async ({ page }) => {
  await page.addInitScript(() => {
    const forged = JSON.stringify({ user: { id: 'x', name: 'Forged', role: 'dev' }, expires: Date.now() + 1e9 });
    localStorage.setItem('sc_session_v2', forged);
    localStorage.setItem('yummy_session', forged);
  });
  await openStore(page);
  await page.evaluate(() => app.openPanelModal());
  await expect(page.locator('#panelModal')).not.toHaveClass(/is-open/);
  await expect(page.locator('#staffAuthModal')).toHaveClass(/is-open/);
  expect(await page.locator('#panelSidebar [role=tab]').count()).toBe(0);
  // The forged keys are deleted on startup
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).not.toContain('sc_session_v2');
  expect(keys).not.toContain('yummy_session');
});

test('legacy stores with plaintext passwords and other customers\' data are purged', async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('sc_users_v2', JSON.stringify([{ username: 'x', password: 'secret' }]));
    localStorage.setItem('sc_orders_v2', JSON.stringify([{ customerName: 'Other customer' }]));
    localStorage.setItem('sc_customer_notes_v2', JSON.stringify({ a: 'note' }));
  });
  await openStore(page);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  for (const k of ['sc_users_v2', 'sc_orders_v2', 'sc_customer_notes_v2', 'yummy_users']) expect(keys).not.toContain(k);
  const dump = await page.evaluate(() => JSON.stringify({ ...localStorage }));
  expect(dump).not.toContain('password');
});

test('the shipped page contains no credentials or local password login', async ({ page, request }) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toMatch(/password\s*:\s*['"][^'"]+['"]/i);
  expect(html).not.toContain('DEFAULT_USERS');
  expect(html).not.toMatch(/backdoor/i);
  await openStore(page);
  expect(await page.evaluate(() => typeof app.users)).toBe('undefined');
});

test('without a staff session, saving reports failure instead of success', async ({ page }) => {
  await openStore(page);
  const ok = await page.evaluate(() => app.saveConfig('brand'));
  expect(ok).toBe(false);
  await expect(page.locator('#toastContainer')).toContainText('Sign in with a staff account');
  await expect(page.locator('#toastContainer')).not.toContainText('Saved');
});

test('reviews cannot be posted without signing in and never show fake success', async ({ page }) => {
  await openStore(page);
  await page.getByRole('button', { name: 'Leave a Review' }).click();
  await expect(page.locator('#reviewSignInGate')).toBeVisible();
  await expect(page.locator('#reviewSubmitForm')).toBeHidden();
  await expect(page.locator('#toastContainer')).not.toContainText('submitted');
});
