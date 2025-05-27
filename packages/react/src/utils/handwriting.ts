import type { HandwritingRecognizer } from '@zh-keyboard/core'

// 全局变量用于存储手写识别服务实例
let handwritingRecognizerInstance: HandwritingRecognizer | null = null

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
