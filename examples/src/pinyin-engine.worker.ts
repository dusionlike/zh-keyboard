import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { expose } from 'comlink'

const pinyinEngine = new RimePinyinEngine({
  wasmDir: '/data',
})

expose(pinyinEngine)
