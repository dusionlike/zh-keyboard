<script setup lang="ts">
import type { KeyEvent } from '../types'
import { useElementSize } from '@vueuse/core'
import { CanvasDrawer } from '@zh-keyboard/core'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { getHandwritingRecognizer } from '../utils/handwriting'
import CandidateList from './CandidateList.vue'
import '../styles/HandwritingInput.scss'

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit', payload: void): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
let canvasDrawer: CanvasDrawer | null = null
// 是否正在识别中
const isRecognizing = ref(false)

// 使用useElementSize获取容器尺寸
const { height: canvasSize } = useElementSize(containerRef)

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

  canvasDrawer = new CanvasDrawer(canvasRef.value, {
    onDrawEnd: recognizeStroke,
  })
}

const candidates = ref<string[]>([])

// 识别当前笔迹
async function recognizeStroke() {
  if (!canvasDrawer || canvasDrawer.getStrokeData().length === 0 || isRecognizing.value)
    return

  const recognizer = getHandwritingRecognizer()
  if (recognizer) {
    isRecognizing.value = true

    try {
      // 将 readonly array 转换为 mutable array
      const strokeData = [...canvasDrawer.getStrokeData()]
      const results = await recognizer.recognize(strokeData)

      candidates.value = results
    } catch (error) {
      console.error('识别笔迹失败:', error)
    } finally {
      isRecognizing.value = false
    }
  } else {
    console.warn('手写识别服务不可用')
  }
}

// 组件卸载时清理识别器和计时器
onUnmounted(() => {
  if (canvasDrawer) {
    canvasDrawer.destroy()
  }
})

// 监听canvasSize变化，在尺寸变化时重新设置画布
watch(canvasSize, () => {
  if (canvasRef.value) {
    nextTick(() => {
      setupCanvas()
    })
  }
})

// 挂载时设置画布和初始化识别器
onMounted(() => {
  setupCanvas()
})

function handleSelection(candidate: string) {
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
    <div ref="containerRef" class="handwriting-content">
      <div class="handwriting-buttons">
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: '。' })">
          。
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: '？' })">
          ？
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: '！' })">
          ！
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: '、' })">
          、
        </button>
      </div>
      <div class="handwriting-canvas-container">
        <canvas
          ref="canvasRef"
          class="handwriting-canvas"
          :width="canvasSize"
          :height="canvasSize"
        ></canvas>
      </div>
      <div class="handwriting-buttons">
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: 'delete', isControl: true })">
          <img src="../assets/icons/keyboard-backspace.svg" alt="删除" />
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('exit')">
          返回
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: '，' })">
          ，
        </button>
        <button class="handwriting-btn handwriting-btn--function" @click="emit('key', { key: 'enter', isControl: true })">
          <img src="../assets/icons/keyboard-return.svg" alt="回车" />
        </button>
      </div>
    </div>
  </div>
</template>
