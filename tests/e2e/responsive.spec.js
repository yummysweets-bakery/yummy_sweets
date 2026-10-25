import { test, expect } from '@playwright/test';
import { isolate, openStore, addFirstProduct, seedCache } from './helpers.js';

const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1920];
const SHOTS = 'test-results/screens';

for (const width of WIDTHS) {
  test(`layout at ${width}px`, async ({ browser }) => {
    const mobile = width < 800;
    const ctx = await browser.newContext({ viewport: { width, height: mobile ? 800 : 900 }, hasTouch: mobile, isMobile: mobile });
    const page = await ctx.newPage();
    await isolate(page);
    await seedCache(page, { config: { contact: { whatsapp: '9647501112233', phone: '+964 750 111 2233' } } });
    await openStore(page);

    // No horizontal scrolling
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    // Header fits on one row; nav labels never wrap
    const header = await page.locator('#mainHeader').boundingBox();
    expect(header.height).toBeLessThan(90);
    const wrapped = await page.evaluate(() => [...document.querySelectorAll('#desktopNav .nav__link')]
      .filter(a => a.offsetParent !== null)
      .filter(a => a.getBoundingClientRect().height > parseFloat(getComputedStyle(a).lineHeight || '20') * 1.6 + 20).length);
    expect(wrapped).toBe(0);

    // Important touch controls are large enough on touch screens
    if (mobile) {
      const small = await page.evaluate(() => ['#burgerBtn', '#menuGrid .cake-card .btn', '#filter-all']
        .map(sel => document.querySelector(sel))
        .filter(Boolean)
        .map(el => el.getBoundingClientRect())
        .filter(r => r.height < 40 || r.width < 40).length);
      expect(small).toBe(0);
    }

    await page.screenshot({ path: `${SHOTS}/${width}-top.png` });
    await page.locator('#menu').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('menuToolbar').scrollIntoView({ block: 'start' }));
    await page.screenshot({ path: `${SHOTS}/${width}-menu.png` });

    // Open tray with an item
    await addFirstProduct(page);
    await page.click('#btnTrayToggle');
    const tray = await page.locator('#orderTray').boundingBox();
    expect(tray.width).toBeLessThanOrEqual(width);
    expect(tray.x).toBeGreaterThanOrEqual(0);
    await page.screenshot({ path: `${SHOTS}/${width}-tray.png` });

    // Footer readable at every width
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await expect(page.locator('#footerHours')).toBeVisible();
    await page.locator('.site-footer').screenshot({ path: `${SHOTS}/${width}-footer.png` });

    if (mobile) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.click('#burgerBtn');
      await expect(page.locator('#mobileNav')).toBeVisible();
      const nav = await page.locator('#mobileNav').boundingBox();
      const hdr = await page.locator('#mainHeader').boundingBox();
      expect(nav.y).toBeGreaterThanOrEqual(hdr.y + hdr.height - 2);
      await page.screenshot({ path: `${SHOTS}/${width}-drawer.png` });
    }
    await ctx.close();
  });
}

for (const variant of ['dark', 'rtl']) {
  test(`mobile ${variant} rendering`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await isolate(page);
    await openStore(page);
    if (variant === 'dark') await page.click('#burgerBtn').then(() => page.click('#mobileThemeModeToggle')).then(() => page.click('#burgerBtn'));
    else await page.evaluate(() => app.setLanguage('ku'));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({ path: `${SHOTS}/375-${variant}-top.png` });
    await addFirstProduct(page);
    await page.click('#btnTrayToggle');
    await page.screenshot({ path: `${SHOTS}/375-${variant}-tray.png` });
    await ctx.close();
  });
}

test('header stays visible while scrolling', async ({ page }) => {
  await isolate(page);
  await openStore(page);
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(200);
  const box = await page.locator('#mainHeader').boundingBox();
  expect(box.y).toBeLessThanOrEqual(1);
  await expect(page.locator('#mainHeader')).toBeInViewport();
});
