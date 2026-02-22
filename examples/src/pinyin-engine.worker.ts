import { RimePinyinEngine } from '@zh-keyboard/pinyin'
import { expose } from 'comlink'

const pinyinEngine = new RimePinyinEngine({
  wasmDir: import.meta.env.DEV ? '/data' : './data',
})

expose(pinyinEngine)
