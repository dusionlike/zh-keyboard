<script setup lang="ts">
import type { KeyEvent } from '../types'
import { AdvancedPinyinEngine } from '@zh-keyboard/core'
import { computed, ref, watchEffect } from 'vue'
import CandidateList from './CandidateList.vue'
import CandidateSelection from './CandidateSelection.vue'
import '../styles/CandidateBar.scss'

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'input', text: string): void
}>()

const currentPinyin = defineModel<string>({
  required: true,
})

// 拼音输入法引擎
const inputEngine = new AdvancedPinyinEngine()

// 候选词列表
const candidates = ref<string[]>([])

watchEffect(async () => {
  candidates.value = await inputEngine.processInput(currentPinyin.value)
})

const visibleCandidates = computed(() => candidates.value.slice(0, 30))

const isSelectionOpen = ref(false)

// 选择候选词
function handleSelection(selected: string) {
  inputEngine.selectCandidate(selected)
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
