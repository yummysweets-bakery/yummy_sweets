// Roles and staff permissions shared by the app (session.js) and the admin script
// (scripts/set-staff-claims.mjs). Must match firestore.rules.

export const PRIVILEGED_ROLES = ['dev', 'admin', 'staff'];
export const OWNER_EMAILS = ['qaessafty@gmail.com', 'yumy.swets@gmail.com'];
export const STAFF_PERMS = ['brand', 'theme', 'about', 'faq', 'reviews', 'contact', 'socials', 'products', 'customers', 'economy', 'fonts'];

// Roles that can be granted through the staff directory. 'dev' belongs to the owner accounts only.
export const ASSIGNABLE_ROLES = ['admin', 'staff'];

// Custom claims for a staff directory entry, or null if the entry is not valid.
export function claimsForEntry(entry) {
  if (!entry || !ASSIGNABLE_ROLES.includes(entry.role)) return null;
  const perms = entry.role === 'staff' && Array.isArray(entry.perms)
    ? [...new Set(entry.perms.filter(p => STAFF_PERMS.includes(p)))]
    : [];
  return { role: entry.role, perms };
}
