import type { HandwritingRecognizer, RecognizerInitOptions } from '@zh-keyboard/core'
import { registerHandwritingRecognizer, registerPinyinEngine } from '@zh-keyboard/core'
import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { wrap } from 'comlink'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const handwritingRecognizerWorker = new Worker(new URL('./handwriting-recognizer.worker.ts', import.meta.url), { type: 'module' })
const remoteHandwritingRecognizer = wrap<HandwritingRecognizer>(handwritingRecognizerWorker)
const handwritingRecognizer: HandwritingRecognizer = {
  initialize(options?: RecognizerInitOptions) {
    const { onProgress: progressCallback, ...workerOptions } = options ?? {}
    progressCallback?.(0)
    return remoteHandwritingRecognizer.initialize(options ? workerOptions : undefined).then((initialized) => {
      progressCallback?.(1)
      return initialized
    })
  },
  recognize(strokeData) {
    return remoteHandwritingRecognizer.recognize(strokeData)
  },
  close() {
    return remoteHandwritingRecognizer.close()
  },
}

registerHandwritingRecognizer(handwritingRecognizer)

registerPinyinEngine(new RimePinyinEngine({
  wasmDir: new URL('data/', document.baseURI).href,
  dictVersion: '1.0.0',
}))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
