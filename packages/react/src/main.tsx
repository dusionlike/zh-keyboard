import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: '/models/handwrite/model.json',
  dictPath: '/models/dict.txt',
}))

registerPinyinEngine(new RimePinyinEngine({
  wasmDir: '/data',
  dictVersion: '1.0.0',
}))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
