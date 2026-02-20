export interface Candidate {
  text: string
  comment: string
}

export interface PinyinState {
  /** 已提交（最终）文本；若无提交则为 null。 */
  committed: string | null
  /** 选区前的预编辑文本。 */
  preeditHead: string
  /** 当前被选中的预编辑部分。 */
  preeditBody: string
  /** 选区后的预编辑文本。 */
  preeditTail: string
  /** 预编辑中的光标位置。 */
  cursorPos: number
  /** 当前页的候选项列表。 */
  candidates: Candidate[]
  /** 当前页码（从 0 开始）。 */
  pageNo: number
  /** 是否为候选的最后一页。 */
  isLastPage: boolean
  /** 高亮候选的索引。 */
  highlightedIndex: number
  /** 候选选择键的标签数组。 */
  selectLabels: string[]
}
/**
 * 拼音引擎通用接口
 * 所有拼音引擎实现必须遵循此接口
 */
export interface PinyinEngine {
  /**
   * 处理完整的拼音输入串，返回所有候选词列表（跨所有页）。
   * 引擎内部负责增量 vs 重置的优化，调用方只传完整拼音。
   * @param pinyin 完整的拼音字符串
   * @returns 候选词状态，包括所有页的候选词集合和分页信息
   */
  processInput(pinyin: string): Promise<PinyinState | null>

  /**
   * 按全局索引选择候选词，返回已提交的文本。
   * @param index 候选词在全量列表中的全局索引（从0开始）
   * @returns 候选词状态，包括所有页的候选词集合和分页信息
   */
  pickCandidate(index: number): Promise<PinyinState>

  /**
   * 清除引擎当前的预编辑输入状态
   */
  clearInput(): Promise<void>

  /**
   * 切换简体/繁体输出（可选，引擎不支持时忽略）
   * @param simplified true 为简体，false 为繁体
   */
  setSimplified?(simplified: boolean): Promise<void>

  /**
   * 销毁引擎，释放所有持有的资源
   */
  destroy(): Promise<void>
}
