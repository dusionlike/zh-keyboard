<script setup lang="ts">
import type { KeyEvent } from '../types'
import { SimplePinyinEngine } from '@zh-keyboard/core'
import { computed, ref } from 'vue'
import CandidateList from './CandidateList.vue'
import CandidateSelection from './CandidateSelection.vue'

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'input', text: string): void
}>()

const currentPinyin = defineModel<string>({
  required: true,
})

// 拼音输入法引擎
const inputEngine = new SimplePinyinEngine()

// 候选词列表
const candidates = computed(() => {
  return inputEngine.processInput(currentPinyin.value)
})

const visibleCandidates = computed(() => candidates.value.slice(0, 30))

const isSelectionOpen = ref(false)

// 选择候选词
function handleSelection(selected: string) {
  emit('input', selected)
  currentPinyin.value = ''
  isSelectionOpen.value = false
}
</script>

<template>
  <div class="zhk-candidate">
    <div class="zhk-candidate__container">
      <!-- 输入拼音显示 -->
      <div v-if="currentPinyin" class="zhk-candidate__pinyin">
        {{ currentPinyin }}
      </div>

      <div class="zhk-candidate__bottom-container">
        <!-- 候选词列表 -->
        <CandidateList
          v-if="candidates.length > 0"
          :candidates="visibleCandidates"
          @select="handleSelection"
        />
        <button
          v-if="candidates.length > 0"
          class="zhk-candidate__more"
          @click="isSelectionOpen = true"
        >
          <img src="../assets/icons/chevron-right.svg" alt="更多" />
        </button>
      </div>
    </div>
    <CandidateSelection
      v-show="isSelectionOpen"
      :candidates="candidates"
      @select="handleSelection"
      @close="isSelectionOpen = false"
    />
  </div>
</template>

<style lang="scss">
.zhk-candidate {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }

  &__pinyin {
    flex: 1;
    font-size: var(--key-font-size);
    color: var(--primary-color, #4CAF50);
    box-sizing: border-box;
  }

  &__bottom-container {
    flex: 3;
    display: flex;
    align-items: center;
    gap: var(--gap);
    width: 100%;
  }

  &__more {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: max(36px, calc(var(--keyboard-height) / 8));
    background: none;
    border: none;
  }
}
</style>
