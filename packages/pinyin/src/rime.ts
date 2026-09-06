import type { RimeEngine, RimeState, RimeWasmOptions } from './types'
import 'core-js/proposals/promise-with-resolvers'

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
    readFile(path: string, opts?: { encoding?: string, flags?: string }): Uint8Array
    filesystems: { IDBFS: unknown }
    unlink(path: string): void
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

async function loadModule(wasmDir: string): Promise<EmscriptenModule> {
  const createRimeModule = (
    await import(/* @vite-ignore */ /* webpackIgnore: true */ `${wasmDir}/rime-api.js`)
  ).default
  return createRimeModule({
    locateFile(file: string) {
      return `${wasmDir}/${file}`
    },
  }) as Promise<EmscriptenModule>
}

async function fetchBuffer(url: string): Promise<Uint8Array> {
  const resp = await fetch(url)
  if (!resp.ok)
    throw new Error(`获取 ${url} 失败: ${resp.status}`)
  return new Uint8Array(await resp.arrayBuffer())
}

function writeBuffers(
  module: EmscriptenModule,
  buffers: Record<string, Uint8Array>,
  destDir: string,
): void {
  for (const [file, data] of Object.entries(buffers)) {
    module.FS.writeFile(`${destDir}/${file}`, data)
  }
}

/** 读取 /rime/build/.version 文件内容，无缓存时返回 null。 */
function readVersionFile(module: EmscriptenModule): string | null {
  try {
    const data = module.FS.readFile('/rime/build/.version')
    return new TextDecoder().decode(data).trim()
  } catch {
    return null
  }
}

/** 将版本号写入 /rime/build/.version。 */
function writeVersionFile(module: EmscriptenModule, version: string): void {
  module.FS.writeFile('/rime/build/.version', new TextEncoder().encode(version))
}

/** 默认源词库文件名列表（均在 source/ 目录下）。 */
const DEFAULT_SOURCE_FILES = [
  'default.yaml',
  'luna_pinyin.schema.yaml',
  'luna_pinyin.dict.yaml',
  'symbols.yaml',
  'essay.txt',
] as const

/**
 * 创建 Rime 输入法引擎实例。
 *
 * 内部自动处理数据加载逻辑：
 * 1. 如果传入了 dictVersion，优先比对 IndexedDB 中的 .version 缓存；
 *    若版本匹配则直接加载缓存，跳过下载。
 * 2. 若版本不匹配或无缓存，自动下载默认源词库并编译。
 * 3. 初始化引擎后自动将版本号写入 IndexedDB 以供后续比对。
 */
export async function createRimeEngine(
  options: RimeWasmOptions = {},
): Promise<RimeEngine> {
  const wasmDir = options.wasmDir ?? '.'
  const Module = await loadModule(wasmDir)

  // 确保目录存在
  try {
    Module.FS.mkdir('/rime')
  } catch { /* 已存在 */ }
  try {
    Module.FS.mkdir('/rime/build')
  } catch { /* 已存在 */ }
  try {
    Module.FS.mkdir('/rime_user')
  } catch { /* 已存在 */ }

  // 将 /rime/build 和 /rime_user 都挂载到 IDBFS 实现持久化
  Module.FS.mount(Module.FS.filesystems.IDBFS, {}, '/rime/build')
  Module.FS.mount(Module.FS.filesystems.IDBFS, {}, '/rime_user')
  // populate=true 从 IndexedDB 读取数据到内存文件系统
  await syncfs(Module, true)

  let loaded = false
  let destroyed = false
  // 互斥锁：所有操作串行化，syncData 运行时其他操作自动排队
  let mutex = Promise.resolve()

  function withMutex<T>(fn: () => Promise<T> | T): Promise<T> {
    const prev = mutex
    const next = Promise.withResolvers<void>()
    mutex = next.promise
    return prev.then(() => {
      try {
        return Promise.resolve(fn()).finally(next.resolve)
      } catch (e) {
        next.resolve()
        throw e
      }
    })
  }

  function checkAlive() {
    if (destroyed)
      throw new Error('引擎已被销毁')
    if (!loaded)
      throw new Error('引擎未初始化')
  }

  async function initEngine(version?: string): Promise<void> {
    const rc = Module.ccall('rime_wasm_init', 'number', [], []) as number
    if (rc !== 0) {
      throw new Error(`rime_wasm_init 失败，返回码: ${rc}`)
    }
    loaded = true
    if (version !== undefined) {
      writeVersionFile(Module, version)
    }
    // 将 /rime/build 和 /rime_user 的变更写回 IndexedDB
    await syncfs(Module, false)
  }

  async function callJsonAsync(fn: string, argTypes: string[], args: unknown[]): Promise<RimeState> {
    checkAlive()
    const json = Module.ccall(fn, 'string', argTypes, args) as string
    return JSON.parse(json) as RimeState
  }

  // ---- 内部数据加载逻辑 ----

  const loading = Promise.withResolvers<void>()

  /**
   * 尝试从 IndexedDB 缓存加载预编译数据。
   * 若 dictVersion 已设置：比对 .version 文件内容；
   * 若未设置：检查 .version 是否存在。
   */
  async function loadFromCache(): Promise<boolean> {
    const cachedVersion = readVersionFile(Module)
    if (options.dictVersion !== undefined) {
      return cachedVersion === options.dictVersion
    }
    return cachedVersion !== null
  }

  /** 负责一次性的数据加载与引擎初始化。 */
  async function loadData(): Promise<void> {
    // 优先尝试加载缓存
    if (await loadFromCache()) {
      await initEngine(options.dictVersion)
      return
    }

    // 缓存未命中，下载默认源词库并编译
    const buffers: Record<string, Uint8Array> = {}
    for (const file of DEFAULT_SOURCE_FILES) {
      buffers[file] = await fetchBuffer(`${wasmDir}/source/${file}`)
    }
    writeBuffers(Module, buffers, '/rime')
    const rc = Module.ccall('rime_wasm_precompile', 'number', [], []) as number
    if (rc !== 0) {
      throw new Error(`rime_wasm_precompile 失败，返回码: ${rc}`)
    }
    await initEngine(options.dictVersion)
  }

  // 执行数据加载与初始化，完成后标记就绪
  try {
    await loadData()
  } finally {
    loading.resolve()
  }

  const engine: RimeEngine = {
    async processInput(keys: string): Promise<RimeState> {
      return withMutex(async () => {
        return callJsonAsync('rime_wasm_process_input', ['string'], [keys])
      })
    },

    async pickCandidate(index: number): Promise<RimeState> {
      return withMutex(async () => {
        const state = await callJsonAsync('rime_wasm_pick_candidate', ['number'], [index])
        // pickCandidate 会更新用户词典，同步到 IndexedDB
        await syncfs(Module, false)
        return state
      })
    },

    async flipPage(forward: boolean): Promise<RimeState> {
      return withMutex(async () => {
        return callJsonAsync('rime_wasm_flip_page', ['number'], [forward ? 0 : 1])
      })
    },

    async clearInput(): Promise<void> {
      return withMutex(async () => {
        if (destroyed || !loaded)
          return
        Module.ccall('rime_wasm_clear_input', null, [], [])
      })
    },

    async setOption(name: string, value: boolean): Promise<void> {
      return withMutex(async () => {
        if (destroyed || !loaded)
          return
        Module.ccall('rime_wasm_set_option', null, ['string', 'number'], [name, value ? 1 : 0])
      })
    },

    getDictVersion(): string | null {
      if (destroyed)
        return null
      return readVersionFile(Module)
    },

    whenReady(): Promise<void> {
      return loading.promise
    },

    /**
     * 将用户词典数据同步到 IndexedDB 持久化存储。
     *
     * 内部流程：
     *   sync_user_data（LevelDB → FS）
     *   → syncfs（FS → IndexedDB）
     *   → create_session（重建 session，因为 sync_user_data 会销毁 session）
     *
     * 同步期间其他操作通过互斥锁自动排队等待。
     * 推荐调用时机：输入框失去焦点时，或调用 destroy 前。
     */
    async syncData(): Promise<void> {
      return withMutex(async () => {
        if (destroyed)
          return
        Module.ccall('rime_wasm_sync_data', null, [], [])
        await syncfs(Module, false)
        const sid = Module.ccall('rime_wasm_create_session', 'number', [], []) as number
        if (!sid) {
          throw new Error('同步后重建 session 失败')
        }
      })
    },

    async destroy(): Promise<void> {
      if (destroyed)
        return
      destroyed = true
      loaded = false
      Module.ccall('rime_wasm_destroy', null, [], [])
      try {
        await syncfs(Module, false)
      } catch { /* ignore */ }
    },
  }

  return engine
}
