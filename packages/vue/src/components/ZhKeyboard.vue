<script setup lang="ts">
import type { KeyboardPosition } from '@zh-keyboard/core'
import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useDebounceFn, useElementSize, useEventListener } from '@vueuse/core'
import { calculateKeyboardPosition, delToInputElement, getKeyboardConfig, isInputElement, writeToInputElement } from '@zh-keyboard/core'
import { computed, ref, watch, watchEffect } from 'vue'
import { useHandwritingRecognizer } from '../utils/useHandwritingRecognizer'
import HandwritingInput from './HandwritingInput.vue'
import KeyboardBase from './KeyboardBase.vue'
import NumericKeyboard from './NumericKeyboard.vue'
import SymbolKeyboard from './SymbolKeyboard.vue'
import '../styles/ZhKeyboard.scss'

const props = defineProps({
  /**
   * 默认的键盘模式
   */
  defaultMode: {
    type: String as () => KeyBoardMode,
    default: () => getKeyboardConfig().defaultMode ?? 'en',
  },
  /**
   * 是否启用手写输入
   */
  enableHandwriting: {
    type: Boolean,
    default: () => getKeyboardConfig().enableHandwriting ?? false,
  },
  /**
   * 键盘定位模式
   * @default 'static'
   */
  position: {
    type: String as () => 'static' | 'float' | 'bottom',
    default: () => getKeyboardConfig().position ?? 'static',
  },
  /**
   * 浮动模式下键盘与输入框的距离
   * @default 10
   */
  floatMarginTop: {
    type: Number,
    default: () => getKeyboardConfig().floatMarginTop ?? 0,
  },
  /**
   * 当没有input获得焦点时是否禁用键盘
   * @default true
   */
  disableWhenNoFocus: {
    type: Boolean,
    default: () => getKeyboardConfig().disableWhenNoFocus ?? true,
  },
  /**
   * 数字键盘的行配置
   */
  numKeys: {
    type: Array as () => string[][] || undefined,
  },
})

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
}>()

const mode = ref<KeyBoardMode>(props.defaultMode)
const previousMode = ref<KeyBoardMode>(props.defaultMode)

const candidates = ref<string[]>([])
const isSelectionOpen = ref(false)
const keyboardPosition = ref<KeyboardPosition | null>(null)
const keyboardRef = ref<HTMLElement | null>(null)

const { recognizerInitialized, recognizerProgress } = useHandwritingRecognizer(props.enableHandwriting)

// 监听mode变化，保存上一次的值
watch(mode, (newMode, oldMode) => {
  if (newMode !== oldMode) {
    previousMode.value = oldMode
  }
})

const activeElement = useActiveElement<HTMLInputElement>()

const inputElement = computed(() => {
  if (activeElement.value && isInputElement(activeElement.value)) {
    return activeElement.value
  }
  return null
})

const showKeyboard = computed(() => {
  return props.position === 'static' || !!(activeElement.value && isInputElement(activeElement.value))
})

const { height: keyboardHeight } = useElementSize(keyboardRef)

// 监听 inputElement 的变化
watchEffect(() => {
  if (inputElement.value) {
    const inputmode = inputElement.value.dataset.inputmode as KeyBoardMode | undefined
    if (inputmode) {
      mode.value = inputmode
    }
  }
})

// 判断键盘是否被禁用（当前没有可输入的元素时禁用）
const isKeyboardDisabled = computed(() => {
  if (props.disableWhenNoFocus === false)
    return false

  return !inputElement.value
})

// 计算键盘位置
function updateKeyboardPosition() {
  if (!keyboardHeight.value)
    return
  const newPosition = calculateKeyboardPosition(
    inputElement.value,
    keyboardRef.value,
    props.position,
    props.floatMarginTop,
  )
  keyboardPosition.value = newPosition
}

watchEffect(updateKeyboardPosition)

// 页面滚动或窗口大小变化时更新键盘位置（添加防抖以避免频繁触发）
const debouncedUpdatePosition = useDebounceFn(updateKeyboardPosition, 100)
useEventListener(window, 'scroll', debouncedUpdatePosition, { passive: true })
useEventListener(window, 'resize', debouncedUpdatePosition, { passive: true })

function handleKeyEvent(payload: KeyEvent) {
  if (payload.isControl) {
    switch (payload.key) {
      case 'delete':
        delToInputElement(inputElement.value!)
        break
      case 'more':
        isSelectionOpen.value = true
        break
      default:
        break
    }
    return
  } else {
    inputText(payload.key)
  }
  emit('key', payload)
}

function inputText(text: string) {
  writeToInputElement(inputElement.value!, text)
}

function goBack() {
  if (mode.value === 'hand') {
    previousMode.value = 'zh'
  } else if (['num', 'symbol'].includes(previousMode.value)) {
    previousMode.value = props.defaultMode
  }
  mode.value = previousMode.value
}

function handleRecognize(results: string[]) {
  candidates.value = results
}
</script>

<template>
  <div
    v-show="showKeyboard"
    ref="keyboardRef"
    class="zhk"
    :class="{
      'zhk--floating': position === 'float',
      'zhk--bottom': position === 'bottom',
      'zhk--disabled': isKeyboardDisabled,
    }"
    :style="{
      '--keyboard-height': `${keyboardHeight}px`,
      ...keyboardPosition,
    }"
    @mousedown.prevent
  >
    <div v-if="isKeyboardDisabled || !showKeyboard || !keyboardHeight" class="zhk__disabled-overlay">
      <span>请选择输入框以启用键盘</span>
    </div>
    <template v-else>
      <HandwritingInput
        v-if="mode === 'hand'"
        :recognizer-initialized
        :recognizer-progress
        @key="handleKeyEvent"
        @exit="goBack"
        @recognize="handleRecognize"
      />
      <NumericKeyboard
        v-else-if="mode === 'num'"
        :keyboard-rows="numKeys"
        @key="handleKeyEvent"
        @exit="goBack"
      />
      <SymbolKeyboard
        v-else-if="mode === 'symbol'"
        @key="handleKeyEvent"
        @exit="goBack"
      />
      <KeyboardBase
        v-else-if="mode === 'en' || mode === 'en_cap' || mode === 'zh'"
        v-model="mode"
        :enable-handwriting="enableHandwriting"
        @key="handleKeyEvent"
      />
    </template>
  </div>
</template>
