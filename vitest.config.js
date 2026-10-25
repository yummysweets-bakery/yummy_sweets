import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.js', 'tests/rules/**/*.test.js'],
    environment: 'node',
    testTimeout: 20000,
    hookTimeout: 30000,
    // Rules tests share one emulator; run files one at a time.
    fileParallelism: false,
  },
});
