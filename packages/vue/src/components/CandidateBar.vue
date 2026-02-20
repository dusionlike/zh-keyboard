<script setup lang="ts">
import type { PinyinEngine } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getKeyboardConfig, getPinyinEngine } from '@zh-keyboard/core'
import { createRimePinyinEngine } from '@zh-keyboard/pinyin'
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

const segmentedPinyin = ref('')

watch(currentPinyin, (val) => {
  if (!val) {
    segmentedPinyin.value = ''
  }
})

const showedPinyin = computed(() => segmentedPinyin.value || currentPinyin.value)

// 拼音引擎实例
let engine: PinyinEngine | null = null
// 标记引擎是否由本组件创建（外部注册的引擎不由本组件销毁）
let engineIsOwned = false

// 候选词列表（全量）
const candidates = ref<string[]>([])
const isSelectionOpen = ref(false)

onMounted(async () => {
  const registered = getPinyinEngine()
  if (registered) {
    engine = registered
    engineIsOwned = false
  } else {
    const wasmDir = getKeyboardConfig().wasmDir ?? '/rime'
    engine = await createRimePinyinEngine({ wasmDir })
    engineIsOwned = true
  }

  // 引擎就绪后，若已有拼音输入则立即处理
  if (currentPinyin.value) {
    const result = await engine.processInput(currentPinyin.value)
    candidates.value = result.candidates
    segmentedPinyin.value = result.segmentedPinyin
  }
})

onUnmounted(() => {
  if (engineIsOwned) {
    engine?.destroy()
  }
  engine = null
})

watch(currentPinyin, async (newVal) => {
  const eng = engine
  if (!eng)
    return

  if (newVal === '') {
    eng.clearInput()
    candidates.value = []
    return
  }

  const result = await eng.processInput(newVal)
  candidates.value = result.candidates
  segmentedPinyin.value = result.segmentedPinyin
})

async function handleSelection(globalIndex: number) {
  const eng = engine
  if (!eng)
    return

  const result = await eng.pickCandidate(globalIndex)
  const committed = result

  if (committed) {
    emit('input', committed)
  }

  currentPinyin.value = ''
  segmentedPinyin.value = ''
  isSelectionOpen.value = false
}
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
