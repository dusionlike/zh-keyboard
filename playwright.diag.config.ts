import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './e2e',
  testMatch: 'diag.spec.ts',
  timeout: 120_000,
  use: {
    headless: true,
    viewport: { width: 500, height: 900 },
    baseURL: 'http://localhost:5174',
  },
  webServer: {
    command: 'pnpm --filter @zh-keyboard/vue dev',
    port: 5174,
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
