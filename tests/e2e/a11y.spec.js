import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { isolate, openStore, addFirstProduct, seedCache } from './helpers.js';

test.beforeEach(async ({ page }) => {
  await isolate(page);
  await seedCache(page, { config: { contact: { whatsapp: '9647501112233', phone: '+964 750 111 2233' } } });
});

async function axe(page, include) {
  let builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
  if (include) builder = builder.include(include);
  const { violations } = await builder.analyze();
  return violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.slice(0, 3).map(n => n.target.join(' ')) }));
}

for (const mode of ['light', 'dark']) {
  test(`storefront has no WCAG A/AA violations (${mode})`, async ({ page }) => {
    await openStore(page);
    if (mode === 'dark') await page.click('#themeModeToggle');
    await page.waitForTimeout(200);
    const violations = await axe(page);
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });
}

test('storefront in Kurdish (RTL) has no WCAG A/AA violations', async ({ page }) => {
  await openStore(page);
  await page.click('#btnLangKu');
  const violations = await axe(page);
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test('open order tray has no violations in light and dark mode', async ({ page }) => {
  await openStore(page);
  await addFirstProduct(page);
  await page.click('#btnTrayToggle');
  expect(await axe(page, '#orderTray')).toEqual([]);
  await page.click('#themeModeToggle');
  expect(await axe(page, '#orderTray')).toEqual([]);
});

test('sign-in dialog: focus moves in, stays in, Escape closes and focus returns', async ({ page }) => {
  await openStore(page);
  const trigger = page.locator('#desktopAuthContainer button', { hasText: 'Sign In' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.locator('#authModal');
  await expect(dialog).toHaveClass(/is-open/);
  await expect(dialog.getByRole('button', { name: 'Continue with Google' })).toBeFocused();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement.closest('#authModal'))).toBe(true);
  }
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => !!document.activeElement.closest('#authModal'))).toBe(true);
  expect(await axe(page, '#authModal')).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toHaveClass(/is-open/);
  await expect(trigger).toBeFocused();
});

test('review and confirm dialogs have accessible names', async ({ page }) => {
  await openStore(page);
  await page.getByRole('button', { name: 'Leave a Review' }).click();
  await expect(page.getByRole('dialog', { name: 'Leave a Review' })).toBeVisible();
  expect(await axe(page, '#submitReviewModal')).toEqual([]);
  await page.keyboard.press('Escape');
  await addFirstProduct(page);
  await page.getByRole('button', { name: 'Clear Order' }).click();
  await expect(page.getByRole('alertdialog', { name: 'Clear your order?' })).toBeVisible();
  await expect(page.locator('#confirmCancelBtn')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#customConfirmModal')).not.toHaveClass(/is-open/);
});

test('the cart can be used with the keyboard only', async ({ page }) => {
  await openStore(page);
  const add = page.locator('#menuGrid .cake-card').first().getByRole('button');
  await add.focus();
  await page.keyboard.press('Enter');
  const summary = page.locator('.order-tray__meta');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#trayBreakdown')).toBeVisible();
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  const inc = page.locator('#trayLines .qty-btn[data-qty-action="inc"]').first();
  await inc.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#trayLines .qty-value').first()).toHaveText('2');
  // Focus stays on the quantity control after the tray re-renders
  expect(await page.evaluate(() => document.activeElement.closest('.tray-line') !== null)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.locator('#trayBreakdown')).toBeHidden();
});

test('skip link is first and jumps to the menu', async ({ page }) => {
  await openStore(page);
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  expect(page.url()).toContain('#menu');
});

test('heading outline starts with one h1 and section h2s', async ({ page }) => {
  await openStore(page);
  expect(await page.locator('h1').count()).toBe(1);
  const h2 = await page.locator('main h2').allTextContents();
  expect(h2.length).toBeGreaterThanOrEqual(5);
});

test('reduced motion: content is not hidden waiting for scroll animations', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await isolate(page);
  await page.goto('/');
  await page.waitForTimeout(600);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('.feature-card, .step-card, .review-card, .faq-item')]
    .filter(e => getComputedStyle(e).opacity === '0').length);
  expect(hidden).toBe(0);
  await ctx.close();
});
