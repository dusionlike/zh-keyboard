# zh-keyboard | 中文虚拟键盘组件库

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

一个现代化的中文虚拟键盘组件库，支持拼音输入法和手写输入，为Web应用提供流畅的中文输入体验。支持多种前端框架，目前已实现Vue和React组件。

## 🌐 在线预览

| 预览地址 | 描述 |
| --- | --- |
| [预览地址1](https://dusionlike.github.io/zh-keyboard/) | 组件库在线演示 |
| [预览地址2](https://zh-keyboard.web.app/) | 地址1失效时访问这个 |

## 📦 项目结构

| 包名 | 版本 | 描述 |
| --- | --- | --- |
| [@zh-keyboard/vue](packages/vue) | [![npm](https://img.shields.io/npm/v/@zh-keyboard/vue.svg)](https://www.npmjs.com/package/@zh-keyboard/vue) | Vue 组件库 |
| [@zh-keyboard/react](packages/react) | [![npm](https://img.shields.io/npm/v/@zh-keyboard/react.svg)](https://www.npmjs.com/package/@zh-keyboard/react) | React 组件库 |
| [@zh-keyboard/core](packages/core) | [![npm](https://img.shields.io/npm/v/@zh-keyboard/core.svg)](https://www.npmjs.com/package/@zh-keyboard/core) | 核心功能包 |
| [@zh-keyboard/pinyin](packages/pinyin) | [![npm](https://img.shields.io/npm/v/@zh-keyboard/pinyin.svg)](https://www.npmjs.com/package/@zh-keyboard/pinyin) | 拼音引擎（基于 RIME WASM） |
| [@zh-keyboard/recognizer](packages/recognizer) | [![npm](https://img.shields.io/npm/v/@zh-keyboard/recognizer.svg)](https://www.npmjs.com/package/@zh-keyboard/recognizer) | 手写识别器 |

## ✨ 功能特点

- 🔌 即插即用，自动绑定输入框
- ✨ 支持拼音输入，带候选词选择功能
- ✏️ 支持手写输入识别，支持连笔和简写
- 🔧 可自定义手写识别算法
- 📏 键盘大小可自定义缩放，灵活适配各种界面布局
- 🌐 纯前端实现，可作为静态网页部署，无需服务端支持
- 🔌 支持Vue和React框架，可在不同前端项目中使用

## 🚀 未来计划

| 序号 | 功能 | 状态 |
| --- | --- | --- |
| 1 | 拼音输入分词功能 | ✅ |
| 2 | React框架支持 | ✅ |

## 🔧 快速开始

这里提供简要的安装和使用指引，更详细的使用方法请参阅各组件的文档。

### Vue组件

```bash
# 安装Vue组件库
npm install @zh-keyboard/vue
```

详细使用方法请参阅 [Vue组件文档](packages/vue/README.md)。

### 全局配置 (Global Config)

无论使用 Vue 还是 React，你都可以通过 `@zh-keyboard/core` 或直接从组件库包中导出 `setKeyboardConfig` 来设置全局默认值。

```typescript
import { setKeyboardConfig } from '@zh-keyboard/core'

setKeyboardConfig({
  defaultMode: 'zh',
  enableHandwriting: true,
  position: 'float',
  wasmDir: '/rime', // RIME WASM 文件路径前缀（默认 '/rime'）
  // ... 其他配置
})
```

在 Vue 中，你也可以在插件安装时配置：

```typescript
import ZhKeyboardPlugin from '@zh-keyboard/vue'

app.use(ZhKeyboardPlugin, {
  defaultMode: 'zh',
  enableHandwriting: true
})
```

### React组件

```bash
# 安装React组件库
npm install @zh-keyboard/react
```

详细使用方法请参阅 [React组件文档](packages/react/README.md)。

## 🧩 组件和模块

zh-keyboard 项目由以下几个主要组件和模块组成：

### 拼音输入

基于 RIME 输入法引擎（WASM 版本），支持词语分词、多候选词显示、简繁切换等功能。

#### 加载 RIME 引擎

拼音引擎需要加载 WASM 文件和词典数据文件。在全局配置中设置 `wasmDir`，指向静态资源服务器上的路径：

```typescript
import { setKeyboardConfig } from '@zh-keyboard/vue' // 或 @zh-keyboard/react

setKeyboardConfig({
  wasmDir: '/rime', // 对应 public/rime/ 目录下的 WASM 及数据文件
})
```

需要将 `@zh-keyboard/pinyin` 包中 `data/` 目录的以下文件发布到你的静态资源路径：

- `rime-api.wasm` — RIME 引擎本体
- `default.yaml` — 默认配置
- `luna_pinyin.schema.yaml` — 拼音方案
- `luna_pinyin.table.bin` / `luna_pinyin.prism.bin` / `luna_pinyin.reverse.bin` — 词典文件

#### 自定义拼音引擎

通过 `registerPinyinEngine` 注册自定义引擎，可替换默认的 RIME 引擎，或使用 Worker 避免阻塞主线程：

```typescript
import type { PinyinEngine } from '@zh-keyboard/core'
import { registerPinyinEngine } from '@zh-keyboard/vue' // 或 @zh-keyboard/react

// 自定义引擎示例（实现 PinyinEngine 接口）
const myEngine: PinyinEngine = {
  async processInput(pinyin: string): Promise<string[]> {
    // 返回所有候选词列表
    return []
  },
  async pickCandidate(index: number): Promise<string | null> {
    // 选择候选词，返回提交的文本
    return null
  },
  clearInput() {},
  setSimplified(simplified: boolean) {}, // 可选：简繁切换
  destroy() {},
}

registerPinyinEngine(myEngine)
```

也可以使用 Worker 封装 RIME 引擎（通过 [Comlink](https://github.com/GoogleChromeLabs/comlink) 等库），只需确保实现 `PinyinEngine` 接口后注册即可。

### 手写输入

基于机器学习模型的手写汉字识别功能，支持连笔和简写。

详细信息请参阅：
- [手写识别模块文档](packages/recognizer/README.md)（基础识别功能）
- [Vue组件手写输入文档](packages/vue/README.md#手写输入模式-hand)（Vue组件使用方法）
- [React组件手写输入文档](packages/react/README.md#手写输入模式-hand)（React组件使用方法）
