import { useEffect, useState } from 'react'
import { getHandwritingRecognizer } from './handwriting'

export function useHandwritingRecognizer(enableHandwriting = false) {
  const [recognizerInitialized, setRecognizerInitialized] = useState(false)

  useEffect(() => {
    async function initializeRecognizer() {
      const recognizer = getHandwritingRecognizer()
      if (recognizer) {
        try {
          setRecognizerInitialized(await recognizer.initialize())
        } catch (error) {
          console.error('初始化手写识别服务失败:', error)
          setRecognizerInitialized(false)
        }
      } else {
        console.warn('未注册手写识别服务')
        setRecognizerInitialized(false)
      }
    }

    async function closeRecognizer() {
      const recognizer = getHandwritingRecognizer()
      if (recognizer && recognizerInitialized) {
        try {
          await recognizer.close()
          setRecognizerInitialized(false)
        } catch (error) {
          console.error('关闭手写识别服务失败:', error)
        }
      }
    }

    if (enableHandwriting) {
      initializeRecognizer()
    }

    return () => {
      closeRecognizer()
    }
  }, [enableHandwriting, recognizerInitialized])

  return {
    recognizerInitialized,
  }
}
