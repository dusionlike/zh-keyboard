import { registerHandwritingRecognizer, registerPinyinEngine, setKeyboardConfig } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { createApp } from 'vue'
import App from './App.vue'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: '/models/handwrite/model.json',
  dictPath: '/models/dict.txt',
}))

registerPinyinEngine(new RimePinyinEngine({
  wasmDir: '/data',
}))

setKeyboardConfig({
  numKeys: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['back', '0', 'X'],
  ],
})

createApp(App).mount('#app')
