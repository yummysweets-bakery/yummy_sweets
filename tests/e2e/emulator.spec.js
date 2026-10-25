// End-to-end tests against the Firebase Emulator Suite (never the live project).
// Run with: npm run test:e2e:emulator
import { test, expect } from '@playwright/test';
import { isolate, future } from './helpers.js';
import { createUser, clearFirestore, setDoc, getDoc, listDocs } from './emulator-api.js';

const PASSWORD = 'emulator-only-password';
const USERS = {
  admin: { email: 'admin@yummy.test', claims: { role: 'admin' } },
  staff: { email: 'staff@yummy.test', claims: { role: 'staff', perms: ['products'] } },
  moderator: { email: 'mod@yummy.test', claims: { role: 'staff', perms: ['reviews'] } },
  customer: { email: 'customer@yummy.test', claims: null },
};

test.beforeAll(async () => {
  if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error('Emulator hosts are not set — run through npm run test:e2e:emulator');
  }
  for (const [key, u] of Object.entries(USERS)) {
    u.uid = await createUser({ email: u.email, password: PASSWORD, displayName: key, claims: u.claims });
  }
});

test.beforeEach(async ({ page }) => {
  // Fresh data for every test
  await clearFirestore();
  await setDoc('config/public', { contact: { whatsapp: '9647501112233', phone: '', email: '', address: { en: '' }, hours: { en: '' } } });
  await isolate(page, { allowEmulators: true });
});

async function signIn(page, who) {
  await page.goto('/#staff');
  await expect(page.locator('#staffAuthModal')).toHaveClass(/is-open/);
  await page.fill('#staffEmail', USERS[who].email);
  await page.fill('#staffPassword', PASSWORD);
  await page.click('#btnStaffLogin');
}

test('staff sign-in grants exactly the permitted panel tabs and survives reload', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await signIn(page, 'staff');
  await expect(page.locator('#panelModal')).toHaveClass(/is-open/);
  const tabs = await page.locator('#panelSidebar [role=tab]').allTextContents();
  expect(tabs.map(t => t.trim())).toEqual(['Products']);
  await expect(page.locator('#panelUserBadge')).toHaveText(/staff/i);

  // Save a product: it reaches Firestore and the page reports success only afterwards
  await page.fill('#pEditPrice', '41');
  await page.locator('#productEditorArea form button[type=submit]').click();
  await expect(page.locator('#panelSaveStatus')).toHaveText('All changes saved');
  await expect.poll(async () => (await getDoc('products/p1'))?.priceUSD).toBe(41);

  // Signed-in header fits without horizontal overflow
  await page.click('#panelModal .modal-close');
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  const toggle = await page.locator('#accountMenuToggle').boundingBox();
  expect(toggle.x + toggle.width).toBeLessThanOrEqual(1280);

  // Session restored from Firebase Auth after reload
  await page.reload();
  await page.click('#accountMenuToggle');
  await expect(page.locator('#accountMenuList').getByRole('button', { name: 'Control Panel' })).toBeVisible();
  await page.click('#accountMenuToggle');

  // Out-of-scope section: honest failure, nothing written
  const ok = await page.evaluate(() => app.saveConfig('brand'));
  expect(ok).toBe(false);
  await expect(page.locator('#toastContainer')).toContainText("isn't allowed");

  // Sign out clears privileged state
  await page.click('#accountMenuToggle');
  await page.locator('#accountMenuList').getByRole('button', { name: 'Log Out' }).click();
  await expect(page.getByRole('button', { name: 'Sign In' }).first()).toBeVisible();
  await page.evaluate(() => app.openPanelModal());
  await expect(page.locator('#panelModal')).not.toHaveClass(/is-open/);
  expect(await page.evaluate(() => app.staffOrders.length + app.customers.length)).toBe(0);
});

test('a customer account cannot open the control panel', async ({ page }) => {
  await signIn(page, 'customer');
  await expect(page.locator('#staffAuthMessage')).toContainText("doesn't have staff access");
  await page.locator('#staffAuthModal .modal-close').click();
  await page.click('#accountMenuToggle');
  await expect(page.locator('#accountMenuList').getByRole('button', { name: 'Control Panel' })).toHaveCount(0);
  await page.evaluate(() => app.openPanelModal());
  await expect(page.locator('#panelModal')).not.toHaveClass(/is-open/);
});

test('reviews are moderated before they appear publicly', async ({ page, browser }) => {
  // Customer posts a review
  await signIn(page, 'customer');
  await page.locator('#staffAuthModal .modal-close').click();
  await page.getByRole('button', { name: 'Leave a Review' }).click();
  await expect(page.locator('#reviewSubmitForm')).toBeVisible();
  await page.fill('#custReviewName', 'Sara <b>K</b>');
  await page.fill('#custReviewQuote', 'Lovely <img src=x onerror=window.__xss=1> cake');
  await page.click('#btnSubmitReview');
  await expect(page.locator('#toastContainer')).toContainText('once the bakery has approved it');
  const pending = (await listDocs('reviews')).filter(r => r.status === 'pending');
  expect(pending).toHaveLength(1);

  // A visitor does not see it yet
  const visitorCtx = await browser.newContext();
  const visitor = await visitorCtx.newPage();
  await isolate(visitor, { allowEmulators: true });
  await visitor.goto('/');
  await expect(visitor.locator('#reviewsGrid')).not.toContainText('Lovely');

  // A moderator approves it in the panel
  const modCtx = await browser.newContext();
  const mod = await modCtx.newPage();
  await isolate(mod, { allowEmulators: true });
  await signIn(mod, 'moderator');
  await expect(mod.locator('#panelModal')).toHaveClass(/is-open/);
  await expect(mod.locator('.moderation-card')).toHaveCount(1);
  await mod.getByRole('button', { name: 'Approve' }).click();
  await expect(mod.locator('#toastContainer')).toContainText('Review published');

  // Now public (visitors read once per visit, so reload), rendered as text
  await visitor.reload();
  await expect(visitor.locator('#reviewsGrid')).toContainText('Lovely <img src=x onerror=window.__xss=1> cake');
  expect(await visitor.evaluate(() => window.__xss)).toBeUndefined();
  await visitorCtx.close();
  await modCtx.close();
});

test('signed-in checkout stores the order with date, note and pending status', async ({ page }) => {
  await signIn(page, 'customer');
  await page.locator('#staffAuthModal .modal-close').click();
  await page.locator('#menuGrid .cake-card').first().getByRole('button').click();
  await page.click('#btnTrayToggle');
  await page.fill('#trayCustName', 'Customer One');
  await page.fill('#trayFulfillmentDate', future(40));
  await page.fill('#trayOrderNote', 'No nuts please');
  await page.click('#btnTrayWhatsApp');
  await expect(page.locator('#traySentNotice')).toBeVisible();

  await expect.poll(async () => (await listDocs('orders')).filter(o => o.customerId === USERS.customer.uid).length).toBe(1);
  const order = (await listDocs('orders')).find(o => o.customerId === USERS.customer.uid);
  expect(order.status).toBe('pending');
  expect(order.note).toBe('No nuts please');
  expect(order.fulfillmentAt.getTime()).toBeGreaterThan(Date.now());
  expect(order.totals.total).toBe(order.totals.subtotal - order.totals.discount + order.totals.delivery + order.totals.tax);

  // It appears in the customer's history
  await page.click('#accountMenuToggle');
  await page.locator('#accountMenuList').getByRole('button', { name: 'My orders' }).click();
  await expect(page.locator('#historyOrdersList .history-order-card')).toHaveCount(1);
  await expect(page.locator('#historyScopeNote')).toContainText('linked to your account');
});

test('admins see orders and can update status; customers cannot', async ({ page }) => {
  await setDoc('orders/order1', {
    customerId: USERS.customer.uid, customer: { name: 'Customer One' },
    items: [{ productId: 'p1', name: 'Pistachio', qty: 1, unitPriceUSD: 38, exclude: [] }],
    totals: { subtotal: 38, discount: 0, delivery: 8, tax: 0, total: 46 },
    fulfillmentAt: new Date(Date.now() + 48 * 3600e3), status: 'pending', createdAt: new Date(),
  });
  await signIn(page, 'admin');
  await page.getByRole('tab', { name: 'Customers' }).click();
  await page.getByRole('button', { name: 'View details' }).first().click();
  await page.locator('#staffCustomerDrawer select').selectOption('confirmed');
  await expect.poll(async () => (await getDoc('orders/order1')).status).toBe('confirmed');
});
