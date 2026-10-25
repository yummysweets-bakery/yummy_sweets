import { test, expect } from '@playwright/test';
import { isolate, openStore, addFirstProduct, seedCache, future } from './helpers.js';

const WA = '9647501112233';

test.beforeEach(async ({ page }) => {
  await isolate(page);
});

test.describe('menu browsing', () => {
  test('loads the menu', async ({ page }) => {
    await openStore(page);
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 14 of 14 cakes');
  });

  test('search filters, highlights and shows an empty state', async ({ page }) => {
    await openStore(page);
    await page.fill('#menuSearchInput', 'choc');
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 5 of 14 cakes');
    await expect(page.locator('#menuGrid mark.search-highlight').first()).toBeVisible();
    await page.fill('#menuSearchInput', 'zzzzqq');
    await expect(page.locator('.menu-empty-state')).toContainText('No cakes match');
    await page.getByRole('button', { name: 'Clear all filters' }).click();
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 14 of 14 cakes');
  });

  test('Kurdish search matches Arabic-keyboard spellings', async ({ page }) => {
    await openStore(page);
    await page.evaluate(() => app.setLanguage('ku'));
    // "كێك" typed with an Arabic kaf still matches "کێک"
    await page.fill('#menuSearchInput', 'كێك');
    await expect(page.locator('#menuGrid .cake-card').first()).toBeVisible();
    const count = await page.locator('#menuGrid .cake-card').count();
    expect(count).toBeGreaterThan(0);
  });

  test('category, price and sort filters work and restore from the URL', async ({ page }) => {
    await openStore(page);
    await page.click('#filter-cupcakes');
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 4 of 14 cakes');
    await expect(page.locator('#filter-cupcakes')).toHaveAttribute('aria-pressed', 'true');
    await page.click('#filter-all');
    await page.selectOption('#menuSortSelect', 'price-asc');
    await page.selectOption('#menuPriceSelect', 'under-20');
    const prices = await page.locator('#menuGrid .price').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
    expect(nums.every((v, i) => i === 0 || nums[i - 1] <= v)).toBe(true);
    expect(Math.max(...nums)).toBeLessThan(20);
    expect(page.url()).toContain('#menu?sort=price-asc&range=under-20');

    await page.goto('/#menu?sort=price-asc&range=under-20');
    await expect(page.locator('#menuSortSelect')).toHaveValue('price-asc');
    await expect(page.locator('#menuPriceSelect')).toHaveValue('under-20');
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 2 of 14 cakes');
  });

  test('a tampered URL falls back to defaults', async ({ page }) => {
    await page.goto('/#menu?cat=%3Cimg%20src%3Dx%3E&sort=evil');
    await expect(page.locator('#menuResultsCount')).toHaveText('Showing 14 of 14 cakes');
  });
});

test.describe('editable, persistent cart', () => {
  test('quantities can be changed and items removed; totals update', async ({ page }) => {
    await openStore(page);
    await addFirstProduct(page, 0);
    await addFirstProduct(page, 2);
    await page.click('#btnTrayToggle');
    const lines = page.locator('#trayLines .tray-line');
    await expect(lines).toHaveCount(2);
    const first = lines.first();
    const name = (await first.locator('.tray-line__name').textContent()).trim();
    await first.getByRole('button', { name: `One more ${name}` }).click();
    await expect(first.locator('.qty-value')).toHaveText('2');
    await expect(page.locator('#trayItemCount')).toHaveText('3');
    const total1 = await page.locator('#trayTotalPrice').textContent();
    await page.locator('#trayLines .tray-line').first().getByRole('button', { name: `One fewer ${name}` }).click();
    await expect(page.locator('#trayLines .tray-line').first().locator('.qty-value')).toHaveText('1');
    expect(await page.locator('#trayTotalPrice').textContent()).not.toBe(total1);
    await page.locator('#trayLines .tray-line').first().getByRole('button', { name: `Remove ${name}` }).click();
    await expect(page.locator('#trayLines .tray-line')).toHaveCount(1);
    await expect(page.locator('#srAnnouncer')).toContainText('removed from your order');
  });

  test('cart survives reloads, including quantity changes and removals', async ({ page }) => {
    await openStore(page);
    await addFirstProduct(page, 0);
    await addFirstProduct(page, 0);
    await addFirstProduct(page, 1);
    await page.reload();
    await expect(page.locator('#trayItemCount')).toHaveText('3');
    await page.click('#btnTrayToggle');
    const second = page.locator('#trayLines .tray-line').nth(1);
    await second.locator('.tray-line__remove').click();
    await page.reload();
    await expect(page.locator('#trayItemCount')).toHaveText('2');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ys_cart_v1')));
    expect(stored).toEqual([{ productId: expect.any(String), qty: 2, exclude: [] }]);
    expect(JSON.stringify(stored)).not.toMatch(/price|total/i);
  });

  test('corrupted or stale cart data is ignored safely', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('ys_cart_v1', JSON.stringify([{ productId: 'gone', qty: 3 }, { productId: 'p1', qty: -2 }, { productId: 'p2', qty: 2, priceUSD: 0.01 }]));
    });
    await openStore(page);
    await expect(page.locator('#trayItemCount')).toHaveText('2');
    await page.click('#btnTrayToggle');
    await expect(page.locator('#trayLines .tray-line')).toHaveCount(1);
    // Price comes from the product list, not the stored value
    await expect(page.locator('#trayLines .tray-line__unit')).toContainText('$42.00');
  });

  test('clearing the order asks first', async ({ page }) => {
    await openStore(page);
    await addFirstProduct(page, 0);
    await page.getByRole('button', { name: 'Clear Order' }).click();
    await expect(page.locator('#customConfirmModal')).toHaveClass(/is-open/);
    await page.click('#confirmCancelBtn');
    await expect(page.locator('#trayItemCount')).toHaveText('1');
    await page.getByRole('button', { name: 'Clear Order' }).click();
    await page.click('#confirmOkBtn');
    await expect(page.locator('#orderTray')).not.toHaveClass(/is-visible/);
  });
});

test.describe('WhatsApp checkout', () => {
  test('refuses to send to an unconfigured or placeholder number', async ({ page }) => {
    await seedCache(page, { config: { contact: { whatsapp: '15551234567' } } });
    await openStore(page);
    await addFirstProduct(page);
    await page.click('#btnTrayToggle');
    await page.fill('#trayCustName', 'Sara');
    await page.fill('#trayFulfillmentDate', future(48));
    await page.click('#btnTrayWhatsApp');
    await expect(page.locator('#trayCheckoutError')).toContainText("isn't set up");
    expect(await page.evaluate(() => window.__opened.length)).toBe(0);
  });

  test('validates name and date, rejects past dates', async ({ page }) => {
    await seedCache(page, { config: { contact: { whatsapp: WA } } });
    await openStore(page);
    await addFirstProduct(page);
    await page.click('#btnTrayWhatsApp');
    await expect(page.locator('#trayCheckoutError')).toContainText('Add your name');
    await expect(page.locator('#trayCustName')).toBeFocused();
    await page.fill('#trayCustName', 'Sara');
    await page.click('#btnTrayWhatsApp');
    await expect(page.locator('#trayCheckoutError')).toContainText('Choose a delivery or pickup date');
    await page.fill('#trayFulfillmentDate', '2020-01-01T10:00');
    await page.click('#btnTrayWhatsApp');
    await expect(page.locator('#trayCheckoutError')).toContainText('at least 24 hours');
    expect(await page.evaluate(() => window.__opened.length)).toBe(0);
    const min = await page.locator('#trayFulfillmentDate').getAttribute('min');
    expect(min > new Date().toISOString().slice(0, 10)).toBe(true);
  });

  test('builds a complete message in the selected currency and keeps the tray', async ({ page }) => {
    await seedCache(page, { config: { contact: { whatsapp: WA } } });
    await openStore(page);
    await page.evaluate(() => app.setCurrency('IQD'));
    await addFirstProduct(page, 0);
    await addFirstProduct(page, 0);
    await page.click('#btnTrayToggle');
    await page.fill('#trayCustName', 'Sara');
    await page.fill('#trayCustPhone', '+964 750 000 0000');
    await page.fill('#trayCustAddress', 'Dream City, Erbil');
    await page.fill('#trayFulfillmentDate', future(50));
    await page.fill('#trayOrderNote', 'Happy birthday Lana');
    await page.click('#btnTrayWhatsApp');

    const url = await page.evaluate(() => window.__opened[0]);
    expect(url.startsWith(`https://wa.me/${WA}?text=`)).toBe(true);
    const msg = decodeURIComponent(url.split('text=')[1]);
    expect(msg).toMatch(/• 2 × .+ — [\d,]+ د\.ع/);
    expect(msg).toMatch(/Subtotal: [\d,]+ د\.ع/);
    expect(msg).toMatch(/Total: [\d,]+ د\.ع/);
    expect(msg).not.toContain('$');
    expect(msg).toContain('Name: Sara');
    expect(msg).toContain('Phone: +964 750 000 0000');
    expect(msg).toContain('Delivery address: Dream City, Erbil');
    expect(msg).toMatch(/Requested date & time: \w+day, \d+ \w+ \d{4} at \d{2}:\d{2}/);
    expect(msg).toContain('Note for the baker: Happy birthday Lana');
    expect(msg).toMatch(/Order reference: YS-/);

    // WhatsApp opening doesn't prove the order was sent: tray stays, honest notice shown
    await expect(page.locator('#traySentNotice')).toBeVisible();
    await expect(page.locator('#trayItemCount')).toHaveText('2');

    // The same order again asks before opening a duplicate
    await page.click('#btnTrayWhatsApp');
    await expect(page.locator('#customConfirmModal')).toHaveClass(/is-open/);
    await page.click('#confirmCancelBtn');
    expect(await page.evaluate(() => window.__opened.length)).toBe(1);

    // Device order history keeps the date and the note
    const history = await page.evaluate(() => JSON.parse(localStorage.getItem('ys_my_orders_v1')));
    expect(history[0].note).toBe('Happy birthday Lana');
    expect(history[0].fulfillmentAt).toBeGreaterThan(Date.now());

    await page.getByRole('button', { name: 'I sent it — clear the tray' }).click();
    await expect(page.locator('#orderTray')).not.toHaveClass(/is-visible/);
  });

  test('order history modal lists orders sent from this device', async ({ page }) => {
    await seedCache(page, { config: { contact: { whatsapp: WA } } });
    await openStore(page);
    await addFirstProduct(page);
    await page.click('#btnTrayToggle');
    await page.fill('#trayCustName', 'Sara');
    await page.fill('#trayFulfillmentDate', future(30));
    await page.click('#btnTrayWhatsApp');
    await page.getByRole('button', { name: 'My orders' }).first().click();
    await expect(page.locator('#historyOrdersList .history-order-card')).toHaveCount(1);
    await expect(page.locator('#historyScopeNote')).toContainText('sent from this device');
  });
});

test.describe('language, theme and layout', () => {
  test('Kurdish switches to RTL with translated labels', async ({ page }) => {
    await openStore(page);
    await page.click('#btnLangKu');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ckb');
    await expect(page.locator('#btnTrayWhatsApp')).toHaveText('ناردنی داواکاری لە واتسئاپ');
    await addFirstProduct(page);
    await page.click('#btnTrayToggle');
    await expect(page.locator('#trayLines .tray-line__unit')).toContainText('دانەی');
  });

  test('dark mode is a viewer preference and survives reload', async ({ page }) => {
    await openStore(page);
    await page.click('#themeModeToggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const cached = await page.evaluate(() => JSON.parse(localStorage.getItem('sc_config_v2') || 'null'));
    expect(cached === null || cached.theme?.mode !== 'dark').toBe(true);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('footer opening hours and phone are readable', async ({ page }) => {
    await seedCache(page, { config: { contact: { phone: '+964 750 111 2233', whatsapp: WA } } });
    await openStore(page);
    for (const sel of ['#footerHours', '#footerPhone']) {
      const el = page.locator(sel);
      await expect(el).toBeVisible();
      const colors = await el.evaluate(n => {
        let bg = 'rgba(0, 0, 0, 0)', a = n;
        while (a && /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) { bg = getComputedStyle(a).backgroundColor; a = a.parentElement; }
        return { fg: getComputedStyle(n).color, bg };
      });
      const { contrast } = await import('./helpers.js');
      expect(contrast(colors.fg, colors.bg)).toBeGreaterThan(4.5);
    }
    await expect(page.locator('#footerPhone')).toHaveAttribute('href', 'tel:+9647501112233');
  });
});

test.describe('SEO', () => {
  test('structured data is valid and never carries placeholder contact details', async ({ page }) => {
    await openStore(page);
    const ld = async () => JSON.parse(await page.locator('#ldJson').textContent());
    let data = await ld();
    expect(data['@type']).toBe('Bakery');
    expect(data.telephone).toBeUndefined();
    expect(data.sameAs).toBeUndefined();
    expect(await page.locator('meta[property="og:url"]').count()).toBe(0);

    await page.evaluate((wa) => { app.config.contact.whatsapp = wa; app.renderBranding(); }, WA);
    data = await ld();
    expect(data.telephone).toBe(`+${WA}`);
  });
});
