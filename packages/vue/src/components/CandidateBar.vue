<script setup lang="ts">
import type { KeyEvent } from '../types'
import type { RimeEngine } from '@zh-keyboard/pinyin'
import { createRimeEngine } from '@zh-keyboard/pinyin'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CandidateList from './CandidateList.vue'
import CandidateSelection from './CandidateSelection.vue'
import '../styles/CandidateBar.scss'

const props = defineProps<{
  wasmDir?: string
}>()

const emit = defineEmits<{
  (e: 'key', payload: KeyEvent): void
  (e: 'input', text: string): void
}>()

const currentPinyin = defineModel<string>({
  required: true,
})

// 拼音输入法引擎
const engine = ref<RimeEngine | null>(null)

// 候选词列表
const candidates = ref<string[]>([])
const isSelectionOpen = ref(false)

// 记录上次发送给引擎的拼音，用于判断增量 vs 重置
let prevPinyin = ''

onMounted(async () => {
  engine.value = await createRimeEngine({ wasmDir: props.wasmDir ?? '/rime' })
})

onUnmounted(() => {
  engine.value?.destroy()
  engine.value = null
})

watch(currentPinyin, (newVal) => {
  const eng = engine.value
  if (!eng)
    return
  if (newVal === '') {
    eng.clearInput()
    prevPinyin = ''
    candidates.value = []
    return
  }
  let state
  if (newVal.startsWith(prevPinyin)) {
    // 追加新字符：只发送新增部分
    const delta = newVal.slice(prevPinyin.length)
    state = eng.processInput(delta)
  }
  else {
    // 删除/修改：清空后重新输入全部
    eng.clearInput()
    state = eng.processInput(newVal)
  }
  prevPinyin = newVal
  candidates.value = state.candidates.map(c => c.text)
})

// 引擎就绪时，若已有拼音输入则立即处理（用户在引擎加载前已输入的情况）
watch(engine, (newEng) => {
  if (!newEng)
    return
  const pinyin = currentPinyin.value
  if (!pinyin)
    return
  const state = newEng.processInput(pinyin)
  prevPinyin = pinyin
  candidates.value = state.candidates.map(c => c.text)
})

const visibleCandidates = computed(() => candidates.value.slice(0, 30))

// 选择候选词
function handleSelection(selected: string) {
  const eng = engine.value
  if (!eng)
    return
  const idx = candidates.value.indexOf(selected)
  if (idx !== -1)
    eng.pickCandidate(idx)
  eng.clearInput()
  prevPinyin = ''
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
