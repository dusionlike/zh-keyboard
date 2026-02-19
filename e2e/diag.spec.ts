import { test } from '@playwright/test'

test('diagnostic', async ({ page }) => {
  const logs: string[] = []
  const errors: string[] = []

  page.on('console', (msg) => {
    logs.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => {
    errors.push(`PAGE ERROR: ${err.message}`)
  })

  await page.goto('http://localhost:5174/')
  await page.locator('input[data-inputmode="zh"]').click()
  await page.waitForTimeout(2000)

  const candidateVisible = await page.locator('.zhk-candidate').isVisible()

  console.warn('Candidate bar visible:', candidateVisible)

  const dBtn = page.locator('button.zhk-base__key--letter', { hasText: 'D' }).first()
  const dVisible = await dBtn.isVisible()

  console.warn('D button visible:', dVisible)

  if (dVisible) {
    await dBtn.click()
    await page.waitForTimeout(200)
    await page.locator('button.zhk-base__key--letter', { hasText: 'A' }).first().click()
    await page.waitForTimeout(200)
    await page.locator('button.zhk-base__key--letter', { hasText: 'G' }).first().click()
    await page.waitForTimeout(200)
    await page.locator('button.zhk-base__key--letter', { hasText: 'E' }).first().click()
  }

  // Wait 20 seconds to allow WASM initialization
  await page.waitForTimeout(20000)

  const candidateCount = await page.locator('.zhk-candidate-list__item').count()

  console.warn('Candidate count after 20s:', candidateCount)

  const candidateBarHtml = await page.locator('.zhk-candidate').innerHTML().catch(() => 'not found')

  console.warn('Candidate bar html (first 300):', candidateBarHtml.slice(0, 300))

  console.warn(`\n=== Console logs (${logs.length} total) ===`)
  logs.forEach((l) => {
    if (!l.includes('[vite]') && !l.includes('Download the React DevTools'))

      console.warn(l)
  })

  console.warn('\n=== Page Errors ===')
  errors.forEach(e =>
    console.warn(e))
})
