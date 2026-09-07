import type { HandwritingRecognizer } from '@zh-keyboard/core'
import { registerHandwritingRecognizer, registerPinyinEngine, setKeyboardConfig } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { wrap } from 'comlink'
import { createApp } from 'vue'
import App from './App.vue'

const handwritingRecognizerWorker = new Worker(new URL('./handwriting-recognizer.worker.ts', import.meta.url), { type: 'module' })
const remoteHandwritingRecognizer = wrap<HandwritingRecognizer>(handwritingRecognizerWorker)
registerHandwritingRecognizer(remoteHandwritingRecognizer)

registerPinyinEngine(new RimePinyinEngine({
  wasmDir: new URL('data/', document.baseURI).href,
  dictVersion: '1.0.0',
}))

setKeyboardConfig({
  numKeys: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['back', '0', 'X'],
  ],
  floatMarginTop: 20,
})

createApp(App).mount('#app')
