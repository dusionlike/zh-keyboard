import type { App } from 'vue'
import ZhKeyboard from './components/ZhKeyboard.vue'

export {
  getHandwritingRecognizer,
  getKeyboardConfig,
  getPinyinEngine,
  registerHandwritingRecognizer,
  registerPinyinEngine,
  setKeyboardConfig,
} from '@zh-keyboard/core'

export { ZhKeyboard }

export default {
  install: (app: App) => {
    app.component('ZhKeyboard', ZhKeyboard)
  },
}
