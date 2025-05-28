import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { registerHandwritingRecognizer } from '@zh-keyboard/vue'
import { createApp } from 'vue'
import App from './App.vue'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: new URL('/models/handwrite/model.json', import.meta.url).href,
  dictPath: new URL('/models/dict.txt', import.meta.url).href,
}))

createApp(App).mount('#app')
