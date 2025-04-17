import pingyin from './dict/pinyin_dict_notone.json' with { type: 'json' }

/**
 * 简单拼音输入法引擎
 */
export class SimplePinyinEngine {
  private currentInput: string = ''
  private candidates: string[] = []

  // 简化的拼音映射表
  private pinyinMap: Record<string, string> = pingyin

  /**
   * 处理拼音输入
   * @param input 用户输入的拼音
   * @returns 候选词列表
   */
  public processInput(input: string): string[] {
    this.currentInput = input.toLowerCase()

    // 清空候选词
    this.candidates = []

    if (this.currentInput) {
      // 查找匹配的拼音
      const matchedWords = this.pinyinMap[this.currentInput] || ''

      // 将匹配的字转换为候选词
      this.candidates = matchedWords.split('')
    }

    return this.candidates
  }

  /**
   * 清空当前输入
   */
  public clear(): void {
    this.currentInput = ''
    this.candidates = []
  }

  /**
   * 获取当前输入码
   */
  public getCurrentInput(): string {
    return this.currentInput
  }

  /**
   * 获取当前候选词列表
   */
  public getCandidates(): string[] {
    return this.candidates
  }

  /**
   * 选择候选词
   * @param index 候选词索引
   * @returns 选中的候选词
   */
  public selectCandidate(index: number): string | null {
    if (index >= 0 && index < this.candidates.length) {
      const selected = this.candidates[index]
      this.clear()
      return selected
    }
    return null
  }
}
