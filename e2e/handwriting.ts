import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

export async function mockRecognizer(page: Page, recognitionDelay = 0, candidates?: string[]) {
  await page.context().route('**/handwriting-recognizer.worker.ts*', async (route) => {
    const response = await route.fetch()
    const source = await response.text()
    const comlinkUrl = source.match(/import\s*\{\s*expose\s*\}\s*from\s*["']([^"']+)["']/)?.[1]
    if (!comlinkUrl) {
      throw new Error('Could not find the worker Comlink import')
    }
    await route.fulfill({
      response,
      body: `
        import { expose } from ${JSON.stringify(comlinkUrl)};
        expose({
          async initialize() { return true; },
          async recognize(strokes) {
            await new Promise(resolve => setTimeout(resolve, ${recognitionDelay}));
            const count = strokes.filter((value, index) => index % 3 === 2 && value === 1).length;
            return ${candidates ? JSON.stringify(candidates) : 'count > 1 ? [\'二\', \'三\'] : [\'你\', \'好\']'};
          },
          async close() {},
        });
      `,
    })
  })
}

export async function openHandwriting(page: Page, delay = 1000) {
  await page.goto('/')
  const slider = page.locator('#handwriting-delay')
  await expect(slider).toHaveValue('1000')
  if (delay !== 1000) {
    await slider.press('Home')
    for (let value = 500; value < delay; value += 250) {
      await slider.press('ArrowRight')
    }
    await expect(slider).toHaveValue(String(delay))
  }
  await page.locator('input[data-inputmode="hand"]').click()
  await expect(page.locator('canvas.handwriting-canvas')).toBeVisible()
}

export async function drawStroke(page: Page, offset = 0) {
  const box = await page.locator('canvas.handwriting-canvas').boundingBox()
  if (!box) {
    throw new Error('Handwriting canvas is not visible')
  }
  await page.mouse.move(box.x + 20, box.y + 30 + offset)
  await page.mouse.down()
  await page.mouse.move(box.x + 100, box.y + 30 + offset, { steps: 5 })
  await page.mouse.up()
}

async function hasInk(page: Page) {
  return page.locator('canvas.handwriting-canvas').evaluate((canvas: HTMLCanvasElement) => {
    const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data
    for (let index = 0; index < pixels.length; index += 4) {
      if (pixels[index] < 80 && pixels[index + 3] > 0)
        return true
    }
    return false
  })
}

export function handwritingTests() {
  test.describe('handwriting composition', () => {
    test('keeps pre-edit after idle and confirms it only when the next character starts', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('你')
      await expect(input).toHaveValue('你')
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      expect(await hasInk(page)).toBe(true)
      await expect.poll(() => hasInk(page), { timeout: 4000 }).toBe(false)
      await page.waitForTimeout(400)
      await expect(input).toHaveValue('你')
      await expect(page.locator('.zhk-candidate-list__item')).toHaveText(['你', '好'])
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')

      const box = (await page.locator('canvas.handwriting-canvas').boundingBox())!
      await page.mouse.move(box.x + 20, box.y + 30)
      await page.mouse.down()
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
      await expect(input).toHaveValue('你')
      await page.mouse.move(box.x + 100, box.y + 30, { steps: 5 })
      await page.mouse.up()
      await expect(input).toHaveValue('你你', { timeout: 4000 })
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect.poll(() => hasInk(page), { timeout: 4000 }).toBe(false)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await page.getByRole('button', { name: '好', exact: true }).click()
      await expect(input).toHaveValue('你好')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      // Updating app state must not discard text inserted by the virtual keyboard.
      await page.locator('#handwriting-delay').press('Home')
      await expect(input).toHaveValue('你好')
    })

    test('honors a configured delay and restarts it after another stroke', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 1500)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('你')
      await page.waitForTimeout(800)
      await drawStroke(page, 40)
      await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('二')
      // The first stroke's deadline has passed, but the second stroke is still waiting.
      await page.waitForTimeout(800)
      await expect(input).toHaveValue('二')
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('二')
      expect(await hasInk(page)).toBe(true)
      await expect.poll(() => hasInk(page), { timeout: 2500 }).toBe(false)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('二')
      await expect(page.locator('.zhk-candidate-list__item')).toHaveText(['二', '三'])
      await expect(input).toHaveValue('二', { timeout: 2500 })
      await page.getByRole('button', { name: '三', exact: true }).click()
      await expect(input).toHaveValue('三')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
    })

    test('manual selection confirms pre-edit without a duplicate', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 750)
      await drawStroke(page)
      await page.getByRole('button', { name: '好', exact: true }).click()
      const input = page.locator('input[data-inputmode="hand"]')
      await expect(input).toHaveValue('好')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await page.waitForTimeout(1000)
      await expect(input).toHaveValue('好')
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
    })

    test('allows choosing an alternative long after the writing timeout', async ({ page }, testInfo) => {
      await mockRecognizer(page)
      await openHandwriting(page, 500)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect.poll(() => hasInk(page)).toBe(false)
      await page.waitForTimeout(1200)
      await expect(page.locator('.zhk-candidate-list__item')).toHaveText(['你', '好'])
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await page.screenshot({ path: `test-results/handwriting-idle-preedit-${testInfo.project.name}.png` })
      await page.getByRole('button', { name: '好', exact: true }).click()
      await expect(input).toHaveValue('好')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
    })

    test('replaces selected text with an underlined draft and confirms an alternative in place', async ({ page }, testInfo) => {
      await mockRecognizer(page)
      await openHandwriting(page, 3000)
      const input = page.locator('input[data-inputmode="hand"]')
      await input.fill('甲乙丙')
      await input.evaluate((element: HTMLInputElement) => element.setSelectionRange(1, 2))
      await page.evaluate(() => {
        const field = document.querySelector('input[data-inputmode="hand"]')!
        const events: { type: string, data: string | null, isComposing?: boolean }[] = []
        Object.assign(window, { handwritingCompositionEvents: events })
        for (const type of ['compositionstart', 'compositionupdate', 'compositionend', 'input']) {
          field.addEventListener(type, (event) => {
            events.push({ type, data: (event as InputEvent).data ?? null, isComposing: (event as InputEvent).isComposing })
          })
        }
      })
      await drawStroke(page)
      await expect(input).toHaveValue('甲你丙')
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect(page.locator('[data-zhk-preedit]')).toHaveCSS('text-decoration-line', 'underline')
      await expect(page.locator('[data-zhk-composition]')).toHaveAttribute('aria-hidden', 'true')
      await page.screenshot({ path: `test-results/handwriting-preedit-${testInfo.project.name}.png` })
      await drawStroke(page, 40)
      await expect(input).toHaveValue('甲二丙')
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('二')
      await page.getByRole('button', { name: '三', exact: true }).click()
      await expect(input).toHaveValue('甲三丙')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      const events = await page.evaluate(() => (window as unknown as {
        handwritingCompositionEvents: { type: string, data: string | null, isComposing?: boolean }[]
      }).handwritingCompositionEvents)
      expect(events.filter(event => event.type === 'compositionstart')).toHaveLength(1)
      expect(events.filter(event => event.type === 'compositionend')).toEqual([{ type: 'compositionend', data: '三', isComposing: undefined }])
      expect(events.some(event => event.type === 'input' && event.isComposing === true && event.data === '二')).toBe(true)
      await page.locator('#handwriting-delay').press('Home')
      await expect(input).toHaveValue('甲三丙')
    })

    test('Escape cancels pre-edit and restores the original selection', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page)
      const input = page.locator('input[data-inputmode="hand"]')
      await input.fill('甲乙')
      await input.evaluate((element: HTMLInputElement) => element.setSelectionRange(1, 2))
      await drawStroke(page)
      await expect(input).toHaveValue('甲你')
      await input.press('Escape')
      await expect(input).toHaveValue('甲乙')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
      expect(await input.evaluate((element: HTMLInputElement) => [element.selectionStart, element.selectionEnd])).toEqual([1, 2])
      await page.waitForTimeout(1200)
      await expect(input).toHaveValue('甲乙')
    })

    test('confirms pre-edit before physical typing and does not append it twice', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await input.press('a')
      await expect(input).toHaveValue('你a')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
      await page.waitForTimeout(1200)
      await expect(input).toHaveValue('你a')
    })

    test('supports an underlined draft inside a multiline textarea', async ({ page }, testInfo) => {
      await mockRecognizer(page)
      await openHandwriting(page, 3000)
      await page.evaluate(() => {
        const field = document.createElement('textarea')
        field.id = 'handwriting-textarea'
        field.dataset.inputmode = 'hand'
        field.inputMode = 'none'
        field.value = '第一行\n第二行甲乙'
        field.style.cssText = 'position:fixed;top:20px;left:20px;width:240px;height:110px;padding:8px;font:20px/28px sans-serif;z-index:10'
        document.querySelector('.input-grid')!.append(field)
        field.focus()
        field.setSelectionRange(8, 9)
      })
      const input = page.locator('#handwriting-textarea')
      await drawStroke(page)
      await expect(input).toHaveValue('第一行\n第二行甲你')
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      const fieldBox = (await input.boundingBox())!
      const markerBox = (await page.locator('[data-zhk-preedit]').boundingBox())!
      expect(markerBox.y).toBeGreaterThan(fieldBox.y + 28)
      expect(markerBox.x).toBeGreaterThanOrEqual(fieldBox.x)
      expect(markerBox.x + markerBox.width).toBeLessThanOrEqual(fieldBox.x + fieldBox.width)
      await page.screenshot({ path: `test-results/handwriting-textarea-preedit-${testInfo.project.name}.png` })
      await page.getByRole('button', { name: '好', exact: true }).click()
      await expect(input).toHaveValue('第一行\n第二行甲好')
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
    })

    test('waits for slow recognition and retains its editable candidate after clearing the canvas', async ({ page }) => {
      await mockRecognizer(page, 1200)
      await openHandwriting(page, 500)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      await page.waitForTimeout(800)
      await expect(input).toHaveValue('')
      await expect(input).toHaveValue('你', { timeout: 2500 })
      await expect.poll(() => hasInk(page)).toBe(false)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText('你')
      await expect(page.locator('.zhk-candidate-list__item')).toHaveText(['你', '好'])
      await page.getByRole('button', { name: '好', exact: true }).click()
      await expect(input).toHaveValue('好')
    })

    test('cancels pending input when switching to another handwriting field', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 1500)
      await page.evaluate(() => {
        const field = document.createElement('input')
        field.id = 'second-handwriting-field'
        field.dataset.inputmode = 'hand'
        field.inputMode = 'none'
        document.querySelector('.input-grid')!.append(field)
      })
      await drawStroke(page)
      await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('你')
      await page.locator('#second-handwriting-field').focus()
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
      await page.waitForTimeout(1800)
      await expect(page.locator('input[data-inputmode="hand"]').first()).toHaveValue('')
      await expect(page.locator('#second-handwriting-field')).toHaveValue('')
    })

    test('cancels pending input when leaving handwriting mode', async ({ page }) => {
      await mockRecognizer(page)
      await openHandwriting(page, 750)
      await drawStroke(page)
      await expect(page.locator('.zhk-candidate-list__item').first()).toHaveText('你')
      await page.getByRole('button', { name: '拼音', exact: true }).click()
      await expect(page.locator('canvas.handwriting-canvas')).toHaveCount(0)
      await page.waitForTimeout(1000)
      await expect(page.locator('input[data-inputmode="hand"]')).toHaveValue('')
    })

    test('retains real recognizer candidates and pre-edit until the user selects', async ({ page }) => {
      await openHandwriting(page, 3000)
      const input = page.locator('input[data-inputmode="hand"]')
      await drawStroke(page)
      const first = page.locator('.zhk-candidate-list__item').first()
      await expect(first).toBeVisible({ timeout: 30000 })
      const candidate = (await first.textContent())!.trim()
      expect(candidate.length).toBeGreaterThan(0)
      await expect(input).toHaveValue(candidate, { timeout: 5000 })
      await expect.poll(() => hasInk(page), { timeout: 5000 }).toBe(false)
      await expect(first).toHaveText(candidate)
      await expect(page.locator('[data-zhk-preedit]')).toHaveText(candidate)
      await first.click()
      await expect(input).toHaveValue(candidate)
      await expect(page.locator('.zhk-candidate-list__item')).toHaveCount(0)
      await expect(page.locator('[data-zhk-composition]')).toHaveCount(0)
    })
  })
}
