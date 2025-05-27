import type { Table } from 'dexie'
import Dexie from 'dexie'
import pinyinDictJson from './dict/pinyin_dict_notone.json' with { type: 'json' }

const MAX_WEIGHT = 5 // 定义字符的最大权重

export interface PinyinCharEntry {
  id?: number // id 是可选的，因为它是自动递增的
  pinyin: string
  char: string
  weight: number
}

export class AdvancedPinyinEngine {
  private currentInput: string = ''
  private candidates: string[] = []
  private db: Dexie
  // 存储原始拼音字典用于查找（例如，查找 bestPinyinMatch）
  private pinyinDict: Record<string, string> = pinyinDictJson
  private pinyinCharTable: Table<PinyinCharEntry, number> // 主键类型是 number
  private initializationPromise: Promise<void>

  constructor() {
    this.db = new Dexie('PinyinCharDB') // 数据库名称更改
    this.db.version(1).stores({
      // ++id 用于自增主键
      // &[pinyin+char] 用于 pinyin 和 char 的复合唯一索引
      // pinyin, char, weight 也将被索引
      pinyinCharEntries: '++id, &[pinyin+char], pinyin, char, weight',
    })
    this.pinyinCharTable = this.db.table('pinyinCharEntries')
    this.initializationPromise = this.initializeDatabase()
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const count = await this.pinyinCharTable.count()
      if (count === 0) {
        const entries: PinyinCharEntry[] = []
        for (const [pinyin, charsStr] of Object.entries(this.pinyinDict)) {
          for (const char of charsStr.split('')) {
            // 由于 &[pinyin+char] 的存在，确保批量添加时不会尝试重复条目
            // 这种结构应该是没问题的，因为我们从源数据迭代唯一的 pinyin/char
            entries.push({ pinyin, char, weight: 1 })
          }
        }
        await this.pinyinCharTable.bulkAdd(entries)
      }
    } catch (error) {
      console.error('初始化 PinyinCharDB 失败:', error)
      throw error
    }
  }

  public async processInput(input: string): Promise<string[]> {
    await this.initializationPromise
    this.currentInput = input.toLowerCase()
    this.candidates = []

    if (!this.currentInput) {
      return []
    }

    const matchedEntriesList = await this.pinyinCharTable
      .where('pinyin')
      .startsWith(this.currentInput)
      .toArray()

    const getSortPriority = (entry: PinyinCharEntry, currentPinyin: string): number => {
      const isExactMatch = entry.pinyin === currentPinyin
      const hasCustomWeight = entry.weight > 1

      if (isExactMatch && hasCustomWeight) {
        return 1 // 完整拼音+权重
      }
      if (!isExactMatch && hasCustomWeight) {
        return 2 // 非完整拼音+权重
      }
      if (isExactMatch && !hasCustomWeight) {
        return 3 // 完整拼音+无权重 (默认权重为1)
      }
      if (!isExactMatch && !hasCustomWeight) {
        return 4 // 非完整拼音+无权重 (默认权重为1)
      }
      return 5
    }

    matchedEntriesList.sort((a, b) => {
      const priorityA = getSortPriority(a, this.currentInput)
      const priorityB = getSortPriority(b, this.currentInput)

      if (priorityA !== priorityB) {
        return priorityA - priorityB // 优先级数字小的在前
      }

      // 如果优先级相同，则按权重降序排序
      if (b.weight !== a.weight) {
        return b.weight - a.weight
      }

      // 如果权重也相同，则按 ID 升序排序以保证稳定性
      return a.id! - b.id!
    })

    this.candidates = matchedEntriesList.map(entry => entry.char)
    this.candidates = [...new Set(this.candidates)] // 去重

    return this.candidates
  }

  public async selectCandidate(selectedChar: string) {
    await this.initializationPromise
    if (!this.currentInput)
      return // 没有关联字符的输入

    let bestPinyinMatch = this.currentInput
    // 根据当前输入为所选字符找到最具体的拼音
    for (const pinyinKey of Object.keys(this.pinyinDict)) {
      if (
        pinyinKey.startsWith(this.currentInput)
        && this.pinyinDict[pinyinKey].includes(selectedChar)
      ) {
        if (
          pinyinKey.length > bestPinyinMatch.length
          || pinyinKey === this.currentInput // 如果是完整拼音，则优先考虑当前输入的精确匹配
        ) {
          bestPinyinMatch = pinyinKey
          // 如果 currentInput 本身是一个完整的拼音并且包含该字符，则它是一个强有力的候选者。
          if (this.pinyinDict[this.currentInput]?.includes(selectedChar) && this.currentInput === pinyinKey) {
            break
          }
        } else if (bestPinyinMatch === this.currentInput && this.pinyinDict[pinyinKey]?.includes(selectedChar)) {
          // 如果 bestPinyinMatch 仍然是部分输入，则取第一个更长的匹配项
          bestPinyinMatch = pinyinKey
        }
      }
    }

    // 从字典的角度确保 bestPinyinMatch 确实包含 selectedChar
    // 这处理了 currentInput 可能不明确或太短的情况。
    if (!this.pinyinDict[bestPinyinMatch]?.includes(selectedChar)) {
      // 回退：如果当前逻辑失败，则再次迭代以查找 selectedChar 的任何拼音。
      // 这是一个安全措施，理想情况下，上面的循环会找到正确的那个。
      for (const pinyinKey of Object.keys(this.pinyinDict)) {
        if (this.pinyinDict[pinyinKey].includes(selectedChar)) {
          if (pinyinKey.startsWith(this.currentInput)) { // 优先选择以当前输入开头的
            bestPinyinMatch = pinyinKey
            break
          }
          if (bestPinyinMatch === this.currentInput) { // 如果当前最佳匹配只是输入本身，则更新
            bestPinyinMatch = pinyinKey
          }
        }
      }
    }

    const existingEntry = await this.pinyinCharTable
      .where({ pinyin: bestPinyinMatch, char: selectedChar })
      .first()

    if (existingEntry && existingEntry.id !== undefined) {
      const newWeight = Math.min((existingEntry.weight || 0) + 1, MAX_WEIGHT)
      await this.pinyinCharTable.update(existingEntry.id, { weight: newWeight })
    } else {
      // 如果字符/拼音组合不存在（例如，学习了新字符或 bestPinyinMatch 出错）
      // 以权重 1 添加它。这假设 bestPinyinMatch 是有效的。
      // 如果没有找到完整的拼音，bestPinyinMatch 可能是部分输入。
      // 使用部分拼音存储可能不是理想的。
      // 为了稳健性，仅当 bestPinyinMatch 是 pinyinDict 中的已知键时才添加。
      if (this.pinyinDict[bestPinyinMatch]) {
        await this.pinyinCharTable.add({ pinyin: bestPinyinMatch, char: selectedChar, weight: 1 })
      } else {
        console.warn(`无法为 ${selectedChar} 添加条目，拼音 ${bestPinyinMatch} 不在字典中。`)
      }
    }

    this.clear()
  }

  public clear(): void {
    this.currentInput = ''
    this.candidates = []
  }

  public getCurrentInput(): string {
    return this.currentInput
  }

  public getCandidates(): string[] {
    return this.candidates
  }
}
