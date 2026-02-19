<script setup lang="ts">
import type { PinyinEngine, PinyinState } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getPinyinEngine } from '@zh-keyboard/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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

// 拼音引擎实例
let engine: PinyinEngine | null = null

const pinyinState = ref<PinyinState | null>(null)

const candidates = computed(() => pinyinState.value?.candidates.map(c => c.text) ?? [])

const isSelectionOpen = ref(false)

onMounted(async () => {
  engine = getPinyinEngine()
  if (!engine) {
    throw new Error('未找到拼音引擎实例，请确保已正确注册引擎')
  }

  // 引擎就绪后，若已有拼音输入则立即处理
  if (currentPinyin.value) {
    pinyinState.value = await engine.processInput(currentPinyin.value)
  }
})

onUnmounted(() => {
  engine?.clearInput()
  engine = null
})

watch(currentPinyin, async (newVal) => {
  const eng = engine
  if (!eng)
    return

  if (newVal === '') {
    eng.clearInput()
    pinyinState.value = null
    return
  }

  pinyinState.value = await eng.processInput(newVal)
})

async function handleSelection(globalIndex: number) {
  if (!engine)
    return

  const state = await engine.pickCandidate(globalIndex)
  pinyinState.value = state

  if (!state.preeditBody) {
    emit('input', state.committed || '')
    currentPinyin.value = ''
    pinyinState.value = null
    isSelectionOpen.value = false
  }
  // 选词后仍有未完成的拼音输入
}

defineExpose({
  handleSelection,
})

const showedPinyin = computed(() => {
  const state = pinyinState.value
  if (!state)
    return ''
  return state.preeditHead + state.preeditBody
})
</script>

<template>
  <div class="zhk-candidate">
    <div class="zhk-candidate__container">
      <!-- 输入拼音显示 -->
      <div v-if="showedPinyin" class="zhk-candidate__pinyin">
        {{ showedPinyin }}
      </div>

      <div class="zhk-candidate__bottom-container">
        <!-- 候选词列表 -->
        <CandidateList
          v-if="candidates.length > 0"
          :candidates="candidates"
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
      v-if="isSelectionOpen"
      :candidates="candidates"
      @select="handleSelection"
      @close="isSelectionOpen = false"
    />
  </div>
</template>
