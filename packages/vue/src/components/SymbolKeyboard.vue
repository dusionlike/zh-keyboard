<script setup lang="ts">
import type { KeyEvent } from '../types'
import { computed, ref } from 'vue'
import lockOpenIconUrl from '../assets/icons/lock-open-outline.svg'
import lockClosedIconUrl from '../assets/icons/lock-outline.svg'

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'exit'): void
}>()

const enSymbolStr = '!@#$%^&*(){}[]<>/\\|:;"\',.,?+-=_~`€£¥₹©®™°'
const zhSymbolStr = '！＠＃￥％…＆＊（）｛｝［］＜＞／＼｜：；＂＇，。？＋－＝＿～·€£¥₹©®™°'
const symbolType = ref('en')
const currentSymbolStr = computed(() => symbolType.value === 'zh' ? zhSymbolStr : enSymbolStr)
const isLocked = ref(false)

function handleKeyPress(key: string) {
  emit('key', { key })
  if (!isLocked.value) {
    emit('exit')
  }
}

function goBack() {
  emit('exit')
}

function setSymbolType(type: 'zh' | 'en') {
  symbolType.value = type
}

function toggleLock() {
  isLocked.value = !isLocked.value
}
</script>

<template>
  <div class="symbol-keyboard">
    <div class="symbol-keyboard__content">
      <div class="symbol-keyboard__functions">
        <div class="symbol-keyboard__lang-selector">
          <button
            class="symbol-keyboard__lang-btn"
            :class="{ 'symbol-keyboard__lang-btn--active': symbolType === 'zh' }"
            @click="setSymbolType('zh')"
          >
            中文
          </button>
          <button
            class="symbol-keyboard__lang-btn"
            :class="{ 'symbol-keyboard__lang-btn--active': symbolType === 'en' }"
            @click="setSymbolType('en')"
          >
            英文
          </button>
        </div>
        <div class="symbol-keyboard__control-group">
          <button
            class="symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--lock"
            :class="{ 'symbol-keyboard__key--locked': isLocked }"
            @click="toggleLock"
          >
            <img v-if="!isLocked" :src="lockOpenIconUrl" alt="Lock open" />
            <img v-else :src="lockClosedIconUrl" alt="Lock closed" />
          </button>
          <button
            class="symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--back"
            @click="goBack"
          >
            返回
          </button>
        </div>
      </div>

      <div class="symbol-keyboard__symbols-container">
        <div class="symbol-keyboard__symbols-grid">
          <button
            v-for="(char, index) in currentSymbolStr"
            :key="`key-${index}`"
            class="symbol-keyboard__key"
            @click="handleKeyPress(char)"
          >
            {{ char }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:color';

.symbol-keyboard {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;

  &__content {
    display: flex;
    flex: 1;
    gap: 6px;
    height: 100%;
  }

  &__functions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    width: 60px;
  }

  &__lang-selector {
    display: flex;
    flex-direction: column;
    height: calc(60px * 2 + 6px);
  }

  &__lang-btn {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--key-background-color, #fff);
    border: 1px solid var(--border-color, #dcdcdc);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.1s;
    margin: 0;
    box-sizing: border-box;
    width: 60px;
    flex: 1;
    flex-shrink: 0;

    &:first-child {
      border-radius: var(--key-border-radius, 5px) var(--key-border-radius, 5px) 0 0;
    }

    &:last-child {
      margin-top: -1px;
      border-radius: 0 0 var(--key-border-radius, 5px) var(--key-border-radius, 5px);
    }

    &:hover {
      filter: brightness(95%);
    }

    &--active {
      background-color: var(--primary-color, #4CAF50);
      color: white;
      border-color: var(--primary-color, #4CAF50);
      position: relative;
      z-index: 1;
    }
  }

  &__control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__symbols-container {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 5px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }

  &__symbols-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 6px;
    width: 100%;
    max-height: 100%;
    padding-bottom: 10px;
  }

  &__key {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--key-background-color, #fff);
    border: 1px solid var(--border-color, #dcdcdc);
    border-radius: var(--key-border-radius, 5px);
    font-size: 24px;
    font-weight: normal;
    color: var(--key-text-color, #333);
    cursor: pointer;
    transition: all 0.1s;
    margin: 0;
    box-sizing: border-box;
    min-width: 60px;
    max-width: 80px;
    width: 100%;
    height: 60px;
    aspect-ratio: 1;
    flex-shrink: 0;

    &:hover {
      background-color: color.adjust(#fff, $lightness: -3%);
    }

    &:active {
      transform: scale(0.95);
    }

    &--function {
      background-color: var(--function-key-color, #e6e6e6);
      width: 60px;
      height: 60px;
      aspect-ratio: auto;

      &:hover {
        background-color: color.adjust(#e6e6e6, $lightness: -5%);
      }
    }

    &--lock {
      padding: 10px 0;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 24px;
        height: 24px;
      }
    }

    &--locked {
      background-color: var(--primary-color, #4CAF50);
      color: white;

      &:hover {
        background-color: color.adjust(#4CAF50, $lightness: -5%);
      }
    }

    &--back {
      padding: 10px 0;
      font-size: 18px;
      font-weight: bold;
      display: flex;
    }
  }
}
</style>
