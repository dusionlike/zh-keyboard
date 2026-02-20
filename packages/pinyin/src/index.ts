import type { PinyinEngine } from '@zh-keyboard/core'
import type { RimeState, RimeWasmOptions } from './types'
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
export async function createRimePinyinEngine(
  options: RimePinyinEngineOptions = {},
): Promise<PinyinEngine> {
  const engine = await createRimeEngine(options)

  // 初始化时设置简繁体选项（默认简体）
  engine.setOption('zh_simp', options.simplified ?? true)

  // 记录上次发送给底层 RIME 的实际输入（用于增量优化）
  let prevRimeInput = ''

  const rimePinyinEngine: PinyinEngine = {
    async processInput(fullPinyin: string) {
      if (!fullPinyin) {
        engine.clearInput()
        prevRimeInput = ''
        return null
      }

      let state: RimeState

      if (fullPinyin.startsWith(prevRimeInput)) {
        // 增量输入：只发送新增部分
        const delta = fullPinyin.slice(prevRimeInput.length)
        state = engine.processInput(delta)
      } else {
        // 删除或修改：清空后重新输入完整拼音
        engine.clearInput()
        state = engine.processInput(fullPinyin)
      }

      prevRimeInput = fullPinyin

      return state
    },

    async pickCandidate(index: number) {
      return engine.pickCandidate(index)
    },

    async clearInput() {
      return engine.clearInput()
    },

    async setSimplified(simplified: boolean) {
      return engine.setOption('zh_simp', simplified)
    },

    async destroy() {
      return engine.destroy()
    },
  }

  return rimePinyinEngine
}
