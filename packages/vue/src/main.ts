import { registerHandwritingRecognizer, registerPinyinEngine, setKeyboardConfig } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { createApp } from 'vue'
import App from './App.vue'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: new URL('models/handwrite/model.json', document.baseURI).href,
  dictPath: new URL('models/dict.txt', document.baseURI).href,
}))

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
