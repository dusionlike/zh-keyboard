import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { expose } from 'comlink'

const pinyinEngine = new RimePinyinEngine({
  wasmDir: new URL('/data/rime-api.wasm', import.meta.url).href.replace(/rime-api\.wasm$/, ''),
  dictVersion: '1.0.0',
})

expose(pinyinEngine)
