// Production build:
//   1. assemble index.html from builder/
//   2. vite build -> docs/ (GitHub Pages workflow and Firebase Hosting both publish docs/)
//   3. write robots.txt (and sitemap.xml when SITE_URL is set)
//   4. scan the output for credential-like material
//   5. mirror docs/ to the repository root for branch-root hosting, removing stale hashed bundles
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'vite';
import { scan } from './check-secrets.mjs';

execFileSync(process.execPath, ['builder/assemble.js'], { stdio: 'inherit' });
await build({ logLevel: 'warn' });

// robots.txt always; sitemap.xml only once the canonical host is known (SITE_URL).
const siteUrl = (process.env.SITE_URL || '').trim();
let robots = 'User-agent: *\nAllow: /\n';
if (siteUrl) {
  const loc = siteUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  fs.writeFileSync('docs/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${loc}</loc></url>\n</urlset>\n`);
  robots += `Sitemap: ${new URL('sitemap.xml', siteUrl).href}\n`;
} else {
  fs.rmSync('sitemap.xml', { force: true });
}
fs.writeFileSync('docs/robots.txt', robots);

const findings = scan();
if (findings.length) {
  console.error('Secret check failed:\n  ' + findings.join('\n  '));
  process.exit(1);
}

const outAssets = fs.readdirSync('docs/assets');
fs.mkdirSync('assets', { recursive: true });
for (const name of fs.readdirSync('assets')) {
  if (!outAssets.includes(name)) fs.rmSync(path.join('assets', name), { force: true });
}
fs.cpSync('docs', '.', { recursive: true });
console.log(`Built docs/ (${outAssets.length} assets) and mirrored it to the repository root.`);
