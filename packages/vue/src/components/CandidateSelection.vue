<script setup lang="ts">
import '../styles/CandidateSelection.scss'

defineProps<{ candidates: string[] }>()
const emit = defineEmits<{
  (e: 'select', index: number): void
  (e: 'close'): void
}>()

function selectCandidate(index: number) {
  emit('select', index)
}

function closeModal() {
  emit('close')
}

function getNumberCount(candidate: string) {
  const length = Array.from(candidate).length
  if (length >= 2 && length <= 3) {
    return 2
  } else if (length >= 4) {
    return 3
  }
  return 1
}
</script>

<template>
  <div class="zhk-selection">
    <div class="zhk-selection__list">
      <div
        v-for="(candidate, index) in candidates"
        :key="index"
        class="zhk-selection__text"
        :class="[`zhk-selection__text--span-${getNumberCount(candidate)}`]"
        @click="selectCandidate(index)"
      >
        {{ candidate }}
      </div>
    </div>
    <div class="zhk-selection__func">
      <button class="zhk-selection__func-btn" @click="closeModal">
        返回
      </button>
    </div>
  </div>
</template>
