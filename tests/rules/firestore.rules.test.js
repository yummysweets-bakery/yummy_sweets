// Firestore security rules tests — run inside the Firestore emulator only:
//   npm run test:rules
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp,
  setDoc, Timestamp, updateDoc, where,
} from 'firebase/firestore';

const PROJECT_ID = 'demo-yummy-sweets';
let env;

const tomorrow = () => Timestamp.fromMillis(Date.now() + 36 * 3600 * 1000);

const customer = (uid = 'cust1') => env.authenticatedContext(uid, { email: `${uid}@example.com`, email_verified: true }).firestore();
const staff = (perms, uid = 'staff1') => env.authenticatedContext(uid, { role: 'staff', perms }).firestore();
const admin = (uid = 'admin1') => env.authenticatedContext(uid, { role: 'admin' }).firestore();
const dev = (uid = 'dev1') => env.authenticatedContext(uid, { role: 'dev' }).firestore();
const anon = () => env.unauthenticatedContext().firestore();

function newOrder(uid, overrides = {}) {
  return {
    customerId: uid,
    customer: { name: 'Sara', phone: '+9647500000000', address: 'Erbil' },
    items: [{ productId: 'p1', qty: 2, unitPriceUSD: 38, exclude: [] }],
    totals: { subtotal: 76, discount: 0, delivery: 0, tax: 0, total: 76 },
    currency: 'USD',
    fulfillmentAt: tomorrow(),
    note: 'Happy birthday',
    status: 'pending',
    createdAt: serverTimestamp(),
    ...overrides,
  };
}

function newReview(uid, overrides = {}) {
  return {
    authorUid: uid,
    name: 'Sara',
    text: 'Lovely cake',
    rating: 5,
    lang: 'en',
    status: 'pending',
    createdAt: serverTimestamp(),
    ...overrides,
  };
}

const product = (id = 'p1', overrides = {}) => ({
  id, category: 'cakes', priceUSD: 38, name: { en: 'Pistachio Rose', ku: 'فستق' },
  desc: { en: 'd', ku: 'd' }, unit: { en: 'u', ku: 'u' }, emoji: '🎂', tag: 'bestseller', img: '', ...overrides,
});

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
});

afterAll(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'config/public'), { shopName: { en: 'Yummy Sweets' }, showWatermark: true, economy: { deliveryFee: 8 } });
    await setDoc(doc(db, 'config/private'), { secret: 'staff only' });
    await setDoc(doc(db, 'products/p1'), product());
    await setDoc(doc(db, 'users/cust1'), { name: 'Sara', phone: '+9647500000000' });
    await setDoc(doc(db, 'users/cust2'), { name: 'Lina', phone: '+9647500000001' });
    await setDoc(doc(db, 'orders/o1'), { ...newOrder('cust1'), createdAt: Timestamp.now() });
    await setDoc(doc(db, 'orders/o2'), { ...newOrder('cust2'), createdAt: Timestamp.now() });
    await setDoc(doc(db, 'reviews/approved1'), { ...newReview('cust2'), status: 'approved', createdAt: Timestamp.now() });
    await setDoc(doc(db, 'reviews/pending1'), { ...newReview('cust2'), status: 'pending', createdAt: Timestamp.now() });
  });
});

describe('anonymous visitors', () => {
  it('can read the public storefront data', async () => {
    await assertSucceeds(getDoc(doc(anon(), 'config/public')));
    await assertSucceeds(getDocs(collection(anon(), 'products')));
    await assertSucceeds(getDocs(query(collection(anon(), 'reviews'), where('status', '==', 'approved'))));
  });

  it('cannot modify products or configuration', async () => {
    await assertFails(setDoc(doc(anon(), 'products/p1'), product('p1', { priceUSD: 1 })));
    await assertFails(deleteDoc(doc(anon(), 'products/p1')));
    await assertFails(setDoc(doc(anon(), 'config/public'), { shopName: { en: 'Hacked' } }));
    await assertFails(setDoc(doc(anon(), 'config/main'), { shopName: { en: 'Hacked' } }));
  });

  it('cannot read private config, users or orders', async () => {
    await assertFails(getDoc(doc(anon(), 'config/private')));
    await assertFails(getDoc(doc(anon(), 'users/cust1')));
    await assertFails(getDocs(collection(anon(), 'orders')));
  });

  it('cannot create orders or reviews without signing in', async () => {
    await assertFails(addDoc(collection(anon(), 'orders'), newOrder('nobody')));
    await assertFails(addDoc(collection(anon(), 'reviews'), newReview('nobody')));
  });

  it('cannot read pending reviews', async () => {
    await assertFails(getDoc(doc(anon(), 'reviews/pending1')));
    await assertFails(getDocs(collection(anon(), 'reviews')));
  });

  it('cannot touch unknown collections', async () => {
    await assertFails(setDoc(doc(anon(), 'whatever/x'), { a: 1 }));
    await assertFails(getDoc(doc(anon(), 'whatever/x')));
  });
});

describe('customers: privilege escalation (audit S1)', () => {
  it('cannot add a role to their own profile on create', async () => {
    const db = customer('newbie');
    await assertFails(setDoc(doc(db, 'users/newbie'), { name: 'X', role: 'admin' }));
  });

  it('cannot promote themselves by updating their profile', async () => {
    const db = customer('cust1');
    await assertFails(updateDoc(doc(db, 'users/cust1'), { role: 'admin' }));
    await assertFails(updateDoc(doc(db, 'users/cust1'), { permissions: ['products'] }));
    await assertFails(updateDoc(doc(db, 'users/cust1'), { perms: ['products'] }));
  });

  it('gains nothing from a profile that claims a role', async () => {
    // Even if a role field were present in Firestore, rules only trust token claims.
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'users/sneaky'), { name: 'S', role: 'admin' });
    });
    const db = customer('sneaky');
    await assertFails(setDoc(doc(db, 'products/p1'), product('p1', { priceUSD: 1 })));
    await assertFails(setDoc(doc(db, 'config/public'), { shopName: { en: 'Hacked' } }));
    await assertFails(getDocs(collection(db, 'users')));
  });

  it('cannot write to the staff directory', async () => {
    await assertFails(setDoc(doc(customer('cust1'), 'staffDirectory/cust1'), { email: 'a@b.c', role: 'admin' }));
  });

  it('is not treated as an owner with an unverified matching email', async () => {
    const db = env.authenticatedContext('fake', { email: 'yumy.swets@gmail.com', email_verified: false }).firestore();
    await assertFails(setDoc(doc(db, 'products/p1'), product('p1', { priceUSD: 1 })));
  });

  it('can still edit a legacy profile that holds extra fields, but not those fields', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'users/legacy'), { name: 'Old', role: 'staff', id: 'legacy', createdAt: 1700000000000 });
    });
    const db = customer('legacy');
    await assertSucceeds(updateDoc(doc(db, 'users/legacy'), { phone: '+964750', updatedAt: serverTimestamp() }));
    await assertFails(updateDoc(doc(db, 'users/legacy'), { role: 'admin' }));
    await assertFails(updateDoc(doc(db, 'users/legacy'), { perms: ['products'] }));
    await assertFails(updateDoc(doc(db, 'users/legacy'), { name: 'x'.repeat(81) }));
    // Still grants nothing.
    await assertFails(setDoc(doc(db, 'products/p1'), product('p1', { priceUSD: 1 })));
  });

  it('can create and edit their own profile without privileged fields', async () => {
    const db = customer('newbie');
    await assertSucceeds(setDoc(doc(db, 'users/newbie'), { name: 'New', phone: '+964750' }));
    await assertSucceeds(updateDoc(doc(db, 'users/newbie'), { address: 'Erbil' }));
  });
});

describe('customers: privacy', () => {
  it('can read only their own profile', async () => {
    await assertSucceeds(getDoc(doc(customer('cust1'), 'users/cust1')));
    await assertFails(getDoc(doc(customer('cust1'), 'users/cust2')));
    await assertFails(getDocs(collection(customer('cust1'), 'users')));
  });

  it('cannot read private config or customer notes', async () => {
    await assertFails(getDoc(doc(customer('cust1'), 'config/private')));
    await assertFails(getDoc(doc(customer('cust1'), 'customerNotes/cust1')));
  });
});

describe('customers: orders', () => {
  it('can create a valid pending order for themselves', async () => {
    await assertSucceeds(addDoc(collection(customer('cust1'), 'orders'), newOrder('cust1')));
    await assertSucceeds(addDoc(collection(customer('cust1'), 'orders'), newOrder('cust1', { ref: 'YS-ABC123' })));
    await assertFails(addDoc(collection(customer('cust1'), 'orders'), newOrder('cust1', { ref: 'x'.repeat(40) })));
  });

  it('cannot create an order for someone else', async () => {
    await assertFails(addDoc(collection(customer('cust1'), 'orders'), newOrder('cust2')));
  });

  it('cannot create an order that is already confirmed', async () => {
    await assertFails(addDoc(collection(customer('cust1'), 'orders'), newOrder('cust1', { status: 'confirmed' })));
  });

  it('rejects inconsistent totals', async () => {
    await assertFails(addDoc(collection(customer('cust1'), 'orders'),
      newOrder('cust1', { totals: { subtotal: 76, discount: 0, delivery: 0, tax: 0, total: 1 } })));
    await assertFails(addDoc(collection(customer('cust1'), 'orders'),
      newOrder('cust1', { totals: { subtotal: 76, discount: 100, delivery: 0, tax: 0, total: -24 } })));
  });

  it('rejects a fulfillment date in the past, empty items and unknown fields', async () => {
    const db = customer('cust1');
    await assertFails(addDoc(collection(db, 'orders'), newOrder('cust1', { fulfillmentAt: Timestamp.fromMillis(Date.now() - 3600e3) })));
    await assertFails(addDoc(collection(db, 'orders'), newOrder('cust1', { items: [] })));
    await assertFails(addDoc(collection(db, 'orders'), newOrder('cust1', { staffNote: 'paid' })));
    await assertFails(addDoc(collection(db, 'orders'), newOrder('cust1', { createdAt: Timestamp.fromMillis(0) })));
  });

  it('can read and list only their own orders', async () => {
    const db = customer('cust1');
    await assertSucceeds(getDoc(doc(db, 'orders/o1')));
    await assertFails(getDoc(doc(db, 'orders/o2')));
    await assertSucceeds(getDocs(query(collection(db, 'orders'), where('customerId', '==', 'cust1'))));
    await assertFails(getDocs(collection(db, 'orders')));
  });

  it('cannot change status, totals or another customer\'s order', async () => {
    const db = customer('cust1');
    await assertFails(updateDoc(doc(db, 'orders/o1'), { status: 'completed' }));
    await assertFails(updateDoc(doc(db, 'orders/o1'), { 'totals.total': 0 }));
    await assertFails(updateDoc(doc(db, 'orders/o2'), { note: 'x' }));
    await assertFails(deleteDoc(doc(db, 'orders/o1')));
  });
});

describe('reviews', () => {
  it('a signed-in customer can submit a pending review', async () => {
    await assertSucceeds(addDoc(collection(customer('cust1'), 'reviews'), newReview('cust1')));
  });

  it('a customer cannot self-approve, impersonate or post oversized text', async () => {
    const db = customer('cust1');
    await assertFails(addDoc(collection(db, 'reviews'), newReview('cust1', { status: 'approved' })));
    await assertFails(addDoc(collection(db, 'reviews'), newReview('cust2')));
    await assertFails(addDoc(collection(db, 'reviews'), newReview('cust1', { text: 'x'.repeat(1001) })));
    await assertFails(addDoc(collection(db, 'reviews'), newReview('cust1', { rating: 9 })));
  });

  it('a customer cannot moderate or edit reviews', async () => {
    const db = customer('cust1');
    await assertFails(updateDoc(doc(db, 'reviews/pending1'), { status: 'approved' }));
    await assertFails(updateDoc(doc(db, 'reviews/approved1'), { text: 'changed' }));
    await assertFails(deleteDoc(doc(db, 'reviews/approved1')));
  });

  it('authors can see their own pending review', async () => {
    await assertSucceeds(getDoc(doc(customer('cust2'), 'reviews/pending1')));
    await assertFails(getDoc(doc(customer('cust1'), 'reviews/pending1')));
  });

  it('staff with the reviews permission can moderate, but only the status fields', async () => {
    const db = staff(['reviews']);
    await assertSucceeds(getDocs(collection(db, 'reviews')));
    await assertSucceeds(updateDoc(doc(db, 'reviews/pending1'), { status: 'approved', moderatedBy: 'staff1' }));
    await assertFails(updateDoc(doc(db, 'reviews/approved1'), { text: 'rewritten' }));
    await assertFails(updateDoc(doc(db, 'reviews/approved1'), { status: 'published' }));
  });

  it('staff without the reviews permission cannot moderate', async () => {
    await assertFails(updateDoc(doc(staff(['products']), 'reviews/pending1'), { status: 'approved' }));
  });
});

describe('staff permissions', () => {
  it('products staff can edit products but not config or orders', async () => {
    const db = staff(['products']);
    await assertSucceeds(setDoc(doc(db, 'products/p2'), product('p2')));
    await assertSucceeds(updateDoc(doc(db, 'products/p1'), { priceUSD: 40 }));
    await assertFails(setDoc(doc(db, 'config/public'), { shopName: { en: 'Changed' } }, { merge: true }));
    await assertFails(getDocs(collection(db, 'orders')));
  });

  it('rejects invalid products even from authorised staff', async () => {
    const db = staff(['products']);
    await assertFails(setDoc(doc(db, 'products/p3'), product('p3', { priceUSD: -5 })));
    await assertFails(setDoc(doc(db, 'products/p3'), product('p3', { name: { en: '' } })));
    await assertFails(setDoc(doc(db, 'products/p3'), product('wrong-id')));
    await assertFails(setDoc(doc(db, 'products/p3'), product('p3', { role: 'admin' })));
  });

  it('brand staff can change brand keys only', async () => {
    const db = staff(['brand']);
    await assertSucceeds(setDoc(doc(db, 'config/public'), { shopName: { en: 'New name' } }, { merge: true }));
    await assertFails(setDoc(doc(db, 'config/public'), { economy: { deliveryFee: 0 } }, { merge: true }));
    await assertFails(setDoc(doc(db, 'config/public'), { showWatermark: false }, { merge: true }));
  });

  it('economy staff can change pricing and update order status, but not totals', async () => {
    const db = staff(['economy']);
    await assertSucceeds(setDoc(doc(db, 'config/public'), { economy: { deliveryFee: 5 } }, { merge: true }));
    await assertSucceeds(updateDoc(doc(db, 'orders/o1'), { status: 'confirmed' }));
    await assertFails(updateDoc(doc(db, 'orders/o1'), { 'totals.total': 0 }));
    await assertFails(updateDoc(doc(db, 'orders/o1'), { status: 'refunded' }));
  });

  it('customers staff can read customer profiles and notes; others cannot', async () => {
    await assertSucceeds(getDocs(collection(staff(['customers']), 'users')));
    await assertSucceeds(setDoc(doc(staff(['customers']), 'customerNotes/cust1'), { text: 'VIP' }));
    await assertFails(getDocs(collection(staff(['products']), 'users')));
  });

  it('staff cannot manage the staff directory or private config', async () => {
    const db = staff(['products', 'customers', 'economy', 'brand']);
    await assertFails(setDoc(doc(db, 'staffDirectory/x'), { email: 'x@y.z', role: 'admin' }));
    await assertFails(getDoc(doc(db, 'config/private')));
  });

  it('a staff token with a malformed perms claim gets nothing', async () => {
    const db = env.authenticatedContext('weird', { role: 'staff', perms: 'products' }).firestore();
    await assertFails(setDoc(doc(db, 'products/p2'), product('p2')));
  });
});

describe('admins and developers', () => {
  it('admins can manage config, products, users, orders and the staff directory', async () => {
    const db = admin();
    await assertSucceeds(setDoc(doc(db, 'config/public'), { shopName: { en: 'Yummy' }, economy: { deliveryFee: 6 } }, { merge: true }));
    await assertSucceeds(setDoc(doc(db, 'products/p9'), product('p9')));
    await assertSucceeds(deleteDoc(doc(db, 'products/p9')));
    await assertSucceeds(getDocs(collection(db, 'users')));
    await assertSucceeds(getDocs(collection(db, 'orders')));
    await assertSucceeds(updateDoc(doc(db, 'orders/o2'), { status: 'completed', staffNote: 'Delivered' }));
    await assertSucceeds(setDoc(doc(db, 'staffDirectory/s1'), { email: 's@x.y', role: 'staff', perms: ['products'] }));
    await assertSucceeds(getDoc(doc(db, 'config/private')));
  });

  it('admins cannot toggle the developer watermark; developers can', async () => {
    await assertFails(setDoc(doc(admin(), 'config/public'), { showWatermark: false }, { merge: true }));
    await assertSucceeds(setDoc(doc(dev(), 'config/public'), { showWatermark: false }, { merge: true }));
  });

  it('admins cannot store unknown keys (such as passwords) in public config', async () => {
    await assertFails(setDoc(doc(admin(), 'config/public'), { users: [{ password: 'x' }] }, { merge: true }));
  });

  it('even admins cannot rewrite order totals or the legacy config', async () => {
    await assertFails(updateDoc(doc(admin(), 'orders/o1'), { 'totals.total': 0 }));
    await assertFails(setDoc(doc(admin(), 'config/main'), { shopName: { en: 'x' } }));
  });

  it('verified owner emails are bootstrapped as developers', async () => {
    const db = env.authenticatedContext('owner', { email: 'Yumy.Swets@gmail.com', email_verified: true }).firestore();
    await assertSucceeds(setDoc(doc(db, 'products/p5'), product('p5')));
    await assertSucceeds(setDoc(doc(db, 'config/public'), { showWatermark: false }, { merge: true }));
  });
});
