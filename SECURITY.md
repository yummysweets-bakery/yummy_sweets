# Security

## Reporting a vulnerability

Please report security problems privately through GitHub: **Security → Report a vulnerability**
on this repository. Do not open a public issue for anything that could expose customer data or
staff access.

## How access works

| Who | How they are identified | What they can do |
| --- | --- | --- |
| Visitors | nobody signed in | read the menu, settings and approved reviews; build a cart; send an order on WhatsApp |
| Customers | Firebase Auth (Google) | everything above, plus: their own profile, their own order history, submitting reviews (held for moderation) |
| Staff | Firebase Auth + custom claims `role: "staff"`, `perms: [...]` | the control-panel sections listed in `perms` |
| Admins | custom claim `role: "admin"` | every section except developer data tools |
| Developers / owners | verified sign-in with an address in `OWNER_EMAILS` (`builder/lib/roles.js`, mirrored in `firestore.rules`), or claim `role: "dev"` | everything |

- **Firestore rules are the security boundary** (`firestore.rules`, tested in `tests/rules/`).
  The browser UI hides what a person cannot use, but nothing in the browser grants access.
- **There are no passwords, local accounts or "secret" logins in the app.** Staff sign in with
  Firebase Auth (Google or email/password accounts created in the Firebase console).
- Roles come from **custom claims**, which only the Admin SDK can set. The control panel's
  Users tab edits the `staffDirectory` collection; `npm run staff:claims` turns that into claims
  (see [DEPLOYMENT.md](DEPLOYMENT.md#3-staff-access-custom-claims)).
- Privileged sessions older than 7 days must sign in again before using the control panel.
- All text from Firestore, the URL or the user is escaped before it reaches the page
  (`builder/lib/escape.js`). Images and links are restricted to safe URL schemes.
- Customer reviews are stored as `pending` and appear only after staff approve them.
- `npm run build` fails if the source or build output contains credential-like material
  (`scripts/check-secrets.mjs`; it reports the file and rule, never the matched text).

### What is public on purpose

`firebase-applet-config.json` holds the Firebase **web** configuration (API key, project id,
app id). These identify the project to browsers and are not secrets; access is controlled by
the rules. Restrict the key in Google Cloud Console → APIs & Services → Credentials (HTTP
referrers: your hosting domains only), and consider enabling Firebase App Check.

## Credential rotation checklist (one-time, owner action required)

Earlier versions of this app shipped hard-coded account passwords in the page source. They were
removed in this version, but **they remain readable in the git history and in any copy of the
old site that was downloaded or cached.** Treat every one of them as public.

None of the steps below have been carried out automatically.

- [ ] List every place those passwords were used: the old in-app logins, and any other account
      (Firebase Auth email/password users, Google/Gmail accounts, hosting, email, social media)
      where the same or a similar password was reused.
- [ ] Change each of those passwords to a new, unique one, and turn on 2-step verification for the
      owner Google accounts.
- [ ] In Firebase console → Authentication → Users, review every account. Delete accounts nobody
      recognises; for email/password staff accounts, send a password reset.
- [ ] After the new rules are deployed, run `npm run staff:claims -- --project <id>` (dry run)
      and confirm the list of staff matches who should have access.
- [ ] Decide whether to rewrite git history to drop the old files (`check.js`, old `assets/*.js`
      bundles, older `builder/app.js` revisions). This is destructive, breaks existing clones and
      does **not** un-publish what was already public — rotating the passwords is what matters.
- [ ] `yummy-sweets last.zip` (an older snapshot of the project, kept because it is user work)
      also contains the old app. Remove it once you no longer need it.
