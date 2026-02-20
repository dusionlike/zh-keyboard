import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: {
    timeout: 60_000,
  },
  use: {
    headless: true,
    viewport: { width: 500, height: 900 },
  },
  projects: [
    {
      name: 'vue',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 500, height: 900 },
        baseURL: 'http://localhost:5174',
      },
      testMatch: 'vue.spec.ts',
    },
    {
      name: 'react',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 500, height: 900 },
        baseURL: 'http://localhost:5175',
      },
      testMatch: 'react.spec.ts',
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @zh-keyboard/vue dev',
      port: 5174,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter @zh-keyboard/react dev',
      port: 5175,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
})
