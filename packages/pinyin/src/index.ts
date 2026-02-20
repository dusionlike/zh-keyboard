import type { PinyinEngine } from '@zh-keyboard/core'
import type { RimeState, RimeWasmOptions } from './types'
import { createRimeEngine } from './rime'

// RIME 专用类型（供高级用法使用）
export type { RimeCandidate, RimeEngine, RimeState, RimeWasmOptions } from './types'

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
    // 最多取20页
    while (!currentState.isLastPage && pagesFlipped < 20) {
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
    async processInput(fullPinyin: string) {
      const result = { candidates: [], segmentedPinyin: fullPinyin }
      if (!fullPinyin) {
        engine.clearInput()
        prevRimeInput = ''
        candidatePageMap = []
        return result
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

      return { candidates, segmentedPinyin: firstPageState.preeditBody }
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

    async clearInput() {
      engine.clearInput()
      prevRimeInput = ''
      candidatePageMap = []
    },

    async setSimplified(simplified: boolean) {
      engine.setOption('zh_simp', simplified)
    },

    async destroy() {
      engine.destroy()
      prevRimeInput = ''
      candidatePageMap = []
    },
  }

  return rimePinyinEngine
}
