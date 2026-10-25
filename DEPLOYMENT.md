# Deployment and one-time admin setup

Nothing in this document has been run against the live Firebase project. Every step is for the
owner to do deliberately, in order. The order matters: deploying the new Firestore rules before
step 2.3 would leave the live control panel unable to save.

## 1. Build

```bash
npm ci
npm run build                               # → docs/ (also mirrored to the repo root)
SITE_URL=https://your-domain/ npm run build # once the canonical address is decided
```

`npm run build` assembles `index.html` from `builder/`, builds with Vite into `docs/`, writes
`robots.txt` (plus `sitemap.xml` when `SITE_URL` is set), refuses to finish if any
credential-like text is found, and copies `docs/` to the repository root (removing stale
bundles) for branch-root hosting.

**Hosting targets in this repo** (left unchanged):

- GitHub Pages: `.github/workflows/deploy.yml` publishes `docs/` on every push to `main`.
- Firebase Hosting: `firebase.json` serves `docs/`.

Choose which address is canonical, then set `SITE_URL` for that build (for GitHub Pages, as an
`env:` on the "Build project" step). Until then the build omits canonical/og:url instead of
guessing.

## 2. Rollout order

### 2.1 Firebase console

- Authentication → Sign-in method: enable **Google**. Enable **Email/Password** only if staff
  will sign in that way (create their accounts under Authentication → Users).
- Authentication → Settings → Authorized domains: add every domain the site is served from.
- Optional, recommended: restrict the web API key to those domains (Google Cloud Console →
  Credentials) and enable App Check.

### 2.2 Publish the new site

Deploy the site as usual. It reads `config/public` and falls back to the old `config/main`, so it
works with the current data and the current rules.

Staff logins that existed only inside the old app (local usernames/passwords) no longer exist.
Everyone signs in with Firebase Auth.

### 2.3 Migrate the shop settings (one save)

Sign in with an owner account (Google, verified address listed in `builder/lib/roles.js`) →
open the control panel → change nothing or anything → **Save** in any section. The first save
copies the whole configuration into `config/public`. Confirm in Firebase console → Firestore that
`config/public` exists. `config/main` stays as a backup; it becomes read-only under the new rules.

### 2.4 Deploy the Firestore rules

The project uses a named Firestore database (`firestoreDatabaseId` in
`firebase-applet-config.json`). `firebase.json` does not list rules today, so a normal deploy
does not touch them. To deploy them, add this to `firebase.json`:

```json
"firestore": [{ "database": "<firestoreDatabaseId>", "rules": "firestore.rules" }]
```

then:

```bash
npm run test:rules                                        # must pass
npx firebase deploy --only firestore:rules --project <project-id>
```

No composite indexes are needed (all queries use single-field indexes).

`storage.rules` denies all access; the app does not use Cloud Storage. Deploy it only if the
bucket is in use for something else and you want it locked down.

### 2.5 Staff access (custom claims)

1. Each staff member signs in once (so they have a Firebase Auth account), and you copy their
   **UID** from Authentication → Users.
2. Control panel → Users → **Add staff**: UID, email, name, role (staff/admin) and sections.
3. From a trusted machine:

   ```bash
   gcloud auth application-default login                       # or GOOGLE_APPLICATION_CREDENTIALS
   npm run staff:claims -- --project <project-id>              # dry run: review the plan
   npm run staff:claims -- --project <project-id> --apply      # write the claims
   ```

4. Staff sign out and in again (or wait up to an hour) to pick up their access.

Re-run step 3 whenever the staff list changes. Removing someone from the directory removes
their claims on the next `--apply`; add `--revoke-removed` to end their session immediately.
The `dev` role is never granted or removed by the script; owners get it from the rules.

## 3. Data clean-up (needs owner approval; not automated)

- `users/*` documents written by the old app may contain fields such as `role` (and possibly
  copies of old login data). The new rules ignore them for access, but staff with the
  Customers section can read these documents. Review them and delete fields that should not be
  there.
- Product photos are stored as compressed data URLs inside product documents (max ~640 KB).
  Moving them to Cloud Storage or a CDN would make the menu load faster; not done here.
- Old orders saved by the previous app may lack fields the new history view uses; they still
  show for staff.

## 4. After deploying, check by hand

- [ ] Signed out: menu, prices, reviews and the footer load; no console errors.
- [ ] Add items, edit quantities, reload — the cart persists. Checkout opens WhatsApp with the
      right number and an itemised message.
- [ ] Signed in as a customer: order appears in "My orders"; a review shows as pending.
- [ ] Signed in as staff: only the permitted sections are visible; saving works; a customer
      account cannot open the control panel.
- [ ] Kurdish (RTL) and dark mode look right on a phone.

## 5. Rolling back

- Site: redeploy the previous release (Firebase Hosting → Release history, or revert the commit
  for GitHub Pages).
- Rules: the previous rules allow any signed-in user to make themselves an admin. Do not roll
  back to them; fix forward instead.
