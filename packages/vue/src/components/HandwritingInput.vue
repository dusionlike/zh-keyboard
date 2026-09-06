<script setup lang="ts">
import type { KeyEvent } from '../types'
import { useElementSize } from '@vueuse/core'
import { CanvasDrawer, getHandwritingRecognizer, LatestTaskQueue } from '@zh-keyboard/core'
import { nextTick, onUnmounted, ref, watchEffect } from 'vue'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import CandidateList from './CandidateList.vue'
import '../styles/HandwritingInput.scss'

const props = defineProps<{
  recognizerInitialized: boolean
  recognizerProgress: number
}>()

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit', payload: void): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvasDrawer: CanvasDrawer | null = null
const recognitionQueue = new LatestTaskQueue()

// 监听画布自身尺寸变化
const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)

function clearCanvas() {
  if (!canvasDrawer)
    return
  canvasDrawer.clearCanvas()
}

function setupCanvas() {
  if (!canvasRef.value)
    return

  // 如果已存在画布处理器，先销毁它
  if (canvasDrawer) {
    canvasDrawer.destroy()
  }

  canvasRef.value.width = canvasWidth.value
  canvasRef.value.height = canvasHeight.value

  canvasDrawer = new CanvasDrawer(canvasRef.value, {
    onDrawEnd: recognizeStroke,
  })
}

const candidates = ref<string[]>([])

const { startRepeat, stopRepeat } = useKeyRepeater()

// 识别当前笔迹
async function recognizeStroke() {
  if (!canvasDrawer || canvasDrawer.getStrokeData().length === 0)
    return

  const recognizer = getHandwritingRecognizer()
  if (recognizer) {
    try {
      // 将 readonly array 转换为 mutable array
      const strokeData = [...canvasDrawer.getStrokeData()]
      const results = await recognitionQueue.submit(() => recognizer.recognize(strokeData))

      if (results !== undefined) {
        candidates.value = results
      }
    } catch (error) {
      console.error('识别笔迹失败:', error)
    }
  } else {
    console.warn('手写识别服务不可用')
  }
}

// 组件卸载时清理识别器
onUnmounted(() => {
  if (canvasDrawer) {
    canvasDrawer.destroy()
  }
  recognitionQueue.clearPending()
})

watchEffect(() => {
  // 当画布尺寸或识别器初始化完成时初始化/重置 CanvasDrawer
  if (canvasRef.value && (canvasWidth.value || canvasHeight.value) && props.recognizerInitialized) {
    nextTick(() => {
      setupCanvas()
    })
  }
})

function handleSelection(index: number) {
  const candidate = candidates.value[index]
  if (!candidate)
    return
  emit('key', { key: candidate })
  candidates.value = []
  clearCanvas()
}
</script>

<template>
  <div class="handwriting-input">
    <CandidateList
      :candidates
      @select="handleSelection"
    />
    <div class="handwriting-content">
      <div class="handwriting-buttons">
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: '。' }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          。
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: '？' }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          ？
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: '！' }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          ！
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: '、' }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          、
        </button>
      </div>
      <div class="handwriting-canvas-container">
        <!-- 进度条显示 -->
        <div
          v-if="!recognizerInitialized"
          class="handwriting-loading"
        >
          <div class="loading-text">
            正在加载手写识别...
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${recognizerProgress * 100}%` }"></div>
          </div>
          <div class="progress-text">
            {{ Math.round(recognizerProgress * 100) }}%
          </div>
        </div>
        <!-- 画布显示 -->
        <canvas
          v-else
          ref="canvasRef"
          class="handwriting-canvas"
        ></canvas>
      </div>
      <div class="handwriting-buttons">
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: 'delete', isControl: true }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          <img src="../assets/icons/keyboard-backspace.svg" alt="删除" />
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @click="emit('exit')"
          @contextmenu.prevent
        >
          拼音
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: '，' }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          ，
        </button>
        <button
          class="handwriting-btn handwriting-btn--function"
          @pointerdown="(e) => startRepeat(e, () => emit('key', { key: 'enter', isControl: true }))"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          <img src="../assets/icons/keyboard-return.svg" alt="回车" />
        </button>
      </div>
    </div>
  </div>
</template>
