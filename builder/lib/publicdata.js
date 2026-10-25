// Public storefront reads with Firestore Lite (no realtime listeners, much smaller SDK).
// Staff sessions additionally get realtime updates through datastore.js.

import { collection, doc, getDoc, getDocs, getFirestore, connectFirestoreEmulator, limit, query, where } from 'firebase/firestore/lite';
import { getFirebaseApp, databaseId, USE_EMULATORS, EMULATOR_HOSTS } from './firebase.js';

let db = null;
function lite() {
  if (db) return db;
  const app = getFirebaseApp();
  if (!app) throw Object.assign(new Error('Firestore unavailable'), { code: 'unavailable' });
  const id = databaseId();
  db = id ? getFirestore(app, id) : getFirestore(app);
  if (USE_EMULATORS) connectFirestoreEmulator(db, ...EMULATOR_HOSTS.firestore);
  return db;
}

// config/public, falling back to the previous app's config/main until the first save migrates it.
export async function fetchPublicConfig() {
  const pub = await getDoc(doc(lite(), 'config', 'public'));
  if (pub.exists()) return { data: pub.data(), source: 'public' };
  const legacy = await getDoc(doc(lite(), 'config', 'main'));
  return legacy.exists() ? { data: legacy.data(), source: 'legacy' } : { data: null, source: 'none' };
}

export async function fetchProducts() {
  const snap = await getDocs(collection(lite(), 'products'));
  return { list: snap.docs.map(d => d.data()), empty: snap.empty };
}

export async function fetchApprovedReviews(max = 30) {
  const snap = await getDocs(query(collection(lite(), 'reviews'), where('status', '==', 'approved'), limit(max)));
  const toMillis = v => (v && typeof v.toMillis === 'function' ? v.toMillis() : null);
  return snap.docs
    .map(d => ({ ...d.data(), id: d.id, createdAt: toMillis(d.data().createdAt) }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}
