import { expect, test } from '@playwright/test'

test('diagnostic: pinyin candidates load without runtime errors', async ({ page }, testInfo) => {
  const logs: string[] = []
  const errors: string[] = []

  page.on('console', (msg) => {
    logs.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => {
    errors.push(err.message)
  })

  try {
    await page.goto('/')
    await page.locator('input[data-inputmode="zh"]').click()
    await expect(page.locator('.zhk-candidate')).toBeVisible()

    for (const key of ['D', 'A', 'G', 'E']) {
      await page.getByRole('button', { name: key, exact: true }).click()
    }

    await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('大哥')
    expect(errors).toEqual([])
  } finally {
    await testInfo.attach('browser-diagnostics', {
      body: JSON.stringify({
        logs,
        errors,
        candidateHtml: await page.locator('.zhk-candidate').innerHTML().catch(() => null),
      }, null, 2),
      contentType: 'application/json',
    })
  }
})
