// Minimal REST helpers for the Firebase emulators (owner access, emulator only).
const PROJECT = 'demo-yummy-sweets';
const AUTH = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099'}`;
const FS = `http://${process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080'}`;
const OWNER = { Authorization: 'Bearer owner', 'Content-Type': 'application/json' };
const DOCS = `${FS}/v1/projects/${PROJECT}/databases/(default)/documents`;

async function call(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { ...OWNER, ...(opts.headers || {}) } });
  const text = await res.text();
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${url} -> ${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

export async function createUser({ email, password, displayName, claims }) {
  let uid;
  try {
    const created = await call(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts`, {
      method: 'POST', body: JSON.stringify({ email, password, displayName }),
    });
    uid = created.localId;
  } catch (e) {
    if (!String(e.message).includes('EMAIL_EXISTS')) throw e;
    const signedIn = await call(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=emulator`, {
      method: 'POST', body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    uid = signedIn.localId;
  }
  await call(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:update`, {
    method: 'POST',
    body: JSON.stringify({ localId: uid, emailVerified: true, customAttributes: JSON.stringify(claims || {}) }),
  });
  return uid;
}

// --- Firestore value encoding
function encode(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(encode) } };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, encode(x)])) } };
  return { stringValue: String(v) };
}
function decode(v) {
  if ('nullValue' in v) return null;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return new Date(v.timestampValue);
  if ('stringValue' in v) return v.stringValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decode);
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decode(x)]));
  return undefined;
}
const fields = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, encode(v)]));
const unfields = doc => Object.fromEntries(Object.entries(doc.fields || {}).map(([k, v]) => [k, decode(v)]));

export async function clearFirestore() {
  await fetch(`${FS}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: 'DELETE' });
}

export async function setDoc(path, data) {
  await call(`${DOCS}/${path}`, { method: 'PATCH', body: JSON.stringify({ fields: fields(data) }) });
}

export async function getDoc(path) {
  try {
    return unfields(await call(`${DOCS}/${path}`));
  } catch (e) {
    if (String(e.message).includes('404')) return null;
    throw e;
  }
}

export async function listDocs(collection) {
  const res = await call(`${DOCS}/${collection}?pageSize=300`);
  return (res.documents || []).map(d => ({ id: d.name.split('/').pop(), ...unfields(d) }));
}
