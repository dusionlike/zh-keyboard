import type { PinyinEngine } from '@zh-keyboard/core'
import type { RimeEngine, RimeState, RimeWasmOptions } from './types'
import createRimeModule from '../data/rime-api.js'

export type { RimeCandidate, RimeEngine, RimeState, RimeWasmOptions } from './types'

interface EmscriptenModule {
  ccall(
    ident: string,
    returnType: string | null,
    argTypes: string[],
    args: unknown[],
  ): unknown
  FS: {
    mkdir(path: string): void
    mount(type: unknown, opts: Record<string, unknown>, mountpoint: string): void
    syncfs(populate: boolean, callback: (err: unknown) => void): void
    writeFile(path: string, data: Uint8Array): void
    filesystems: { IDBFS: unknown }
  }
}

function syncfs(module: EmscriptenModule, populate: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    module.FS.syncfs(populate, (err: unknown) => {
      if (err)
        reject(err)
      else resolve()
    })
  })
}

export async function createRimeEngine(
  options: RimeWasmOptions = {},
): Promise<RimeEngine> {
  const wasmDir = options.wasmDir ?? '.'

  const Module: EmscriptenModule = await createRimeModule({
    locateFile(file: string) {
      return `${wasmDir}/${file}`
    },
  }) as EmscriptenModule

  // Set up persistent filesystem
  try {
    Module.FS.mkdir('/rime_user')
  } catch {
    // 目录可能已存在
  }
  Module.FS.mount(Module.FS.filesystems.IDBFS, {}, '/rime_user')
  await syncfs(Module, true)

  // Create /rime/build directory
  try {
    Module.FS.mkdir('/rime')
  } catch {
    // 可能已存在
  }
  try {
    Module.FS.mkdir('/rime/build')
  } catch {
    // 可能已存在
  }

  // 获取所有数据文件（YAML 配置 + 二进制词典）并写入虚拟文件系统
  const allDataFiles = options.dataFiles ?? [
    'default.yaml',
    'luna_pinyin.schema.yaml',
    'luna_pinyin.table.bin',
    'luna_pinyin.prism.bin',
    'luna_pinyin.reverse.bin',
  ]
  await Promise.all(
    allDataFiles.map(async (file) => {
      const url = `${wasmDir}/${file}`
      const resp = await fetch(url)
      if (!resp.ok)
        throw new Error(`Failed to fetch ${url}: ${resp.status}`)
      const data = new Uint8Array(await resp.arrayBuffer())
      Module.FS.writeFile(`/rime/build/${file}`, data)
    }),
  )

  // Initialize the engine
  const rc = Module.ccall('rime_wasm_init', 'number', [], []) as number
  if (rc !== 0) {
    throw new Error(`rime_wasm_init failed with code ${rc}`)
  }

  // 初始部署后持久化
  await syncfs(Module, false)

  let destroyed = false

  function callJson(fn: string, argTypes: string[], args: unknown[]): RimeState {
    if (destroyed)
      throw new Error('Engine is destroyed')
    const json = Module.ccall(fn, 'string', argTypes, args) as string
    return JSON.parse(json) as RimeState
  }

  const engine: RimeEngine = {
    processInput(keys: string): RimeState {
      return callJson('rime_wasm_process_input', ['string'], [keys])
    },

    pickCandidate(index: number): RimeState {
      const state = callJson('rime_wasm_pick_candidate', ['number'], [index])
      // 在选词后持久化用户词典
      syncfs(Module, false).catch(() => {})
      return state
    },

    flipPage(forward: boolean): RimeState {
      return callJson('rime_wasm_flip_page', ['number'], [forward ? 0 : 1])
    },

    clearInput(): void {
      if (destroyed)
        return
      Module.ccall('rime_wasm_clear_input', null, [], [])
    },

    setOption(name: string, value: boolean): void {
      if (destroyed)
        return
      Module.ccall('rime_wasm_set_option', null, ['string', 'number'], [name, value ? 1 : 0])
    },

    getVersion(): string {
      if (destroyed)
        return 'unknown'
      return Module.ccall('rime_wasm_get_version', 'string', [], []) as string
    },

    destroy(): void {
      if (destroyed)
        return
      destroyed = true
      Module.ccall('rime_wasm_destroy', null, [], [])
      syncfs(Module, false).catch(() => {})
    },
  }

  return engine
}

export interface RimePinyinEngineOptions extends RimeWasmOptions {
  /**
   * 是否默认使用简体中文
   * @default true
   */
  simplified?: boolean
}

/**
 * 创建基于 RIME WASM 的拼音引擎，实现 PinyinEngine 通用接口。
 * 内部处理分页逻辑，processInput 返回所有页的候选词集合。
 */
export async function createRimePinyinEngine(
  options: RimePinyinEngineOptions = {},
): Promise<PinyinEngine> {
  const engine = await createRimeEngine(options)

  // 初始化时设置简繁体选项（默认简体）
  engine.setOption('zh_simp', options.simplified ?? true)

  // 记录上次发送给底层 RIME 的实际输入（用于增量优化）
  let prevRimeInput = ''

  // 当前候选词的分页映射表：每项记录该候选词所在 RIME 页码和页内索引
  let candidatePageMap: Array<{ page: number, localIndex: number }> = []

  /**
   * 收集当前输入状态下所有页的候选词。
   * 从第0页开始向后翻页直到 isLastPage，然后翻回第0页。
   */
  function collectAllCandidates(firstPageState: RimeState): {
    candidates: string[]
    pageMap: Array<{ page: number, localIndex: number }>
  } {
    const candidates: string[] = []
    const pageMap: Array<{ page: number, localIndex: number }> = []

    // 收集第0页
    firstPageState.candidates.forEach((c, i) => {
      candidates.push(c.text)
      pageMap.push({ page: 0, localIndex: i })
    })

    let pagesFlipped = 0
    let currentState = firstPageState

    // 只要不是最后一页就继续翻页（forward=true 表示下一页）
    while (!currentState.isLastPage) {
      currentState = engine.flipPage(true)
      pagesFlipped++
      const currentPage = pagesFlipped
      currentState.candidates.forEach((c, i) => {
        candidates.push(c.text)
        pageMap.push({ page: currentPage, localIndex: i })
      })
    }

    // 翻回第0页（forward=false 表示上一页）
    for (let i = 0; i < pagesFlipped; i++) {
      engine.flipPage(false)
    }

    return { candidates, pageMap }
  }

  const rimePinyinEngine: PinyinEngine = {
    async processInput(fullPinyin: string): Promise<string[]> {
      if (!fullPinyin) {
        engine.clearInput()
        prevRimeInput = ''
        candidatePageMap = []
        return []
      }

      let firstPageState: RimeState

      if (fullPinyin.startsWith(prevRimeInput)) {
        // 增量输入：只发送新增部分
        const delta = fullPinyin.slice(prevRimeInput.length)
        firstPageState = engine.processInput(delta)
      } else {
        // 删除或修改：清空后重新输入完整拼音
        engine.clearInput()
        firstPageState = engine.processInput(fullPinyin)
      }

      prevRimeInput = fullPinyin

      const { candidates, pageMap } = collectAllCandidates(firstPageState)
      candidatePageMap = pageMap

      return candidates
    },

    async pickCandidate(globalIndex: number): Promise<string | null> {
      const entry = candidatePageMap[globalIndex]
      if (!entry)
        return null

      const { page: targetPage, localIndex } = entry

      // 从当前第0页翻到目标页
      for (let i = 0; i < targetPage; i++) {
        engine.flipPage(true)
      }

      const state = engine.pickCandidate(localIndex)

      // 重置内部状态
      prevRimeInput = ''
      candidatePageMap = []

      return state.committed
    },

    clearInput(): void {
      engine.clearInput()
      prevRimeInput = ''
      candidatePageMap = []
    },

    setSimplified(simplified: boolean): void {
      engine.setOption('zh_simp', simplified)
    },

    destroy(): void {
      engine.destroy()
      prevRimeInput = ''
      candidatePageMap = []
    },
  }

  return rimePinyinEngine
}
