// Fails if source or build output contains credential-like material.
// Reports the file and rule only; matched text is never printed.
import fs from 'node:fs';
import path from 'node:path';

const SOURCE_DIRS = ['builder', 'scripts', 'firestore.rules', 'storage.rules', 'firebase.json'];
const BUILD_DIRS = ['docs'];

const RULES = [
  { id: 'private-key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { id: 'service-account', re: /"type"\s*:\s*"service_account"/ },
  { id: 'oauth-client-secret', re: /GOCSPX-[A-Za-z0-9_-]{10,}/ },
  { id: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{30,}/ },
  { id: 'api-secret-key', re: /\bsk-(ant-)?[A-Za-z0-9_-]{30,}/ },
  { id: 'hardcoded-password', re: /(\bpassword|['"]password['"])\s*[:=]\s*['"][^'"\s]{1,}['"]/i, sourceOnly: true },
  { id: 'legacy-local-accounts', re: /\bDEFAULT_USERS\b/ },
];

function walk(target, out = []) {
  if (!fs.existsSync(target)) return out;
  const stat = fs.statSync(target);
  if (stat.isFile()) { out.push(target); return out; }
  for (const name of fs.readdirSync(target)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    walk(path.join(target, name), out);
  }
  return out;
}

const TEXT = /\.(m?js|cjs|ts|html|css|json|rules|txt|xml|webmanifest)$/;
const self = path.normalize('scripts/check-secrets.mjs');

export function scan({ build = true } = {}) {
  const findings = [];
  const check = (files, sourceScan) => {
    for (const file of files) {
      if (!TEXT.test(file) && !file.endsWith('.rules')) continue;
      if (path.normalize(file) === self) continue;
      const text = fs.readFileSync(file, 'utf8');
      for (const rule of RULES) {
        if (rule.sourceOnly && !sourceScan) continue;
        if (rule.re.test(text)) findings.push(`${file}: ${rule.id}`);
      }
    }
  };
  check(SOURCE_DIRS.flatMap(d => walk(d)), true);
  if (build) check(BUILD_DIRS.flatMap(d => walk(d)), false);
  return findings;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const findings = scan({ build: !process.argv.includes('--source-only') });
  if (findings.length) {
    console.error('Secret check failed:\n  ' + findings.join('\n  '));
    process.exit(1);
  }
  console.log('Secret check passed.');
}
