// Playwright end-to-end tests.
//   storefront: Vite dev server, every external request blocked (no Firebase, fonts or photos).
//   emulator:   Vite in emulator mode + Firebase Auth/Firestore emulators (npm run test:e2e:emulator).
import { defineConfig, devices } from '@playwright/test';

const project = process.env.E2E_PROJECT || 'storefront';
const port = project === 'emulator' ? 3100 : 3000;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
  },
  webServer: {
    command: project === 'emulator'
      ? `node builder/assemble.js && VITE_FIREBASE_EMULATORS=true npx vite --port ${port} --host 127.0.0.1 --strictPort`
      : `node builder/assemble.js && npx vite --port ${port} --host 127.0.0.1 --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'storefront',
      testMatch: /storefront.*\.spec\.js|responsive\.spec\.js|a11y\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'emulator',
      testMatch: /emulator.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
  ].filter(p => p.name === project),
});
