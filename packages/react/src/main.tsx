import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: new URL('models/handwrite/model.json', document.baseURI).href,
  dictPath: new URL('models/dict.txt', document.baseURI).href,
}))

registerPinyinEngine(new RimePinyinEngine({
  wasmDir: new URL('data/', document.baseURI).href,
  dictVersion: '1.0.0',
}))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
