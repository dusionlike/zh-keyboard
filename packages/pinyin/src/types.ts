export interface RimeCandidate {
  text: string
  comment: string
}

export interface RimeState {
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
  candidates: RimeCandidate[]
  /** 当前页码（从 0 开始）。 */
  pageNo: number
  /** 是否为候选的最后一页。 */
  isLastPage: boolean
  /** 高亮候选的索引。 */
  highlightedIndex: number
  /** 候选选择键的标签数组。 */
  selectLabels: string[]
}

export interface RimeEngine {
  /** 发送按键序列（例如 "nihao"）并返回更新后的状态。 */
  processInput(keys: string): RimeState
  /** 在当前页按索引选择候选并返回状态。 */
  pickCandidate(index: number): RimeState
  /** 翻页：向前或向后切换候选页（forward 为 true 表示下一页）。 */
  flipPage(forward: boolean): RimeState
  /** 清除当前组合（预编辑）文本。 */
  clearInput(): void
  /** 设置布尔型选项（例如 "ascii_mode"）。 */
  setOption(name: string, value: boolean): void
  /** 获取 librime 的版本字符串。 */
  getVersion(): string
  /** 关闭引擎并释放资源。 */
  destroy(): void
}

export interface RimeWasmOptions {
  /**
   * rime-api.js、rime-api.wasm 以及所有数据文件（YAML 配置 + 二进制词典）的 URL 或路径前缀。
   * 默认为当前目录。
   */
  wasmDir?: string
  /**
   * 启动时要获取并加载的数据文件名列表。
   * 文件会从 `wasmDir` 获取并在引擎初始化前写入虚拟文件系统的 `/rime/build/`。
   * 默认为 luna_pinyin 的 schema、词典文件以及配置 YAML。
   */
  dataFiles?: string[]
}
