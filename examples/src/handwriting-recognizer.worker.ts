import { ZhkRecognizer } from '@zh-keyboard/recognizer'
import { expose } from 'comlink'

const handwritingRecognizer = new ZhkRecognizer({
  modelPath: new URL('../models/handwrite/model.json', globalThis.location.href).href,
  dictPath: new URL('../models/dict.txt', globalThis.location.href).href,
})

expose(handwritingRecognizer)
