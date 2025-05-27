# zh-keyboard | 中文虚拟键盘组件库

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

一个现代化的中文虚拟键盘组件库，支持拼音输入法和手写输入，为Web应用提供流畅的中文输入体验。支持多种前端框架，目前已实现Vue和React组件。

## 功能特点

- 🔌 即插即用，自动绑定输入框
- ✨ 支持拼音输入，带候选词选择功能
- ✏️ 支持手写输入识别，支持连笔和简写
- 🔧 可自定义手写识别算法
- 📏 键盘大小可自定义缩放，灵活适配各种界面布局
- 🌐 纯前端实现，可作为静态网页部署，无需服务端支持
- 🔌 支持Vue和React框架，可在不同前端项目中使用

## 未来计划

| 序号 | 功能 | 状态 |
| --- | --- | --- |
| 1 | 拼音输入分词功能 | 📅 |
| 2 | React框架支持 | ✅ |

## 快速开始

这里提供简要的安装和使用指引，更详细的使用方法请参阅各组件的文档。

### Vue组件

```bash
# 安装Vue组件库
npm install @zh-keyboard/vue
```

详细使用方法请参阅 [Vue组件文档](packages/vue/README.md)。

### React组件

```bash
# 安装React组件库
npm install @zh-keyboard/react
```

详细使用方法请参阅 [React组件文档](packages/react/README.md)。

## 组件和模块

zh-keyboard 项目由以下几个主要组件和模块组成：

### 拼音输入

支持单字拼音输入，提供中英文切换和模糊拼音匹配等功能。

> 注：目前仅支持单个汉字的拼音输入，连续词组输入功能正在开发中（见未来计划）

详细使用方法请参阅 [Vue组件文档](packages/vue/README.md#拼音输入模式-zh)。

### 手写输入

基于机器学习模型的手写汉字识别功能，支持连笔和简写。

详细信息请参阅：
- [手写识别模块文档](packages/recognizer/README.md)（基础识别功能）
- [Vue组件手写输入文档](packages/vue/README.md#手写输入模式-hand)（Vue组件使用方法）
- [React组件手写输入文档](packages/react/README.md#手写输入模式-hand)（React组件使用方法）
