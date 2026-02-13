<script setup lang="ts">
import type { KeyEvent } from '../types'
import { getKeyboardConfig } from '@zh-keyboard/core'
import backspaceIcon from '../assets/icons/keyboard-backspace.svg'
import returnIcon from '../assets/icons/keyboard-return.svg'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import '../styles/NumericKeyboard.scss'

withDefaults(defineProps<{
  keyboardRows?: string[][]
}>(), {
  keyboardRows: () => getKeyboardConfig().numKeys
    || [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['back', '0', 'space'],
    ],
})

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit'): void
}>()

const functionKeys = [
  { key: 'delete', icon: backspaceIcon, text: '', alt: 'Delete' },
  { key: '.', icon: '', text: '.', alt: '.' },
  { key: '@', icon: '', text: '@', alt: '@' },
  { key: 'enter', icon: returnIcon, text: '', alt: 'Enter' },
]

function handleKeyPress(key: string) {
  emit('key', { key })
}

function handleSpecialKey(key: string, isControl = true) {
  emit('key', { key, isControl })
}

function goBack() {
  emit('exit')
}

const { startRepeat, stopRepeat } = useKeyRepeater()

function onKeyDown(key: string, e: PointerEvent) {
  if (key === 'back') {
    // 返回按钮特殊处理，从onclick触发
  } else {
    if (key === 'space') {
      key = ' '
    }
    if (key === 'delete' || key === 'enter') {
      startRepeat(e, () => handleSpecialKey(key))
    } else {
      startRepeat(e, () => handleKeyPress(key))
    }
  }
}
</script>

<template>
  <div class="num-keyboard">
    <div class="num-keyboard__container">
      <div class="num-keyboard__left">
        <div class="num-keyboard__rows">
          <div v-for="(row, rowIndex) in keyboardRows" :key="`row-${rowIndex}`" class="num-keyboard__row">
            <button
              v-for="(key, keyIndex) in row"
              :key="`key-${rowIndex}-${keyIndex}`"
              class="num-keyboard__key"
              :class="{
                'num-keyboard__key--back': key === 'back',
                'num-keyboard__key--space': key === 'space',
              }"
              @click="key === 'back' && goBack()"
              @pointerdown="(e) => onKeyDown(key, e)"
              @pointerup="stopRepeat"
              @pointerleave="stopRepeat"
              @pointercancel="stopRepeat"
              @contextmenu.prevent
            >
              <template v-if="key === 'back'">
                返回
              </template>
              <template v-else-if="key === 'space'">
                <img src="../assets/icons/keyboard-space.svg" class="zhk-base__key-icon" alt="Space" />
              </template>
              <template v-else>
                {{ key }}
              </template>
            </button>
          </div>
        </div>
      </div>

      <div class="num-keyboard__right">
        <button
          v-for="(fKey, index) in functionKeys"
          :key="`func-${index}`"
          class="num-keyboard__key num-keyboard__key--function"
          @pointerdown="(e) => onKeyDown(fKey.key, e)"
          @pointerup="stopRepeat"
          @pointerleave="stopRepeat"
          @pointercancel="stopRepeat"
          @contextmenu.prevent
        >
          <img v-if="fKey.icon" :src="fKey.icon" class="num-keyboard__key-icon" :alt="fKey.alt" />
          <span v-else>{{ fKey.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
