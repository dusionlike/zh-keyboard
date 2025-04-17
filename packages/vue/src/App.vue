<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ZhKeyboard from './components/ZhKeyboard.vue'

const inputValue = ref('')
const inputValueZh = ref('')
const inputValueHand = ref('')
const inputValueNum = ref('')
const keyboardWidth = ref(400)
const keyboardHeight = ref(300)
const position = ref<'static' | 'float' | 'bottom'>('float')
const disableWhenNoFocus = ref(true)

const positionHints = {
  static: '键盘固定在页面中',
  float: '键盘将在点击输入框时显示',
  bottom: '键盘固定在屏幕底部',
}

onMounted(() => {
  if (window.innerWidth < 960) {
    position.value = 'bottom'
  }
})
</script>

<template>
  <div class="root-container">
    <div class="container">
      <div class="header">
        <h1>中文虚拟键盘测试</h1>
      </div>

      <div class="input-grid">
        <div class="input-container">
          <label>英文输入:</label>
          <input v-model="inputValue" type="text" data-inputmode="en" inputmode="none" placeholder="点击这里使用英文输入" />
        </div>

        <div class="input-container">
          <label>中文拼音输入:</label>
          <input v-model="inputValueZh" type="text" data-inputmode="zh" inputmode="none" placeholder="点击这里使用中文拼音" />
        </div>

        <div class="input-container">
          <label>手写输入:</label>
          <input v-model="inputValueHand" type="text" data-inputmode="hand" inputmode="none" placeholder="点击这里使用手写" />
        </div>

        <div class="input-container">
          <label>数字输入:</label>
          <input v-model="inputValueNum" type="text" data-inputmode="num" inputmode="none" placeholder="点击这里使用数字键盘" />
        </div>
      </div>

      <div class="controls">
        <template v-if="position !== 'bottom'">
          <label>键盘宽度: {{ keyboardWidth }}px</label>
          <input
            v-model="keyboardWidth"
            type="range"
            min="400"
            max="1080"
            step="10"
            class="width-slider"
          />
          <label>键盘高度: {{ keyboardHeight }}px</label>
          <input
            v-model="keyboardHeight"
            type="range"
            min="300"
            max="1000"
            step="10"
            class="width-slider"
          />
        </template>

        <div class="checkbox-container">
          <div class="checkbox-item">
            <input
              id="disable-when-no-focus"
              v-model="disableWhenNoFocus"
              type="checkbox"
            />
            <label for="disable-when-no-focus">当无焦点时禁用键盘</label>
          </div>
        </div>

        <div class="position-container">
          <label>键盘定位方式:</label>
          <div class="radio-group">
            <div v-for="(hint, key) in positionHints" :key="key" class="radio-item">
              <input :id="`pos-${key}`" v-model="position" type="radio" :value="key" name="position" />
              <label :for="`pos-${key}`">{{ hint }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="keyboard-wrapper">
      <ZhKeyboard :position="position" :style="position === 'bottom' ? { width: '100%', height: 'auto' } : { width: `${keyboardWidth}px`, height: `${keyboardHeight}px` }" enable-handwriting :disable-when-no-focus="disableWhenNoFocus" />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.root-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #333;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-container label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.input-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.width-slider {
  width: 100%;
  cursor: pointer;
}

.position-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.position-container>label {
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-item input[type="radio"] {
  cursor: pointer;
}

.radio-item label {
  font-weight: normal;
  color: #555;
  cursor: pointer;
}

.position-select {
  width: 100%;
}

.position-hint {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
  font-style: italic;
}

.keyboard-wrapper {
  display: flex;
  justify-content: center;
  width: auto;
  min-width: min-content;
  margin: 0 auto;
}

.checkbox-container {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-item input[type="checkbox"] {
  cursor: pointer;
}

.checkbox-item label {
  font-weight: normal;
  color: #555;
  cursor: pointer;
}
</style>
