import { expect, test } from '@playwright/test'

/**
 * Shared test helper for typing pinyin keys on the zh-keyboard.
 * In Chinese mode, letters are displayed uppercase.
 */
async function typeKeys(page: import('@playwright/test').Page, keys: string[]) {
  for (const key of keys) {
    const btn = page.locator('button.zhk-base__key--letter', { hasText: key.toUpperCase() }).first()
    await btn.click()
    // Small delay to let each key be processed
    await page.waitForTimeout(50)
  }
}

test('rime engine loads successfully', async ({ page }) => {
  await page.goto('/')

  // Set up console error monitoring
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error')
      errors.push(msg.text())
  })

  // Click the Chinese input to activate keyboard in zh mode
  await page.locator('input[data-inputmode="zh"]').click()

  // Wait for the candidate bar to appear (indicates zh mode is active)
  await expect(page.locator('.zhk-candidate')).toBeVisible({ timeout: 10_000 })

  // Type one character to trigger engine initialization
  const dBtn = page.locator('button.zhk-base__key--letter', { hasText: 'D' }).first()
  await expect(dBtn).toBeVisible({ timeout: 5_000 })
  await dBtn.click()

  // Wait for candidates to appear – this confirms the engine loaded successfully
  const firstCandidate = page.locator('.zhk-candidate-list__item').first()
  await expect(firstCandidate).toBeVisible({ timeout: 60_000 })
})

test('typing dage shows 大哥 as the first candidate', async ({ page }) => {
  await page.goto('/')

  // Click the Chinese input to activate keyboard in zh mode
  await page.locator('input[data-inputmode="zh"]').click()

  // Wait for zh mode keyboard
  await expect(page.locator('.zhk-candidate')).toBeVisible({ timeout: 10_000 })

  // Wait for letter buttons to be available
  await expect(
    page.locator('button.zhk-base__key--letter', { hasText: 'D' }).first(),
  ).toBeVisible({ timeout: 5_000 })

  // Type d, a, g, e
  await typeKeys(page, ['d', 'a', 'g', 'e'])

  // Wait for candidates to appear (may take time for WASM engine to initialize)
  const candidateItems = page.locator('.zhk-candidate-list__item')
  await expect(candidateItems.first()).toBeVisible({ timeout: 60_000 })

  // Verify the first candidate is "大哥"
  const firstCandidateText = await candidateItems.first().textContent()
  expect(firstCandidateText?.trim()).toBe('大哥')
})
