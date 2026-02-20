<script setup lang="ts">
import type { PinyinEngine } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getKeyboardConfig, getPinyinEngine } from '@zh-keyboard/core'
import { createRimePinyinEngine } from '@zh-keyboard/pinyin'
import { onMounted, onUnmounted, ref, watch } from 'vue'
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
const engine = ref<PinyinEngine | null>(null)
// 标记引擎是否由本组件创建（外部注册的引擎不由本组件销毁）
let engineIsOwned = false

// 候选词列表（全量）
const candidates = ref<string[]>([])
const isSelectionOpen = ref(false)

onMounted(async () => {
  const registered = getPinyinEngine()
  if (registered) {
    engine.value = registered
    engineIsOwned = false
  } else {
    const wasmDir = getKeyboardConfig().wasmDir ?? '/rime'
    engine.value = await createRimePinyinEngine({ wasmDir })
    engineIsOwned = true
  }

  // 引擎就绪后，若已有拼音输入则立即处理
  if (currentPinyin.value) {
    const result = engine.value.processInput(currentPinyin.value)
    candidates.value = result instanceof Promise ? await result : result
  }
})

onUnmounted(() => {
  if (engineIsOwned) {
    engine.value?.destroy()
  }
  engine.value = null
})

watch(currentPinyin, async (newVal) => {
  const eng = engine.value
  if (!eng)
    return

  if (newVal === '') {
    eng.clearInput()
    candidates.value = []
    return
  }

  const result = eng.processInput(newVal)
  candidates.value = result instanceof Promise ? await result : result
})

async function handleSelection(globalIndex: number) {
  const eng = engine.value
  if (!eng)
    return

  const result = eng.pickCandidate(globalIndex)
  const committed = result instanceof Promise ? await result : result

  if (committed) {
    emit('input', committed)
  }

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
