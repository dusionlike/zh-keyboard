export interface PinyinResult {
  /**
   * 候选列表
   */
  candidates: string[]
  /**
   * 分词后的拼音字符串，每个拼音之间用空格分隔
   */
  segmentedPinyin: string
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
   * @returns 包含候选词列表和分词信息的结果对象
   */
  processInput(pinyin: string): Promise<PinyinResult>

  /**
   * 按全局索引选择候选词，返回已提交的文本。
   * @param index 候选词在全量列表中的全局索引（从0开始）
   * @returns 提交的文本字符串；无提交内容则返回 null
   */
  pickCandidate(index: number): Promise<string | null>

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
