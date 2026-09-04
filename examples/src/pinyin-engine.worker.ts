import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { expose } from 'comlink'

const pinyinEngine = new RimePinyinEngine({
  wasmDir: new URL('../data/', globalThis.location.href).href,
  dictVersion: '1.0.0',
})

expose(pinyinEngine)
