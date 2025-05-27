import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { createApp } from 'vue'
import App from './App.vue'
import { registerHandwritingRecognizer } from './utils/handwriting'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: '/models/handwrite/model.json',
  dictPath: '/models/dict.txt',
}))

createApp(App).mount('#app')
