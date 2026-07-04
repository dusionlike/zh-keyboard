import type { PinyinEngine } from '@zh-keyboard/core'
import type { RimeEngine, RimeState, RimeWasmOptions } from './types'
import { createRimeEngine } from './rime'

export type PinyinState = RimeState

// 通用拼音引擎接口（从 core 中 re-export 以便直接从本包引用）
export type { PinyinEngine } from '@zh-keyboard/core'

export interface RimePinyinEngineOptions extends RimeWasmOptions {
}

/**
 * 创建基于 RIME WASM 的拼音引擎，实现 PinyinEngine 通用接口。
 * 内部处理分页逻辑，processInput 返回所有页的候选词集合。
 *
 * 注意：词库已直接使用简体中文，不再依赖 OpenCC 繁简转换。
 */
export class RimePinyinEngine implements PinyinEngine {
  private engine: RimeEngine | null = null
  private prevRimeInput = ''

  private initPromise: Promise<void> | null = null

  constructor(private options: RimePinyinEngineOptions = {}) {
    this.initialize()
  }

  private async getEngine() {
    await this.initialize()
    return this.engine!
  }

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise
    }
    this.initPromise = (async () => {
      this.engine = await createRimeEngine(this.options)
    })()
    return this.initPromise
  }

  /**
   * 等待引擎初始化完成。
   * UI 层可用此方法控制加载状态：先显示 loading，await 此方法后隐藏 loading。
   */
  async whenReady(): Promise<void> {
    const engine = await this.getEngine()
    await engine.whenReady()
  }

  async processInput(fullPinyin: string) {
    const engine = await this.getEngine()
    if (!fullPinyin) {
      engine.clearInput()
      this.prevRimeInput = ''
      return null
    }

    let state: RimeState

    if (fullPinyin.startsWith(this.prevRimeInput)) {
      // 增量输入：只发送新增部分
      const delta = fullPinyin.slice(this.prevRimeInput.length)
      state = await engine.processInput(delta)
    } else {
      // 删除或修改：清空后重新输入完整拼音
      engine.clearInput()
      state = await engine.processInput(fullPinyin)
    }

    this.prevRimeInput = fullPinyin

    return state
  }

  async pickCandidate(index: number) {
    const engine = await this.getEngine()
    return engine.pickCandidate(index)
  }

  async clearInput() {
    const engine = await this.getEngine()
    return engine.clearInput()
  }

  /**
   * 将用户词典数据持久化到 IndexedDB。
   */
  async syncData() {
    const engine = await this.getEngine()
    return engine.syncData()
  }

  async destroy() {
    const engine = await this.getEngine()
    return engine.destroy()
  }
}
