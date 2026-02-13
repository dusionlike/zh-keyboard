import { registerHandwritingRecognizer, setKeyboardConfig } from '@zh-keyboard/core'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { createApp } from 'vue'
import App from './App.vue'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: '/models/handwrite/model.json',
  dictPath: '/models/dict.txt',
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
