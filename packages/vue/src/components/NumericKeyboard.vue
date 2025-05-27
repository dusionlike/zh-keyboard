<script setup lang="ts">
import type { KeyEvent } from '../types'
import backspaceIcon from '../assets/icons/keyboard-backspace.svg'
import returnIcon from '../assets/icons/keyboard-return.svg'
import '../styles/NumericKeyboard.scss'

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit'): void
}>()

const keyboardRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['back', '0', 'space'],
]

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
              @click="key === 'back' ? goBack() : (key === 'space' ? handleKeyPress(' ') : handleKeyPress(key))"
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
          @click="fKey.key === '.' || fKey.key === '@' ? handleKeyPress(fKey.key) : handleSpecialKey(fKey.key)"
        >
          <img v-if="fKey.icon" :src="fKey.icon" class="num-keyboard__key-icon" :alt="fKey.alt" />
          <span v-else>{{ fKey.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
