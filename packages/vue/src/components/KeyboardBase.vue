<script setup lang="ts">
import type { KeyEvent } from '../types'
import { computed, ref } from 'vue'
import CandidateBar from './CandidateBar.vue'
import '../styles/KeyboardBase.scss'

const props = defineProps<{
  recognizerInitialized?: boolean
  enableHandwriting?: boolean
}>()

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
}>()

const mode = defineModel<string>({
  default: 'en',
})

const isUpperCase = ref(false)

const isChineseMode = computed(() => mode.value === 'zh')

const showUpperCase = computed(() => {
  return isChineseMode.value ? true : isUpperCase.value
})

function handleSpecialKey(key: string, isControl = false) {
  emit('key', { key, isControl })
}

function handleShift() {
  if (isChineseMode.value) {
    // 在中文模式下，切换到手写输入
    mode.value = 'hand'
  } else {
    // 在英文模式下，切换大小写
    isUpperCase.value = !isUpperCase.value
  }
}

function handleSwitchToNum() {
  // 切换到数字键盘
  mode.value = 'num'
}

function handleSwitchToSymbol() {
  // 切换到符号键盘
  mode.value = 'symbol'
}

const numbersRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const pinyin = ref('')

function handleDelete() {
  if (mode.value === 'zh' && pinyin.value) {
    // 在中文模式下，删除拼音
    pinyin.value = pinyin.value.slice(0, -1)
    return
  }
  handleSpecialKey('delete', true)
}

function handleKeyPress(key: string) {
  if (mode.value === 'zh') {
    // 在中文模式下，输入拼音
    pinyin.value += key
    return
  }
  const outputKey = isUpperCase.value ? key.toUpperCase() : key
  handleSpecialKey(outputKey)
}

function handleToggleLang() {
  mode.value = mode.value === 'zh' ? 'en' : 'zh'
}

// 计算手写按钮显示的文本
const handwritingButtonText = computed(() => {
  if (!props.enableHandwriting) {
    return '-'
  }
  if (!props.recognizerInitialized) {
    return '...'
  }
  return '手写'
})

// 计算手写按钮是否可点击
const isHandwritingButtonDisabled = computed(() => {
  return !props.enableHandwriting || !props.recognizerInitialized
})
</script>

<template>
  <div class="zhk-base">
    <div class="zhk-base__row">
      <CandidateBar
        v-if="mode === 'zh'"
        v-model="pinyin"
        @input="e => handleSpecialKey(e, false)"
      />
      <template v-else>
        <button
          v-for="(key, keyIndex) in numbersRow"

          :key="`number-${keyIndex}`"
          class="zhk-base__key zhk-base__key--letter"
          @click="handleKeyPress(key)"
        >
          {{ key }}
        </button>
      </template>
    </div>

    <div v-for="(row, rowIndex) in keyboardRows" :key="`row-${rowIndex}`" class="zhk-base__row">
      <button
        v-if="rowIndex === 2"
        class="zhk-base__key zhk-base__key--function zhk-base__key--shift"
        :class="{
          'zhk-base__key--active': !isChineseMode && isUpperCase,
          'zhk-base__key--disabled': isChineseMode && isHandwritingButtonDisabled,
        }"
        :disabled="isChineseMode && isHandwritingButtonDisabled"
        @click="handleShift"
      >
        <template v-if="isChineseMode">
          {{ handwritingButtonText }}
        </template>
        <template v-else>
          <img src="../assets/icons/keyboard-caps.svg" class="zhk-base__key-icon" alt="Shift" />
        </template>
      </button>

      <button
        v-for="(key, keyIndex) in row"
        :key="`key-${rowIndex}-${keyIndex}`"
        class="zhk-base__key zhk-base__key--letter"
        @click="handleKeyPress(key)"
      >
        {{ showUpperCase ? key.toUpperCase() : key }}
      </button>

      <button
        v-if="rowIndex === 2"
        class="zhk-base__key zhk-base__key--function zhk-base__key--delete"
        @click="() => handleDelete()"
      >
        <img src="../assets/icons/keyboard-backspace.svg" class="zhk-base__key-icon" alt="Delete" />
      </button>
    </div>

    <div class="zhk-base__row">
      <button class="zhk-base__key zhk-base__key--function" @click="handleSwitchToSymbol">
        符
      </button>
      <button class="zhk-base__key zhk-base__key--function" @click="handleSwitchToNum">
        123
      </button>
      <button class="zhk-base__key" @click="() => handleSpecialKey(',')">
        ，
      </button>
      <button class="zhk-base__key zhk-base__key--space" @click="() => handleSpecialKey(' ')">
        <img src="../assets/icons/keyboard-space.svg" class="zhk-base__key-icon" alt="Space" />
      </button>
      <button class="zhk-base__key" @click="() => handleSpecialKey('。')">
        。
      </button>
      <button class="zhk-base__key zhk-base__key--function" @click="handleToggleLang">
        <span class="zhk-base__toggle-main">{{ mode === 'zh' ? '中' : '英' }}</span>
        <span class="zhk-base__toggle-sub">/{{ mode === 'zh' ? '英' : '中' }}</span>
      </button>
      <button class="zhk-base__key zhk-base__key--function" @click="() => handleSpecialKey('enter', true)">
        <img src="../assets/icons/keyboard-return.svg" class="zhk-base__key-icon" alt="Enter" />
      </button>
    </div>
  </div>
</template>
