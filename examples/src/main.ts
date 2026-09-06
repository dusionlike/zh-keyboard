import type { HandwritingRecognizer, RecognizerInitOptions } from '@zh-keyboard/core'
import type { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/vue'
import { wrap } from 'comlink'
import { createApp } from 'vue'
import App from './App.vue'

const handwritingRecognizerWorker = new Worker(new URL('./handwriting-recognizer.worker.ts', import.meta.url), { type: 'module' })
const remoteHandwritingRecognizer = wrap<HandwritingRecognizer>(handwritingRecognizerWorker)
const handwritingRecognizer: HandwritingRecognizer = {
  initialize(options?: RecognizerInitOptions) {
    const { onProgress: progressCallback, ...workerOptions } = options ?? {}
    progressCallback?.(0)
    return remoteHandwritingRecognizer.initialize(options ? workerOptions : undefined).then((initialized) => {
      progressCallback?.(1)
      return initialized
    })
  },
  recognize(strokeData) {
    return remoteHandwritingRecognizer.recognize(strokeData)
  },
  close() {
    return remoteHandwritingRecognizer.close()
  },
}

registerHandwritingRecognizer(handwritingRecognizer)

const pinyinEngineWorker = new Worker(new URL('./pinyin-engine.worker.ts', import.meta.url), { type: 'module' })
const pinyinEngine = wrap<RimePinyinEngine>(pinyinEngineWorker)

registerPinyinEngine(pinyinEngine)

createApp(App).mount('#app')
