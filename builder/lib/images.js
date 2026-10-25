// Responsive image helpers for Unsplash-hosted photos (the default menu and hero images).

export function isUnsplash(url) {
  return /^https:\/\/images\.unsplash\.com\//.test(String(url || ''));
}

export function unsplashAt(url, width) {
  const u = new URL(url);
  u.searchParams.set('w', String(width));
  u.searchParams.set('auto', 'format');
  u.searchParams.set('fit', 'crop');
  if (!u.searchParams.has('q')) u.searchParams.set('q', '75');
  return u.toString();
}

// srcset for Unsplash URLs; other images (uploads, custom URLs) get none.
export function srcsetFor(url, widths = [400, 600, 800, 1200]) {
  if (!isUnsplash(url)) return '';
  return widths.map(w => `${unsplashAt(url, w)} ${w}w`).join(', ');
}
