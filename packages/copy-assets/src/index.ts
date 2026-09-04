import { existsSync } from 'node:fs'
import { cp, mkdir, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { argv, cwd, exit, stdout } from 'node:process'

const require = createRequire(import.meta.url)

function findWorkspaceDir(): string {
  let currentDir = resolve(cwd())

  while (true) {
    if (existsSync(resolve(currentDir, 'pnpm-workspace.yaml'))) {
      return currentDir
    }

    const parentDir = dirname(currentDir)
    if (parentDir === currentDir) {
      throw new Error('找不到 workspace 根目录')
    }
    currentDir = parentDir
  }
}

function getPackageAssetDir(assetPath: string): string {
  return dirname(require.resolve(assetPath))
}

function assertWorkspacePath(workspaceDir: string, path: string): void {
  const relativePath = relative(workspaceDir, path)
  if (!relativePath || relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error(`目标目录必须位于 workspace 内: ${path}`)
  }
}

async function copyAssetDirectory(sourceDir: string, targetDir: string): Promise<void> {
  await rm(targetDir, { recursive: true, force: true })
  await mkdir(dirname(targetDir), { recursive: true })
  await cp(sourceDir, targetDir, { recursive: true })
  stdout.write(`Copied ${sourceDir} -> ${targetDir}\n`)
}

async function copyAssets(workspaceDir: string, appDir: string): Promise<void> {
  const appPath = isAbsolute(appDir) ? resolve(appDir) : resolve(workspaceDir, appDir)
  assertWorkspacePath(workspaceDir, appPath)

  const pinyinDataDir = getPackageAssetDir('@zh-keyboard/pinyin/data/rime-api.js')
  const recognizerModelsDir = getPackageAssetDir('@zh-keyboard/recognizer/models/dict.txt')
  const publicDir = resolve(appPath, 'public')

  await copyAssetDirectory(pinyinDataDir, resolve(publicDir, 'data'))
  await copyAssetDirectory(recognizerModelsDir, resolve(publicDir, 'models'))
}

const workspaceDir = findWorkspaceDir()
const [target] = argv.slice(2).filter(argument => argument !== '--')

async function main(): Promise<void> {
  if (target === '--all') {
    for (const appDir of ['packages/vue', 'packages/react', 'examples']) {
      await copyAssets(workspaceDir, appDir)
    }
  } else {
    await copyAssets(workspaceDir, target ?? cwd())
  }
}

void main().catch((error: unknown) => {
  console.error(error)
  exit(1)
})
