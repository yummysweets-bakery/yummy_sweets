// Normalised Firestore error kinds for user-facing messages.
export function describeDataError(err) {
  const code = String((err && err.code) || '').replace(/^firestore\//, '');
  if (code === 'permission-denied' || code === 'unauthenticated') return 'denied';
  if (code === 'unavailable' || code === 'deadline-exceeded' || (typeof navigator !== 'undefined' && navigator.onLine === false)) return 'offline';
  if (code === 'invalid-argument' || code === 'failed-precondition') return 'invalid';
  if (code === 'not-found') return 'missing';
  return 'failed';
}
