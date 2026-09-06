export interface RimeCandidate {
  text: string
  comment: string
}

export interface RimeState {
  /** 已提交（确认）的文本，若无提交则为 null。 */
  committed: string | null
  /** 预编辑文本中光标前的部分。 */
  preeditHead: string
  /** 预编辑文本中当前选中的部分。 */
  preeditBody: string
  /** 预编辑文本中光标后的部分。 */
  preeditTail: string
  /** 预编辑文本中的光标位置。 */
  cursorPos: number
  /** 当前页的候选词列表。 */
  candidates: RimeCandidate[]
  /** 当前页码（从 0 开始）。 */
  pageNo: number
  /** 是否为候选词的最后一页。 */
  isLastPage: boolean
  /** 高亮候选项的索引。 */
  highlightedIndex: number
  /** 候选词选择键的标签。 */
  selectLabels: string[]
}

export interface RimeEngine {
  /** 发送按键序列（如 "nihao"）并获取更新后的状态。 */
  processInput(keys: string): Promise<RimeState>
  /** 按候选列表的绝对索引选择候选词。选词后自动持久化到 IndexedDB。 */
  pickCandidate(index: number): Promise<RimeState>
  /** 请求当前输入的全部候选词，不改变当前页。 */
  getAllCandidates(): Promise<RimeState>
  /** 清除当前输入。 */
  clearInput(): Promise<void>
  /** 设置布尔选项（如 "ascii_mode"、"zh_simp"）。 */
  setOption(name: string, value: boolean): Promise<void>
  /** 获取已缓存的词库版本号，无缓存则返回 null。 */
  getDictVersion(): string | null
  /** 等待引擎就绪（加载/初始化/同步完成后返回）。 */
  whenReady(): Promise<void>
  /**
   * 将用户词典数据同步到 IndexedDB 持久化存储。
   * 内部流程：LevelDB→sync_user_data（刷写到 FS）→syncfs（写入 IndexedDB）→重建 session。
   * 推荐调用时机：输入框失去焦点时、定时、或调用 destroy 前。
   */
  syncData(): Promise<void>
  /** 关闭引擎并释放资源。执行前会自动同步用户词典数据。 */
  destroy(): Promise<void>
}

export interface RimeWasmOptions {
  /** rime-api.js、rime-api.wasm 所在 URL 或路径前缀。默认为当前目录。 */
  wasmDir?: string
  /** 词库版本号。传入后自动比对 IndexedDB 缓存，版本一致则跳过下载直接加载缓存。 */
  dictVersion?: string
}
