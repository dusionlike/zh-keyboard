import type { RimeEngine, RimeState, RimeWasmOptions } from './types'

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
  const scriptUrl = `${wasmDir}/rime-api.js`

  // 加载 Emscripten 模块工厂
  const createRimeModule = (await import(scriptUrl)).default

  const Module: EmscriptenModule = await createRimeModule({
    locateFile(file: string) {
      return `${wasmDir}/${file}`
    },
  })

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
