import type { App } from 'vue'
import ZhKeyboard from './components/ZhKeyboard.vue'

export * from './utils/handwriting'

export { ZhKeyboard }

export default {
  install: (app: App) => {
    app.component('ZhKeyboard', ZhKeyboard)
  },
}
