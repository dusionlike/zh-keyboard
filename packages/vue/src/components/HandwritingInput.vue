<script setup lang="ts">
import type { KeyEvent } from '../types'
import { useElementSize } from '@vueuse/core'
import { CanvasDrawer, getHandwritingRecognizer, HandwritingSession, InputComposition, LatestTaskQueue } from '@zh-keyboard/core'
import { nextTick, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import CandidateList from './CandidateList.vue'
import '../styles/HandwritingInput.scss'

const props = defineProps<{
  recognizerInitialized: boolean
  handwritingDelay: number
  inputElement: HTMLInputElement | null
}>()

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit', payload: void): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvasDrawer: CanvasDrawer | null = null
let handwritingSession: HandwritingSession | null = null
const candidates = ref<string[]>([])
const recognitionQueue = new LatestTaskQueue()
const composition = new InputComposition({
  onConfirm: () => handwritingSession?.select(0),
  onCancel: () => handwritingSession?.reset(),
})

// 监听画布自身尺寸变化
const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)

function setupCanvas() {
  if (!canvasRef.value)
    return

  // 如果已存在画布处理器，先销毁它
  if (canvasDrawer) {
    canvasDrawer.destroy()
  }
  handwritingSession?.dispose()

  canvasRef.value.width = canvasWidth.value
  canvasRef.value.height = canvasHeight.value

  let drawer: CanvasDrawer
  const session = new HandwritingSession({
    queue: recognitionQueue,
    recognize: strokeData => getHandwritingRecognizer()?.recognize(strokeData) ?? Promise.resolve([]),
    onCandidates: results => candidates.value = results,
    onPreview: candidate => composition.update(props.inputElement, candidate),
    onCommit: candidate => composition.commit(candidate, () => emit('key', { key: candidate })),
    onClear: () => drawer.clearCanvas(),
    onError: error => console.error('识别笔迹失败:', error),
    getTarget: () => document.activeElement,
  })
  drawer = new CanvasDrawer(canvasRef.value, {
    clearDelay: props.handwritingDelay,
    onDrawStart: () => session.startStroke(),
    onDrawEnd: () => void session.recognize([...drawer.getStrokeData()]),
    onIdle: () => void session.finish(),
  })
  canvasDrawer = drawer
  handwritingSession = session
  candidates.value = []
}

const { startRepeat, stopRepeat } = useKeyRepeater()

watch(() => props.handwritingDelay, delay => canvasDrawer?.setClearDelay(delay))
watch(() => props.inputElement, () => handwritingSession?.reset())

// 组件卸载时清理识别器
onUnmounted(() => {
  if (canvasDrawer) {
    canvasDrawer.destroy()
  }
  handwritingSession?.dispose()
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
  handwritingSession?.select(index)
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
        <div
          v-if="!recognizerInitialized"
          class="handwriting-loading"
        >
          <div class="loading-text">
            正在加载手写识别...
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
