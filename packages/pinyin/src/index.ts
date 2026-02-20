// 推荐使用：基于 RIME WASM 的 PinyinEngine 高级封装
export { createRimePinyinEngine, type RimePinyinEngineOptions } from './rime'

// 低级 RIME 引擎工厂（供高级或自定义用途）
export { createRimeEngine } from './rime'

// RIME 专用类型（供高级用法使用）
export type { RimeCandidate, RimeEngine, RimeState, RimeWasmOptions } from './types'

// 通用拼音引擎接口（从 core 中 re-export 以便直接从本包引用）
export type { PinyinEngine } from '@zh-keyboard/core'
