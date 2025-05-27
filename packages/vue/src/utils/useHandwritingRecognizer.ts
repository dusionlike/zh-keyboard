import { onMounted, onUnmounted, ref } from 'vue'
import { getHandwritingRecognizer } from '../utils/handwriting'

export function useHandwritingRecognizer(enableHandwriting = false) {
  // 是否初始化了手写识别服务
  const recognizerInitialized = ref(false)

  /**
   * 初始化手写识别服务
   */
  async function initializeRecognizer() {
    const recognizer = getHandwritingRecognizer()
    if (recognizer) {
      try {
        recognizerInitialized.value = await recognizer.initialize()
      } catch (error) {
        console.error('初始化手写识别服务失败:', error)
        recognizerInitialized.value = false
      }
    } else {
      console.warn('未注册手写识别服务')
      recognizerInitialized.value = false
    }
  }

  /**
   * 关闭手写识别服务
   */
  async function closeRecognizer() {
    const recognizer = getHandwritingRecognizer()
    if (recognizer && recognizerInitialized.value) {
      try {
        await recognizer.close()
        recognizerInitialized.value = false
      } catch (error) {
        console.error('关闭手写识别服务失败:', error)
      }
    }
  }

  // 封装生命周期钩子
  onMounted(() => {
    if (enableHandwriting) {
      initializeRecognizer()
    }
  })

  onUnmounted(() => {
    closeRecognizer()
  })

  return {
    recognizerInitialized,
  }
}
