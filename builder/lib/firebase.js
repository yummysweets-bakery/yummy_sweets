// Firebase bootstrap.
//
// Loading strategy (keeps the first download small for visitors):
//   - firebase/app + Firestore Lite load with the page (one-time public reads, publicdata.js)
//   - the full Firestore SDK (realtime listeners, writes) loads when someone signs in (datastore.js)
//   - Firebase Auth loads when someone opens a sign-in dialog or has signed in before (session.js)
//
// Emulator mode: build/serve with VITE_FIREBASE_EMULATORS=true to point everything at the local
// Firebase Emulator Suite under a `demo-` project id, which can never reach a real project.

import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-applet-config.json';

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};
export const USE_EMULATORS = env.VITE_FIREBASE_EMULATORS === 'true';
export const EMULATOR_PROJECT_ID = 'demo-yummy-sweets';
export const EMULATOR_HOSTS = { firestore: ['127.0.0.1', 8080], auth: 'http://127.0.0.1:9099' };

let app = null;
let initError = null;

try {
  const config = USE_EMULATORS
    ? { ...firebaseConfig, projectId: EMULATOR_PROJECT_ID, authDomain: `${EMULATOR_PROJECT_ID}.firebaseapp.com` }
    : firebaseConfig;
  app = initializeApp(config);
} catch (e) {
  initError = e;
  console.error('Firebase could not be initialised:', e && e.message);
}

export function getFirebaseApp() {
  return app;
}

// Named database in production; the emulator uses the default database.
export function databaseId() {
  return USE_EMULATORS ? undefined : firebaseConfig.firestoreDatabaseId;
}

export function firebaseReady() {
  return Boolean(app) && !initError;
}
