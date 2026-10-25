# Yummy Sweets

Bilingual (English / Kurdish Sorani) storefront for an artisanal bakery. Customers browse the
menu, build a cart and send the order on WhatsApp; staff manage the shop from a built-in control
panel. Firebase (Auth + Firestore) is the backend.

## Layout

| Path | What it is |
| --- | --- |
| `builder/head.html`, `body.html`, `styles.css`, `app.js` | the page, assembled into `index.html` by `builder/assemble.js` |
| `builder/lib/` | small modules: escaping, pricing, cart, dates, WhatsApp, orders, Firebase access, session, SEO |
| `firestore.rules`, `storage.rules` | security rules (the real access control) |
| `scripts/` | build, secret scan, staff custom-claims sync |
| `tests/unit`, `tests/rules`, `tests/e2e` | Vitest unit tests, emulator rules tests, Playwright tests |
| `docs/` | build output (published by GitHub Pages / Firebase Hosting) |

## Commands

```bash
npm ci
npm run dev                 # assemble first: node builder/assemble.js
npm run build               # production build → docs/
npm run lint                # syntax check + source secret scan
npm test                    # unit + rules + storefront e2e
npm run test:e2e:emulator   # sign-in, orders, moderation against the Firebase emulators
```

Rules and emulator tests need Java 11+ (Firebase Emulator Suite). They run under the
`demo-yummy-sweets` project id, which cannot reach a real Firebase project; the browser tests
block every non-local network request.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the rollout steps and [SECURITY.md](SECURITY.md) for the
access model and the credential-rotation checklist.
