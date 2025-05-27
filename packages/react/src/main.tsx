import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { registerHandwritingRecognizer } from './utils/handwriting.ts'

registerHandwritingRecognizer(new ZhkRecognizer({
  modelPath: '/models/handwrite/model.json',
  dictPath: '/models/dict.txt',
}))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
