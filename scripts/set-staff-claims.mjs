#!/usr/bin/env node
// Sync Firebase Auth custom claims from the Firestore `staffDirectory` collection.
//
// The control panel (Users tab) edits staffDirectory; this script turns those entries into
// the `role` / `perms` claims that firestore.rules trust. Run it by hand after changing staff.
//
//   npm run staff:claims -- --project <firebase-project-id>            # dry run (default)
//   npm run staff:claims -- --project <firebase-project-id> --apply    # write claims
//
// Options:
//   --project <id>     required; the Firebase project to act on
//   --database <id>    Firestore database id (default: firestoreDatabaseId in firebase-applet-config.json)
//   --apply            actually set/remove claims (otherwise only prints the plan)
//   --revoke-removed   also revoke refresh tokens of users whose staff access is removed,
//                      so their access ends now instead of when their ID token expires (≤ 1 hour)
//
// Credentials: Application Default Credentials only (gcloud auth application-default login,
// or GOOGLE_APPLICATION_CREDENTIALS pointing at a key file kept OUTSIDE this repository).
// Against the emulators, set FIRESTORE_EMULATOR_HOST and FIREBASE_AUTH_EMULATOR_HOST.
//
// Owner accounts (builder/lib/roles.js OWNER_EMAILS) get developer access from the rules
// directly and are never changed by this script. The `dev` role cannot be granted here.

import fs from 'node:fs';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { claimsForEntry, OWNER_EMAILS, ASSIGNABLE_ROLES } from '../builder/lib/roles.js';

function parseArgs(argv) {
  const args = { apply: false, revokeRemoved: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') args.apply = true;
    else if (a === '--revoke-removed') args.revokeRemoved = true;
    else if (a === '--project') args.project = argv[++i];
    else if (a === '--database') args.database = argv[++i];
    else throw new Error(`Unknown option: ${a}`);
  }
  if (!args.project) throw new Error('--project <firebase-project-id> is required');
  return args;
}

const sameClaims = (a = {}, b) => a.role === b.role && JSON.stringify([...(a.perms || [])].sort()) === JSON.stringify([...b.perms].sort());

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const emulated = Boolean(process.env.FIRESTORE_EMULATOR_HOST && process.env.FIREBASE_AUTH_EMULATOR_HOST);
  if (args.project.startsWith('demo-') && !emulated) throw new Error('demo- projects only exist in the emulators');

  let database = args.database;
  if (!database && !emulated) {
    database = JSON.parse(fs.readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf8')).firestoreDatabaseId;
  }

  const app = initializeApp(emulated ? { projectId: args.project } : { projectId: args.project, credential: applicationDefault() });
  const auth = getAuth(app);
  const db = database ? getFirestore(app, database) : getFirestore(app);

  console.log(`${args.apply ? 'APPLYING' : 'DRY RUN'} — project ${args.project}${database ? `, database ${database}` : ''}${emulated ? ' (emulators)' : ''}`);

  const snap = await db.collection('staffDirectory').get();
  const wanted = new Map();
  let problems = 0;

  for (const docSnap of snap.docs) {
    const entry = docSnap.data();
    const uid = docSnap.id;
    const claims = claimsForEntry(entry);
    if (!claims) { console.warn(`  skip ${uid}: role must be one of ${ASSIGNABLE_ROLES.join(', ')}`); problems++; continue; }

    let user;
    try { user = await auth.getUser(uid); } catch { console.warn(`  skip ${uid}: no Firebase Auth user with this UID`); problems++; continue; }

    const email = (user.email || '').toLowerCase();
    if (OWNER_EMAILS.includes(email)) { console.log(`  keep ${uid}: owner account (access comes from the rules)`); continue; }
    if (entry.email && email !== String(entry.email).toLowerCase()) {
      console.warn(`  skip ${uid}: directory email does not match the account's email`);
      problems++;
      continue;
    }
    wanted.set(uid, { user, claims });
  }

  let changes = 0;
  for (const [uid, { user, claims }] of wanted) {
    if (sameClaims(user.customClaims, claims)) { console.log(`  ok   ${uid}: ${claims.role} [${claims.perms.join(', ')}]`); continue; }
    changes++;
    console.log(`  set  ${uid}: ${claims.role} [${claims.perms.join(', ')}]`);
    if (args.apply) await auth.setCustomUserClaims(uid, { ...(user.customClaims || {}), ...claims });
  }

  // Remove staff claims from accounts that are no longer in the directory.
  let pageToken;
  do {
    const page = await auth.listUsers(1000, pageToken);
    for (const user of page.users) {
      const role = user.customClaims?.role;
      if (!role || wanted.has(user.uid)) continue;
      if (!ASSIGNABLE_ROLES.includes(role)) continue; // a manually granted 'dev' claim is left alone
      changes++;
      console.log(`  drop ${user.uid}: had ${role}, not in staffDirectory`);
      if (args.apply) {
        const { role: _r, perms: _p, ...rest } = user.customClaims;
        await auth.setCustomUserClaims(user.uid, Object.keys(rest).length ? rest : null);
        if (args.revokeRemoved) await auth.revokeRefreshTokens(user.uid);
      }
    }
    pageToken = page.pageToken;
  } while (pageToken);

  console.log(`${changes} change(s)${args.apply ? ' applied' : ' planned — re-run with --apply to write them'}; ${problems} entr${problems === 1 ? 'y' : 'ies'} skipped.`);
  if (args.apply && changes) console.log('Affected people get the new access after their next sign-in or token refresh (up to 1 hour).');
}

main().catch((err) => {
  console.error('set-staff-claims failed:', err.message);
  process.exit(1);
});
