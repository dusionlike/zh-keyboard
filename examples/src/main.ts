import type { HandwritingRecognizer } from '@zh-keyboard/core'
import type { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/vue'
import { wrap } from 'comlink'
import { createApp } from 'vue'
import App from './App.vue'

const handwritingRecognizerWorker = new Worker(new URL('./handwriting-recognizer.worker.ts', import.meta.url), { type: 'module' })
const remoteHandwritingRecognizer = wrap<HandwritingRecognizer>(handwritingRecognizerWorker)
registerHandwritingRecognizer(remoteHandwritingRecognizer)

const pinyinEngineWorker = new Worker(new URL('./pinyin-engine.worker.ts', import.meta.url), { type: 'module' })
const pinyinEngine = wrap<RimePinyinEngine>(pinyinEngineWorker)

registerPinyinEngine(pinyinEngine)

createApp(App).mount('#app')
