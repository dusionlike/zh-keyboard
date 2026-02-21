import type { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/vue'
import { wrap } from 'comlink'
import { createApp } from 'vue'
import App from './App.vue'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: new URL('/models/handwrite/model.json', import.meta.url).href,
  dictPath: new URL('/models/dict.txt', import.meta.url).href,
}))

const pinyinEngineWorker = new Worker(new URL('./pinyin-engine.worker.ts', import.meta.url), { type: 'module' })
const pinyinEngine = wrap<RimePinyinEngine>(pinyinEngineWorker)

registerPinyinEngine(pinyinEngine)

createApp(App).mount('#app')
