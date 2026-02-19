import type { HandwritingRecognizer } from './handwriting'
import type { PinyinEngine } from './pinyin-engine'

/**
 * 键盘配置类型
 */
export interface KeyboardConfig {
  /**
   * 默认的键盘模式
   */
  defaultMode?: 'en' | 'zh' | 'hand' | 'num' | 'symbol'
  /**
   * 是否启用手写输入
   */
  enableHandwriting?: boolean
  /**
   * 键盘定位模式
   */
  position?: 'static' | 'float' | 'bottom'
  /**
   * 当没有input获得焦点时是否禁用键盘
   */
  disableWhenNoFocus?: boolean
  /**
   * 数字键盘的行配置
   */
  numKeys?: string[][]
  /**
   * RIME WASM 文件及数据文件的 URL 或路径前缀。
   * 用于默认 RIME 引擎加载（当未通过 registerPinyinEngine 注册自定义引擎时）。
   * @default '/rime'
   */
  wasmDir?: string
}

// 全局配置对象
let globalConfig: KeyboardConfig = {
  defaultMode: 'en',
  enableHandwriting: false,
  position: 'static',
  disableWhenNoFocus: true,
}

// 全局变量用于存储手写识别服务实例
let handwritingRecognizerInstance: HandwritingRecognizer | null = null

// 全局变量用于存储拼音引擎实例
let pinyinEngineInstance: PinyinEngine | null = null

/**
 * 获取全局键盘配置
 */
export function getKeyboardConfig(): KeyboardConfig {
  return globalConfig
}

/**
 * 设置全局键盘配置
 */
export function setKeyboardConfig(config: KeyboardConfig): void {
  globalConfig = {
    ...globalConfig,
    ...config,
  }
}

/**
 * 注册手写识别服务
 * @param recognizer 手写识别服务实现
 */
export function registerHandwritingRecognizer(recognizer: HandwritingRecognizer): void {
  handwritingRecognizerInstance = recognizer
}

/**
 * 获取手写识别服务实例
 * @returns 手写识别服务实例
 */
export function getHandwritingRecognizer(): HandwritingRecognizer | null {
  return handwritingRecognizerInstance
}

/**
 * 注册拼音引擎。
 * 注册后，CandidateBar 将使用此引擎而非默认的 RIME 引擎。
 * 适用于自定义引擎或 Worker 中运行的引擎。
 * @param engine 拼音引擎实现
 */
export function registerPinyinEngine(engine: PinyinEngine): void {
  pinyinEngineInstance = engine
}

/**
 * 获取已注册的拼音引擎实例
 * @returns 拼音引擎实例，未注册时返回 null
 */
export function getPinyinEngine(): PinyinEngine | null {
  return pinyinEngineInstance
}
