import type { HandwritingRecognizer } from './handwriting'

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
