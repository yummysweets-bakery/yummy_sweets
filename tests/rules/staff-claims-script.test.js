// Runs scripts/set-staff-claims.mjs against the Auth + Firestore emulators (demo project only).
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { clearFirestore, createUser, setDoc } from '../e2e/emulator-api.js';

const PROJECT = 'demo-yummy-sweets';
const AUTH = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099'}`;
const OWNER = { Authorization: 'Bearer owner', 'Content-Type': 'application/json' };

async function claimsOf(uid) {
  const res = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:lookup`, {
    method: 'POST', headers: OWNER, body: JSON.stringify({ localId: [uid] }),
  });
  const user = (await res.json()).users[0];
  return user.customAttributes ? JSON.parse(user.customAttributes) : {};
}

function run(...flags) {
  return execFileSync(process.execPath, ['scripts/set-staff-claims.mjs', '--project', PROJECT, ...flags], {
    env: {
      ...process.env,
      FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080',
      FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099',
    },
    encoding: 'utf8',
  });
}

const user = (email, claims) => createUser({ email, password: randomUUID(), displayName: email.split('@')[0], claims });
const ids = {};

describe('scripts/set-staff-claims.mjs (emulators)', () => {
  beforeAll(async () => {
    await clearFirestore();
    await fetch(`${AUTH}/emulator/v1/projects/${PROJECT}/accounts`, { method: 'DELETE' });

    ids.staff = await user('baker@example.com');
    ids.admin = await user('manager@example.com');
    ids.former = await user('former@example.com', { role: 'staff', perms: ['products'], other: 1 });
    ids.mismatch = await user('real@example.com');
    ids.dev = await user('contractor@example.com', { role: 'dev' });
    ids.owner = await user('qaessafty@gmail.com');

    await setDoc(`staffDirectory/${ids.staff}`, { email: 'baker@example.com', role: 'staff', perms: ['products', 'not-a-perm', 'products'] });
    await setDoc(`staffDirectory/${ids.admin}`, { email: 'manager@example.com', role: 'admin', perms: ['products'] });
    await setDoc(`staffDirectory/${ids.mismatch}`, { email: 'someone-else@example.com', role: 'admin', perms: [] });
    await setDoc(`staffDirectory/${ids.owner}`, { email: 'qaessafty@gmail.com', role: 'staff', perms: [] });
    await setDoc('staffDirectory/no-such-user', { email: 'ghost@example.com', role: 'staff', perms: [] });
    await setDoc(`staffDirectory/bad-role`, { email: 'x@example.com', role: 'dev', perms: [] });
  });

  it('dry run changes nothing', async () => {
    const out = run();
    expect(out).toContain('DRY RUN');
    expect(out).toContain('planned');
    expect(await claimsOf(ids.staff)).toEqual({});
    expect((await claimsOf(ids.former)).role).toBe('staff');
  });

  it('--apply grants, removes and skips as documented', async () => {
    const out = run('--apply');
    expect(out).toContain('APPLYING');

    expect(await claimsOf(ids.staff)).toEqual({ role: 'staff', perms: ['products'] });
    expect(await claimsOf(ids.admin)).toEqual({ role: 'admin', perms: [] });
    expect(await claimsOf(ids.former)).toEqual({ other: 1 });   // staff claims removed, unrelated claims kept
    expect(await claimsOf(ids.mismatch)).toEqual({});           // directory email does not match: skipped
    expect(await claimsOf(ids.dev)).toEqual({ role: 'dev' });   // never touched
    expect(await claimsOf(ids.owner)).toEqual({});              // owners rely on the rules, not claims

    // Second run is a no-op.
    expect(run('--apply')).toContain('0 change(s)');
  });
});
