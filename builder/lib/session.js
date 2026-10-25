// Authentication and session state.
//
// The ONLY source of identity is Firebase Auth. Privileged roles come from custom claims
// on the ID token (set by scripts/set-staff-claims.mjs) plus the two bootstrap owner
// accounts, mirroring firestore.rules. Nothing in localStorage can grant access.

import { getFirebaseApp, USE_EMULATORS, EMULATOR_HOSTS } from './firebase.js';
import { PRIVILEGED_ROLES, OWNER_EMAILS, STAFF_PERMS } from './roles.js';

export { PRIVILEGED_ROLES, OWNER_EMAILS, STAFF_PERMS };

// Staff sign-ins older than this must sign in again before using the control panel.
export const STAFF_MAX_SESSION_HOURS = 24 * 7;

// Set after a successful sign-in so returning users get Auth loaded at startup.
const AUTH_HINT_KEY = 'ys_auth_hint_v1';

let authApi = null;
let authInstance = null;

async function loadAuth() {
  if (authInstance) return { api: authApi, auth: authInstance };
  authApi = await import('firebase/auth');
  authInstance = authApi.getAuth(getFirebaseApp());
  if (USE_EMULATORS) {
    authApi.connectAuthEmulator(authInstance, EMULATOR_HOSTS.auth, { disableWarnings: true });
  }
  return { api: authApi, auth: authInstance };
}

function hasAuthHint(storage) {
  try { return storage.getItem(AUTH_HINT_KEY) === '1'; } catch { return false; }
}

function setAuthHint(storage, on) {
  try {
    if (on) storage.setItem(AUTH_HINT_KEY, '1');
    else storage.removeItem(AUTH_HINT_KEY);
  } catch { /* storage unavailable */ }
}

// Pure: derive the app session from a Firebase user and its token claims.
export function sessionFromToken(user, claims = {}, now = Date.now()) {
  if (!user) return null;
  const email = typeof user.email === 'string' ? user.email.toLowerCase() : '';
  const emailVerified = Boolean(user.emailVerified || claims.email_verified);
  const isOwner = Boolean(email && emailVerified && OWNER_EMAILS.includes(email));

  let role = 'customer';
  if (PRIVILEGED_ROLES.includes(claims.role)) role = claims.role;
  if (isOwner && role !== 'dev') role = 'dev';

  const perms = role === 'staff' && Array.isArray(claims.perms)
    ? claims.perms.filter(p => STAFF_PERMS.includes(p))
    : [];

  const authTime = Number(claims.auth_time) * 1000 || now;
  const expired = role !== 'customer' && now - authTime > STAFF_MAX_SESSION_HOURS * 3600 * 1000;

  return {
    uid: user.uid,
    name: user.displayName || (email ? email.split('@')[0] : '') || '',
    email,
    phone: user.phoneNumber || '',
    provider: user.isAnonymous ? 'anonymous' : (user.providerData?.[0]?.providerId || 'password'),
    role,
    perms,
    isOwner,
    expired,
  };
}

export function isPrivileged(session) {
  return Boolean(session && PRIVILEGED_ROLES.includes(session.role) && !session.expired);
}

export function canAccessTab(session, tabId) {
  if (!isPrivileged(session)) return false;
  if (session.role === 'dev') return true;
  if (session.role === 'admin') return tabId !== 'data';
  return session.perms.includes(tabId);
}

// Starts listening to auth state. onChange(session | null) fires once Auth is known.
// If the visitor has never signed in on this device, Auth is not loaded until they try.
export async function watchSession(onChange, { storage = localStorage, force = false } = {}) {
  if (!force && !hasAuthHint(storage)) {
    onChange(null);
    return () => {};
  }
  const { api, auth } = await loadAuth();
  return api.onIdTokenChanged(auth, async (user) => {
    if (!user) {
      setAuthHint(storage, false);
      onChange(null);
      return;
    }
    try {
      const token = await user.getIdTokenResult();
      setAuthHint(storage, true);
      onChange(sessionFromToken(user, token.claims));
    } catch (e) {
      console.error('Could not read sign-in token:', e && e.code);
      onChange(null);
    }
  });
}

export async function signInWithGoogle(storage = localStorage) {
  const { api, auth } = await loadAuth();
  const result = await api.signInWithPopup(auth, new api.GoogleAuthProvider());
  setAuthHint(storage, true);
  return result.user;
}

export async function signInWithEmail(email, password, storage = localStorage) {
  const { api, auth } = await loadAuth();
  const result = await api.signInWithEmailAndPassword(auth, email, password);
  setAuthHint(storage, true);
  return result.user;
}

export async function signOutUser(storage = localStorage) {
  setAuthHint(storage, false);
  if (!authInstance) return;
  await authApi.signOut(authInstance);
}

// Force a token refresh so newly assigned claims take effect without signing out.
export async function refreshClaims() {
  if (!authInstance || !authInstance.currentUser) return null;
  const token = await authInstance.currentUser.getIdTokenResult(true);
  return sessionFromToken(authInstance.currentUser, token.claims);
}

export function currentUid() {
  return authInstance && authInstance.currentUser ? authInstance.currentUser.uid : null;
}

// Human-readable sign-in errors (codes from Firebase Auth).
export function describeAuthError(err) {
  const code = (err && err.code) || '';
  const map = {
    'auth/popup-closed-by-user': 'popupClosed',
    'auth/cancelled-popup-request': 'popupClosed',
    'auth/popup-blocked': 'popupBlocked',
    'auth/invalid-credential': 'badCredentials',
    'auth/wrong-password': 'badCredentials',
    'auth/user-not-found': 'badCredentials',
    'auth/invalid-email': 'badEmail',
    'auth/too-many-requests': 'tooMany',
    'auth/network-request-failed': 'offline',
    'auth/operation-not-allowed': 'providerDisabled',
    'auth/unauthorized-domain': 'unauthorizedDomain',
  };
  return map[code] || 'generic';
}
