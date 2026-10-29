import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { drawStroke, mockRecognizer, openHandwriting } from './handwriting'

const candidates = Array.from({ length: 100 }, (_, index) => String.fromCodePoint(0x4E00 + index))

async function setKeyboardHeight(page: Page, height: number) {
  if (height === 300)
    return
  // Both demo apps expose the keyboard height as the range with a 1000px maximum.
  const heightSlider = page.locator('input[type="range"][max="1000"]')
  await heightSlider.press('Home')
  for (let value = 300; value < height; value += 10) {
    await heightSlider.press('ArrowRight')
  }
  await expect(heightSlider).toHaveValue(String(height))
}

export function candidatePanelTests() {
  test.describe('shared candidate panel', () => {
    for (const height of [300, 600]) {
      test(`handwriting expands inside its ${height}px area and scrolls to every candidate`, async ({ page }, testInfo) => {
        if (height === 600)
          await page.setViewportSize({ width: 1100, height: 1200 })
        await mockRecognizer(page, 0, candidates)
        await openHandwriting(page)
        if (height !== 300) {
          await setKeyboardHeight(page, height)
          await page.locator('input[data-inputmode="hand"]').click()
        }
        await drawStroke(page)
        const input = page.locator('input[data-inputmode="hand"]')
        await expect(input).toHaveValue(candidates[0])
        const area = (await page.locator('.handwriting-input').boundingBox())!
        const bar = (await page.locator('.handwriting-input > .zhk-candidate').boundingBox())!
        const canvas = (await page.locator('canvas.handwriting-canvas').boundingBox())!
        expect(Math.abs(area.height - height)).toBeLessThan(1)
        expect(bar.height).toBeLessThan(area.height / 4)
        expect(canvas.height).toBeGreaterThan(area.height * 0.6)

        const arrow = (await page.getByRole('button', { name: '展开全部候选词' }).boundingBox())!
        expect(arrow.x + arrow.width).toBeLessThanOrEqual(area.x + area.width)

        await page.getByRole('button', { name: '展开全部候选词' }).click()
        const panel = page.locator('.zhk-selection')
        await expect(panel).toBeVisible()
        await expect(panel.locator('.zhk-selection__text')).toHaveCount(candidates.length)
        const bounds = (await panel.boundingBox())!
        expect(Math.abs(bounds.y - area.y)).toBeLessThan(1)
        expect(Math.abs(bounds.height - area.height)).toBeLessThan(1)
        expect(bounds.y + bounds.height).toBeLessThanOrEqual(area.y + area.height + 1)
        await expect(page.locator('[data-zhk-preedit]')).toHaveText(candidates[0])
        await expect(input).toBeFocused()
        await page.screenshot({ path: `test-results/handwriting-candidates-${height}-${testInfo.project.name}.png` })

        const list = panel.locator('.zhk-selection__list')
        expect(await list.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true)
        expect(await list.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
        await list.hover()
        await page.mouse.wheel(0, 800)
        await expect.poll(() => list.evaluate(element => element.scrollTop)).toBeGreaterThan(0)
        await panel.locator('.zhk-selection__text').last().click()
        await expect(input).toHaveValue(candidates.at(-1)!)
        await expect(panel).toHaveCount(0)
        await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      })

      test(`pinyin still expands and selects all candidates at ${height}px`, async ({ page }, testInfo) => {
        if (height === 600)
          await page.setViewportSize({ width: 1100, height: 1200 })
        await page.goto('/')
        await setKeyboardHeight(page, height)
        const input = page.locator('input[data-inputmode="zh"]')
        await input.click()
        for (const letter of ['S', 'H', 'I']) {
          await page.locator('button.zhk-base__key--letter', { hasText: letter }).first().click()
        }
        const row = page.locator('.zhk-candidate-list__item')
        await expect(row.first()).toBeVisible()
        await expect(page.locator('.zhk-candidate__pinyin')).toHaveText('shi')
        const first = (await row.first().textContent())!.trim()
        const rowCount = await row.count()
        const keyboard = (await page.locator('.zhk').boundingBox())!
        const bar = (await page.locator('.zhk-candidate').boundingBox())!
        expect(bar.height).toBeGreaterThan(keyboard.height / 8)
        expect(bar.height).toBeLessThan(keyboard.height / 3)
        await page.getByRole('button', { name: '展开全部候选词' }).click()
        const panel = page.locator('.zhk-selection')
        await expect(panel).toBeVisible()
        await expect(panel.locator('.zhk-selection__text').first()).toHaveText(first)
        expect(await panel.locator('.zhk-selection__text').count()).toBeGreaterThan(rowCount)
        const bounds = (await panel.boundingBox())!
        expect(Math.abs(bounds.y - keyboard.y)).toBeLessThan(1)
        expect(Math.abs(bounds.height - keyboard.height)).toBeLessThan(1)
        await page.screenshot({ path: `test-results/pinyin-candidates-${height}-${testInfo.project.name}.png` })
        const choice = panel.locator('.zhk-selection__text').nth(rowCount)
        const expected = (await choice.textContent())!.trim()
        await choice.click()
        await expect(input).toHaveValue(expected)
        await expect(panel).toHaveCount(0)
      })
    }

    test('collapsing handwriting candidates preserves the canvas and pre-edit', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 5000)
      await drawStroke(page)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      const canvas = page.locator('canvas.handwriting-canvas')
      const original = await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())
      await page.getByRole('button', { name: '展开全部候选词' }).click()
      await page.getByRole('button', { name: '收起候选词' }).click()
      await expect(page.locator('.zhk-selection')).toHaveCount(0)
      expect(await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())).toBe(original)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect(page.locator('input[data-inputmode="hand"]')).toBeFocused()
      await drawStroke(page, 40)
      await expect(page.locator('input[data-inputmode="hand"]')).toHaveValue('二')
      await page.getByRole('button', { name: '三', exact: true }).click()
      await expect(page.locator('input[data-inputmode="hand"]')).toHaveValue('三')
    })

    test('leaving handwriting closes the expanded candidates', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page)
      await drawStroke(page)
      await page.getByRole('button', { name: '展开全部候选词' }).click()
      await expect(page.locator('.zhk-selection')).toBeVisible()
      await page.locator('input[data-inputmode="num"]').click()
      await expect(page.locator('.zhk-selection')).toHaveCount(0)
      await expect(page.locator('input[data-inputmode="hand"]')).toHaveValue('')
    })

    test('writing timeout keeps the expanded choices and pre-edit available', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 500)
      await drawStroke(page)
      await page.getByRole('button', { name: '展开全部候选词' }).click()
      await page.waitForTimeout(1000)
      const panel = page.locator('.zhk-selection')
      await expect(panel).toBeVisible()
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect(panel.locator('.zhk-selection__text')).toHaveText(['你', '好'])
      await panel.locator('.zhk-selection__text').nth(1).click()
      await expect(page.locator('input[data-inputmode="hand"]')).toHaveValue('好')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await expect(panel).toHaveCount(0)
    })
  })
}
