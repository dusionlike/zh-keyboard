import type { Plugin, ResolvedConfig } from 'vite'
import { existsSync } from 'node:fs'
import { cp, mkdir, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, isAbsolute, relative, resolve } from 'node:path'

const require = createRequire(import.meta.url)

export interface CopyAssetsPluginOptions {
  /** 是否在 production build 完成后复制到 build.outDir，默认为 true。 */
  build?: boolean
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

function findWorkspaceDir(startDir: string): string {
  let currentDir = resolve(startDir)

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

async function copyAssetDirectory(sourceDir: string, targetDir: string): Promise<void> {
  await rm(targetDir, { recursive: true, force: true })
  await mkdir(dirname(targetDir), { recursive: true })
  await cp(sourceDir, targetDir, { recursive: true })
}

async function copyAssets(outputDir: string, workspaceDir: string): Promise<void> {
  assertWorkspacePath(workspaceDir, outputDir)

  const pinyinDataDir = getPackageAssetDir('@zh-keyboard/pinyin/data/rime-api.js')
  const recognizerModelsDir = getPackageAssetDir('@zh-keyboard/recognizer/models/dict.txt')

  await copyAssetDirectory(pinyinDataDir, resolve(outputDir, 'data'))
  await copyAssetDirectory(recognizerModelsDir, resolve(outputDir, 'models'))
}

export function copyAssetsPlugin(options: CopyAssetsPluginOptions = {}): Plugin {
  const copyOnBuild = options.build ?? true
  let config: ResolvedConfig

  return {
    name: 'zh-keyboard-copy-assets',

    async configureServer(server) {
      const workspaceDir = findWorkspaceDir(server.config.root)
      await copyAssets(resolve(server.config.root, 'public'), workspaceDir)
    },

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async closeBundle() {
      if (!copyOnBuild || config.command !== 'build') {
        return
      }

      const workspaceDir = findWorkspaceDir(config.root)
      const outputDir = resolve(config.root, config.build.outDir)
      await copyAssets(outputDir, workspaceDir)
    },
  }
}
