# 中文键盘组件库

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

这是一个Vue 3的中文键盘组件库，支持拼音输入和手写输入。

## 功能特点

- 🔌 即插即用，自动绑定输入框
- ✨ 支持拼音输入，带候选词选择功能
- ✏️ 支持手写输入识别，支持连笔和简写
- 🔧 可自定义手写识别算法
- 📏 键盘大小可自定义缩放，灵活适配各种界面布局
- 🌐 纯前端实现，可作为静态网页部署，无需服务端支持
- 🔌 目前支持Vue框架，React框架支持正在开发中

## 安装

```bash
npm install @zh-keyboard/vue
# 或者
yarn add @zh-keyboard/vue
# 或者
pnpm add @zh-keyboard/vue
```

## 属性

### Props

| 属性名           | 类型                              | 默认值    | 说明                                |
| --------------- | --------------------------------- | -------- | ---------------------------------- |
| defaultMode     | 'en' \| 'zh' \| 'hand' \| 'num'  | 'en'     | 默认的键盘模式                      |
| enableHandwriting| boolean                          | false    | 是否启用手写输入                    |
| position        | 'static' \| 'float' \| 'bottom'  | 'static' | 键盘定位模式                       |

### 事件

| 事件名 | 参数类型 | 说明 |
| ------ | -------- | ---- |
| key    | KeyEvent | 当用户在键盘上点击按键时触发 |

## 基本使用

- 为了防止移动端设备弹出系统默认的键盘，建议在输入框上设置 `inputmode="none"` 属性。
- 此外，可以通过在输入框上设置 `data-inputmode` 属性来指定组件默认打开的键盘类型 (可选值为 `'en'`, `'zh'`, `'hand'`, `'num'`)，具体键盘模式的说明请参考 `defaultMode` 属性。

```vue
<script setup>
import { ZhKeyboard } from '@zh-keyboard/vue'
import { ref } from 'vue'

const inputText = ref('')
</script>

<template>
  <div>
    <input v-model="inputText" data-inputmode="en" inputmode="none" placeholder="点击使用键盘输入" />
    <!-- 静态定位的键盘 -->
    <ZhKeyboard v-model="inputText" />

    <!-- 浮动定位的键盘（跟随输入框） -->
    <ZhKeyboard v-model="inputText" position="float" />

    <!-- 底部固定的键盘 -->
    <ZhKeyboard v-model="inputText" position="bottom" />

    <!-- 启用手写输入的键盘 -->
    <ZhKeyboard v-model="inputText" :enable-handwriting="true" />

    <!-- 数字键盘 -->
    <ZhKeyboard v-model="inputText" default-mode="num" />
  </div>
</template>
```

## 输入模式

### 拼音输入模式 (zh)

拼音输入模式支持单字拼音输入，具有以下特性：

- 支持单字模糊拼音匹配
- 使用内置词库进行单字匹配
- 支持中英文快速切换

> 注：目前仅支持单个汉字的拼音输入，连续词组输入功能正在开发中

### 英文输入模式 (en)

标准的英文键盘布局，支持英文字母、数字和常用符号的输入。

### 手写输入模式 (hand)

手写输入模式允许用户通过手写输入汉字，启用此模式需要设置 `enableHandwriting` 为 `true`。

### 数字输入模式 (num)

数字输入模式提供一个数字和小数点键盘，方便用户输入数字、金额等。

## 手写识别

组件库支持自定义手写识别服务。您可以注册自己的手写识别服务来处理用户的手写输入。

### 手写识别接口

手写识别服务需要实现以下接口：

```typescript
interface HandwritingRecognizer {
  /**
   * 初始化手写识别服务
   * @returns 返回是否初始化成功
   */
  initialize(): Promise<boolean>

  /**
   * 识别手写笔迹
   * @param strokeData 笔迹数据，格式为 x y c x y c ...，其中x和y是坐标，c表示是否为笔画的最后一点(1表示是，0表示否)
   * @returns 识别结果列表
   */
  recognize(strokeData: number[]): Promise<string[]>

  /**
   * 关闭手写识别服务
   */
  close(): Promise<void>
}
```

### 笔迹数据格式

笔迹数据以数组形式存储，格式为 `[x1, y1, c1, x2, y2, c2, ...]`，其中：
- `x`、`y` 是坐标点
- `c` 表示是否为笔画的最后一点：1表示是最后一点，0表示不是

例如，一个简单的笔画可能是：`[100, 150, 0, 101, 151, 0, 102, 152, 1]`，表示三个点的笔画，最后一个点是笔画的结束点。

### 注册手写识别服务

```typescript
import { registerHandwritingRecognizer } from 'zh-keyboard'
import { MyHandwritingRecognizer } from './MyHandwritingRecognizer'

// 创建并注册您的手写识别服务
const recognizer = new MyHandwritingRecognizer()
registerHandwritingRecognizer(recognizer)
```

### 示例实现

以下是一个简单的手写识别服务示例实现：

```typescript
import type { HandwritingRecognizer } from 'zh-keyboard'

export class MyHandwritingRecognizer implements HandwritingRecognizer {
  private initialized = false

  async initialize(): Promise<boolean> {
    console.log('初始化手写识别服务...')
    // 在实际应用中，这里可能需要加载模型或连接到服务器
    this.initialized = true
    return true
  }

  async recognize(strokeData: number[]): Promise<string[]> {
    if (!this.initialized) {
      throw new Error('手写识别服务未初始化')
    }

    console.log('识别笔迹数据:', strokeData)

    // 这里调用您的手写识别API
    // 返回识别结果
    return ['你', '我', '他', '好', '的']
  }

  async close(): Promise<void> {
    console.log('关闭手写识别服务')
    this.initialized = false
  }
}
```

## 生命周期

1. 当手写输入组件挂载时，会自动调用手写识别服务的 `initialize()` 方法
2. 当用户完成一个笔画时，会调用 `recognize()` 方法进行识别
3. 当手写输入组件卸载时，会调用 `close()` 方法关闭手写识别服务
