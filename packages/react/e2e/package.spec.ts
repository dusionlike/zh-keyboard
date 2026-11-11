import type { Page } from '@playwright/test'
import { cp, mkdir, realpath, symlink, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'
import { build, createServer, preview } from 'vite'

const packageRoot = fileURLToPath(new URL('../', import.meta.url))

async function linkDependency(root: string, name: string) {
  const target = resolve(root, 'node_modules', name)
  await mkdir(dirname(target), { recursive: true })
  await symlink(await realpath(resolve(packageRoot, 'node_modules', name)), target, 'junction')
}

async function checkKeyboard(page: Page, url: string) {
  const errors: string[] = []
  const onError = (error: Error) => errors.push(error.message)
  page.on('pageerror', onError)
  try {
    await page.goto(url)
    const input = page.getByRole('textbox')
    await expect(input).toBeVisible()
    await input.click()
    await page.getByRole('button', { name: 'q', exact: true }).click()
    await expect(input).toHaveValue('q')
    await expect(page.locator('output')).toHaveText('q')
    expect(errors).toEqual([])
  } finally {
    page.off('pageerror', onError)
  }
}

test('built React package works in a standalone consumer', async ({ page }, testInfo) => {
  const root = testInfo.outputPath('consumer')
  const packageTarget = resolve(root, 'node_modules/@zh-keyboard/react')
  await mkdir(packageTarget, { recursive: true })
  // Copy the published entry points instead of importing the workspace source.
  await cp(resolve(packageRoot, 'dist'), resolve(packageTarget, 'dist'), { recursive: true })
  await cp(resolve(packageRoot, 'package.json'), resolve(packageTarget, 'package.json'))
  await Promise.all(['react', 'react-dom', '@zh-keyboard/core'].map(name => linkDependency(root, name)))
  await writeFile(resolve(root, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  await writeFile(resolve(root, 'index.html'), '<div id="root"></div><script type="module" src="/main.js"></script>')
  await writeFile(resolve(root, 'main.js'), `
    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import { ZhKeyboard, setKeyboardConfig } from '@zh-keyboard/react';
    import '@zh-keyboard/react/style.css';
    setKeyboardConfig({ defaultMode: 'zh', enableHandwriting: true, position: 'float' });
    function App() {
      const [value, setValue] = useState('');
      return React.createElement(React.Fragment, null,
        React.createElement('input', {
          'data-inputmode': 'en', value, onChange: e => setValue(e.target.value),
        }),
        React.createElement('output', null, value),
        React.createElement(ZhKeyboard),
      );
    }
    createRoot(document.getElementById('root')).render(
      React.createElement(React.StrictMode, null, React.createElement(App)),
    );
  `)

  const config = { root, configFile: false as const, logLevel: 'error' as const }
  await test.step('development dependency pre-bundling', async () => {
    const server = await createServer({ ...config, server: { host: '127.0.0.1', port: 0 } })
    try {
      await server.listen()
      await checkKeyboard(page, server.resolvedUrls!.local[0])
    } finally {
      await server.close()
    }
  })

  await test.step('production build', async () => {
    await build(config)
    const server = await preview({ ...config, preview: { host: '127.0.0.1', port: 0 } })
    try {
      await checkKeyboard(page, server.resolvedUrls.local[0])
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.httpServer.close(error => error ? reject(error) : resolve())
      })
    }
  })

  await test.step('CommonJS entry point', () => {
    const require = createRequire(resolve(root, 'package.json'))
    const keyboard = require('@zh-keyboard/react')
    expect(keyboard.ZhKeyboard).toBeDefined()
    expect(typeof keyboard.setKeyboardConfig).toBe('function')
  })
})
