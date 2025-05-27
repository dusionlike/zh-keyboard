<script setup lang="ts">
import type { KeyEvent } from '../types'
import { computed, ref } from 'vue'
import lockOpenIconUrl from '../assets/icons/lock-open-outline.svg'
import lockClosedIconUrl from '../assets/icons/lock-outline.svg'
import '../styles/SymbolKeyboard.scss'

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
