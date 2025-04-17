<script setup lang="ts">
import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useElementSize, useEventListener } from '@vueuse/core'
import { calculateKeyboardPosition, delToInputElement, isInputElement, writeToInputElement } from '@zh-keyboard/core'
import { computed, nextTick, ref, watch, watchEffect } from 'vue'
import { useHandwritingRecognizer } from '../utils/useHandwritingRecognizer'
import HandwritingInput from './HandwritingInput.vue'
import KeyboardBase from './KeyboardBase.vue'
import NumericKeyboard from './NumericKeyboard.vue'
import SymbolKeyboard from './SymbolKeyboard.vue'

const props = defineProps<{
  /**
   * 默认的键盘模式
   */
  defaultMode?: KeyBoardMode
  /**
   * 是否启用手写输入
   */
  enableHandwriting?: boolean
  /**
   * 键盘定位模式
   * @default 'static'
   */
  position?: 'static' | 'float' | 'bottom'
  /**
   * 当没有input获得焦点时是否禁用键盘
   * @default true
   */
  disableWhenNoFocus?: boolean
}>()

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
}>()

const mode = ref<KeyBoardMode>(props.defaultMode || 'en')
const previousMode = ref<KeyBoardMode>(props.defaultMode || 'en')

const candidates = ref<string[]>([])
const isSelectionOpen = ref(false)
const showKeyboard = ref(props.position === 'static')
const keyboardPosition = ref<{ top: number, left: number } | null>(null)
const keyboardRef = ref<HTMLElement | null>(null)

// 使用手写识别服务，自动处理生命周期
const { recognizerInitialized } = useHandwritingRecognizer(props.enableHandwriting)

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

// 监听 inputElement 的变化
watchEffect(() => {
  if (inputElement.value) {
    const inputmode = inputElement.value.dataset.inputmode as KeyBoardMode | undefined
    if (inputmode) {
      mode.value = inputmode
    }

    if (props.position !== 'static') {
      showKeyboard.value = true
      nextTick(() => {
        updateKeyboardPosition()
      })
    }
  } else if (props.position !== 'static') {
    showKeyboard.value = false
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
  if (!keyboardRef.value || !inputElement.value)
    return
  const newPosition = calculateKeyboardPosition(
    inputElement.value,
    keyboardRef.value,
    props.position as 'static' | 'float' | 'bottom',
  )
  if (newPosition) {
    keyboardPosition.value = newPosition
  }
}

// 页面滚动或窗口大小变化时更新键盘位置
useEventListener(window, 'scroll', updateKeyboardPosition, { passive: true })
useEventListener(window, 'resize', updateKeyboardPosition, { passive: true })

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
  mode.value = previousMode.value
}

function handleRecognize(results: string[]) {
  candidates.value = results
}

const { height: rawKeyboardHeight } = useElementSize(keyboardRef, { width: 400, height: 300 })
const keyboardHeight = computed(() => `${rawKeyboardHeight.value}px`)
</script>

<template>
  <Teleport to="body" :disabled="position === 'static'">
    <div
      v-show="position === 'static' ? true : (showKeyboard && !isKeyboardDisabled)"
      v-bind="$attrs"
      ref="keyboardRef"
      class="zhk"
      :class="{
        'zhk--floating': position === 'float',
        'zhk--bottom': position === 'bottom',
        'zhk--disabled': isKeyboardDisabled,
      }"
      :style="position !== 'static' && keyboardPosition ? {
        top: `${keyboardPosition.top}px`,
        left: `${keyboardPosition.left}px`,
      } : {}"
      @mousedown.prevent
    >
      <div v-if="isKeyboardDisabled" class="zhk__disabled-overlay">
        <span>请选择输入框以启用键盘</span>
      </div>
      <template v-else>
        <HandwritingInput
          v-if="mode === 'hand'"
          @key="handleKeyEvent" @exit="goBack"
          @recognize="handleRecognize"
        />
        <NumericKeyboard
          v-else-if="mode === 'num'"
          @key="handleKeyEvent"
          @exit="goBack"
        />
        <SymbolKeyboard
          v-else-if="mode === 'symbol'"
          @key="handleKeyEvent"
          @exit="goBack"
        />
        <KeyboardBase
          v-else-if="mode === 'en' || mode === 'zh'"
          v-model="mode"
          :recognizer-initialized="recognizerInitialized"
          :enable-handwriting="enableHandwriting"
          @key="handleKeyEvent"
        />
      </template>
    </div>
  </Teleport>
</template>

<style lang="scss">
$primary-color: #4CAF50;
$primary-hover-color: #3e8e41;
$background-color: #f5f5f5;
$key-background-color: #fff;
$key-text-color: #333;
$function-key-color: #e6e6e6;
$border-color: #dcdcdc;
$border-radius: 8px;
$key-border-radius: 5px;
$box-shadow-color: rgba(0, 0, 0, 0.1);

.zhk {
  --keyboard-height: v-bind(keyboardHeight);
  --key-font-size: max(1rem, calc(var(--keyboard-height) / 20));
  --candidate-font-size: max(24px, calc(var(--keyboard-height) / 12));
  --gap: 4px;
  --key-width: calc((100% - 9 * var(--gap)) / 10);
  --key-min-width-function: 45px;
  --key-icon-size: calc(var(--key-font-size) * 1.2);

  position: relative;
  width: 100%;
  width: 400px;
  min-width: calc(var(--keyboard-height) + 100px);
  max-width: 1080px;
  height: 300px;
  min-height: 300px;
  overflow: hidden;
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: 0 2px 10px $box-shadow-color;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  user-select: none;

  &--disabled {
    opacity: 0.7;
  }

  &--floating {
    position: absolute;
    z-index: 9999;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  &--bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    z-index: 9999;
    border-radius: $border-radius $border-radius 0 0;
    box-shadow: 0 -2px 10px $box-shadow-color;
  }

  &__disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(245, 245, 245, 0.8);
    z-index: 10;
    border-radius: $border-radius;

    span {
      font-size: 16px;
      color: #666;
      padding: 15px 30px;
      background-color: #e0e0e0;
      border-radius: 5px;
    }
  }
}
</style>
