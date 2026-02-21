import type { PinyinEngine } from '@zh-keyboard/core'
import type { RimeEngine, RimeState, RimeWasmOptions } from './types'
import { createRimeEngine } from './rime'

export type PinyinState = RimeState

// 通用拼音引擎接口（从 core 中 re-export 以便直接从本包引用）
export type { PinyinEngine } from '@zh-keyboard/core'

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
export class RimePinyinEngine implements PinyinEngine {
  private engine: RimeEngine | null = null
  private prevRimeInput = ''

  constructor(private options: RimePinyinEngineOptions = {}) {}

  private async getEngine() {
    await this.initialize()
    return this.engine!
  }

  async initialize(): Promise<void> {
    if (this.engine)
      return // 已初始化
    this.engine = await createRimeEngine(this.options)
    this.engine.setOption('zh_simp', this.options.simplified ?? true)
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
      state = engine.processInput(delta)
    } else {
      // 删除或修改：清空后重新输入完整拼音
      engine.clearInput()
      state = engine.processInput(fullPinyin)
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

  async setSimplified(simplified: boolean) {
    const engine = await this.getEngine()
    return engine.setOption('zh_simp', simplified)
  }

  async destroy() {
    const engine = await this.getEngine()
    return engine.destroy()
  }
}
