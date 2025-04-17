<script setup lang="ts">
import type { KeyEvent } from '../types'
import backspaceIcon from '../assets/icons/keyboard-backspace.svg'
import returnIcon from '../assets/icons/keyboard-return.svg'

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

<style lang="scss">
@use 'sass:color';

.num-keyboard {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;

  &__container {
    display: flex;
    height: 100%;
    gap: 8px;
  }

  &__left {
    flex: 3;
    display: flex;
    flex-direction: column;
  }

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--gap);
  }

  &__row {
    display: flex;
    flex: 1;
    gap: var(--gap);
  }

  &__key {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--key-background-color, #fff);
    border: 1px solid var(--border-color, #dcdcdc);
    border-radius: var(--key-border-radius, 5px);
    font-size: var(--key-font-size);
    font-weight: bold;
    color: var(--key-text-color, #333);
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
      background-color: color.adjust(#fff, $lightness: -3%);
    }

    &:active {
      transform: scale(0.95);
    }

    &--function {
      height: calc(100% / 4 - 6px);
      background-color: var(--function-key-color, #e6e6e6);
      font-size: var(--key-font-size);
      font-weight: bold;

      &:hover {
        background-color: color.adjust(#e6e6e6, $lightness: -5%);
      }
    }

    &--back {
      font-size: var(--key-font-size);
      background-color: var(--function-key-color, #e6e6e6);

      &:hover {
        background-color: color.adjust(#e6e6e6, $lightness: -5%);
      }
    }

    &--space {
      font-size: var(--key-font-size);
    }
  }

  &__key-icon {
    width: var(--key-icon-size);
    height: var(--key-icon-size);
  }
}
</style>
