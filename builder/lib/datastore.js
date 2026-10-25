// All Firestore access goes through this module.
// - Targeted writes only (one document per change; no whole-collection rewrites).
// - Every write returns a promise that resolves only after the server accepted it,
//   so the UI never reports "Saved" for a write that failed.
// - Listener errors are reported through callbacks, never thrown.

// Loaded on demand (dynamic import) for signed-in users and staff — see firebase.js.

import {
  addDoc, collection, connectFirestoreEmulator, deleteDoc, doc, getDoc, getFirestore, limit, onSnapshot,
  orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where,
} from 'firebase/firestore';
import { getFirebaseApp, databaseId, USE_EMULATORS, EMULATOR_HOSTS } from './firebase.js';
export { describeDataError } from './errors.js';

let fullDb = null;
const db = () => {
  if (fullDb) return fullDb;
  const app = getFirebaseApp();
  if (!app) throw Object.assign(new Error('Firestore unavailable'), { code: 'unavailable' });
  const id = databaseId();
  fullDb = id ? getFirestore(app, id) : getFirestore(app);
  if (USE_EMULATORS) connectFirestoreEmulator(fullDb, ...EMULATOR_HOSTS.firestore);
  return fullDb;
};

function watch(ref, onData, onError) {
  try {
    return onSnapshot(ref, onData, (err) => {
      console.warn('Firestore listener stopped:', err && err.code);
      if (onError) onError(err);
    });
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

// ---------------------------------------------------------------- config
// config/public is the live storefront config. config/main is the previous app's
// document and is read only as a fallback until the first save migrates it.
export function watchPublicConfig(onData, onError) {
  let legacyUnsub = null;
  const unsub = watch(doc(db(), 'config', 'public'), (snap) => {
    if (snap.exists()) {
      if (legacyUnsub) { legacyUnsub(); legacyUnsub = null; }
      onData(snap.data(), 'public');
    } else if (!legacyUnsub) {
      legacyUnsub = watch(doc(db(), 'config', 'main'), (legacy) => {
        onData(legacy.exists() ? legacy.data() : null, legacy.exists() ? 'legacy' : 'none');
      }, onError);
    }
  }, onError);
  return () => { unsub(); if (legacyUnsub) legacyUnsub(); };
}

// Writes only the given top-level keys (merge), matching the per-section permissions in the rules.
export function savePublicConfig(partial, uid) {
  return setDoc(doc(db(), 'config', 'public'), { ...partial, updatedAt: serverTimestamp(), updatedBy: uid || null }, { merge: true });
}

// ---------------------------------------------------------------- products
export function watchProducts(onData, onError) {
  return watch(collection(db(), 'products'), (snap) => {
    onData(snap.docs.map(d => d.data()), snap.empty);
  }, onError);
}

const PRODUCT_KEYS = ['id', 'category', 'emoji', 'img', 'priceUSD', 'tag', 'name', 'desc', 'unit', 'exclusions', 'sortOrder'];

export function saveProduct(product, uid) {
  const clean = {};
  for (const k of PRODUCT_KEYS) if (product[k] !== undefined) clean[k] = product[k];
  return setDoc(doc(db(), 'products', product.id), { ...clean, updatedAt: serverTimestamp(), updatedBy: uid || null });
}

export function deleteProduct(id) {
  return deleteDoc(doc(db(), 'products', id));
}

// ---------------------------------------------------------------- customer profiles
export function getProfile(uid) {
  return getDoc(doc(db(), 'users', uid)).then(s => (s.exists() ? s.data() : null));
}

export function saveProfile(uid, { name, phone, address, email }) {
  const data = { updatedAt: serverTimestamp() };
  if (name !== undefined) data.name = String(name).slice(0, 80);
  if (phone !== undefined) data.phone = String(phone).slice(0, 32);
  if (address !== undefined) data.address = String(address).slice(0, 300);
  if (email) data.email = String(email).slice(0, 254);
  return setDoc(doc(db(), 'users', uid), data, { merge: true });
}

export function watchCustomers(onData, onError, max = 300) {
  return watch(query(collection(db(), 'users'), limit(max)), (snap) => {
    onData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }, onError);
}

// ---------------------------------------------------------------- orders
export function createOrder(record) {
  return addDoc(collection(db(), 'orders'), {
    ...record,
    fulfillmentAt: Timestamp.fromDate(record.fulfillmentAt),
    createdAt: serverTimestamp(),
  });
}

const toMillis = v => (v && typeof v.toMillis === 'function' ? v.toMillis() : (typeof v === 'number' ? v : null));

function orderFromDoc(d) {
  const data = d.data();
  return { ...data, id: d.id, createdAt: toMillis(data.createdAt) || Date.now(), fulfillmentAt: toMillis(data.fulfillmentAt) };
}

export function watchMyOrders(uid, onData, onError) {
  return watch(query(collection(db(), 'orders'), where('customerId', '==', uid), limit(100)), (snap) => {
    onData(snap.docs.map(orderFromDoc).sort((a, b) => b.createdAt - a.createdAt));
  }, onError);
}

export function watchRecentOrders(onData, onError, max = 200) {
  return watch(query(collection(db(), 'orders'), orderBy('createdAt', 'desc'), limit(max)), (snap) => {
    onData(snap.docs.map(orderFromDoc));
  }, onError);
}

export function updateOrderStatus(orderId, status, uid) {
  return updateDoc(doc(db(), 'orders', orderId), { status, updatedAt: serverTimestamp(), updatedBy: uid || null });
}

// ---------------------------------------------------------------- reviews
export function submitReview({ uid, name, text, rating, lang }) {
  const data = {
    authorUid: uid,
    name: String(name).trim().slice(0, 60),
    text: String(text).trim().slice(0, 1000),
    lang: lang === 'ku' ? 'ku' : 'en',
    status: 'pending',
    createdAt: serverTimestamp(),
  };
  if (Number.isInteger(rating) && rating >= 1 && rating <= 5) data.rating = rating;
  return addDoc(collection(db(), 'reviews'), data);
}

function reviewFromDoc(d) {
  const data = d.data();
  return { ...data, id: d.id, createdAt: toMillis(data.createdAt) };
}

export function watchApprovedReviews(onData, onError, max = 30) {
  return watch(query(collection(db(), 'reviews'), where('status', '==', 'approved'), limit(max)), (snap) => {
    onData(snap.docs.map(reviewFromDoc).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
  }, onError);
}

export function watchAllReviews(onData, onError, max = 200) {
  return watch(query(collection(db(), 'reviews'), orderBy('createdAt', 'desc'), limit(max)), (snap) => {
    onData(snap.docs.map(reviewFromDoc));
  }, onError);
}

export function moderateReview(id, status, uid) {
  return updateDoc(doc(db(), 'reviews', id), { status, moderatedAt: serverTimestamp(), moderatedBy: uid || null });
}

export function deleteReview(id) {
  return deleteDoc(doc(db(), 'reviews', id));
}

// ---------------------------------------------------------------- staff-only data
export function watchCustomerNote(customerId, onData, onError) {
  return watch(doc(db(), 'customerNotes', customerId), s => onData(s.exists() ? (s.data().text || '') : ''), onError);
}

export function saveCustomerNote(customerId, text, uid) {
  return setDoc(doc(db(), 'customerNotes', customerId), { text: String(text).slice(0, 2000), updatedAt: serverTimestamp(), updatedBy: uid || null });
}

export function watchStaffDirectory(onData, onError) {
  return watch(collection(db(), 'staffDirectory'), snap => onData(snap.docs.map(d => ({ uid: d.id, ...d.data() }))), onError);
}

export function saveStaffEntry(uid, { email, name, role, perms }, byUid) {
  return setDoc(doc(db(), 'staffDirectory', uid), {
    email: String(email || '').toLowerCase().slice(0, 254),
    name: String(name || '').slice(0, 80),
    role: role === 'admin' ? 'admin' : 'staff',
    perms: Array.isArray(perms) ? perms : [],
    updatedAt: serverTimestamp(),
    updatedBy: byUid || null,
  });
}

export function deleteStaffEntry(uid) {
  return deleteDoc(doc(db(), 'staffDirectory', uid));
}
