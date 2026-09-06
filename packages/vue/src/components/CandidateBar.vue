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

const engineLoading = ref(true)
const pinyinState = ref<PinyinState | null>(null)
const allCandidatesState = ref<PinyinState | null>(null)
const isAllCandidatesLoading = ref(false)
let allCandidatesRequestId = 0

const candidates = computed(() => pinyinState.value?.candidates.map(c => c.text) ?? [])
const selectionCandidates = computed(() => allCandidatesState.value?.candidates.map(c => c.text) ?? candidates.value)

const isSelectionOpen = ref(false)

onMounted(async () => {
  engine = getPinyinEngine()
  if (!engine) {
    throw new Error('未找到拼音引擎实例，请确保已正确注册引擎')
  }

  engineLoading.value = true
  try {
    await engine.whenReady?.()
  } catch (e) {
    console.error('拼音引擎就绪失败:', e)
  }
  engineLoading.value = false

  // 引擎就绪后，若已有拼音输入则立即处理
  if (currentPinyin.value) {
    pinyinState.value = await engine.processInput(currentPinyin.value)
  }
})

onUnmounted(() => {
  engine?.syncData?.()
  engine?.processInput('').catch(() => {})
  engine = null
})

watch(currentPinyin, async (newVal) => {
  const eng = engine
  if (!eng || engineLoading.value)
    return

  // 全量候选只对当前拼音有效，拼音变化后必须丢弃旧结果。
  allCandidatesRequestId++
  allCandidatesState.value = null
  isAllCandidatesLoading.value = false
  isSelectionOpen.value = false

  if (newVal === '') {
    eng.processInput('').catch(() => {})
    pinyinState.value = null
    return
  }

  pinyinState.value = await eng.processInput(newVal)
})

async function handleShowAllCandidates() {
  const eng = engine
  const state = pinyinState.value
  const input = currentPinyin.value
  if (!eng || !state || !input || isAllCandidatesLoading.value)
    return

  if (allCandidatesState.value) {
    isSelectionOpen.value = true
    return
  }

  if (!eng.getAllCandidates) {
    // 兼容未实现全量候选接口的自定义引擎。
    allCandidatesState.value = state
    isSelectionOpen.value = true
    return
  }

  const requestId = ++allCandidatesRequestId
  isAllCandidatesLoading.value = true
  try {
    const allState = await eng.getAllCandidates()
    if (requestId !== allCandidatesRequestId || engine !== eng || currentPinyin.value !== input)
      return

    allCandidatesState.value = allState
    isSelectionOpen.value = true
  } catch (e) {
    console.error('获取全部候选词失败:', e)
  } finally {
    if (requestId === allCandidatesRequestId)
      isAllCandidatesLoading.value = false
  }
}

async function handleSelection(globalIndex: number) {
  if (!engine)
    return

  const state = await engine.pickCandidate(globalIndex)
  pinyinState.value = state
  allCandidatesState.value = null

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
    <div v-if="engineLoading" class="zhk-candidate__container zhk-candidate__container--loading">
      <span class="zhk-candidate__loading-text">加载拼音引擎中…</span>
    </div>
    <template v-else>
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
            :disabled="isAllCandidatesLoading"
            @click="handleShowAllCandidates"
          >
            <img src="../assets/icons/chevron-right.svg" alt="更多" />
          </button>
        </div>
      </div>
      <CandidateSelection
        v-if="isSelectionOpen"
        :candidates="selectionCandidates"
        @select="handleSelection"
        @close="isSelectionOpen = false"
      />
    </template>
  </div>
</template>
