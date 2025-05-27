<script setup lang="ts">
import '../styles/CandidateSelection.scss'

defineProps<{ candidates: string[] }>()
const emit = defineEmits<{
  (e: 'select', candidate: string): void
  (e: 'close'): void
}>()

function selectCandidate(candidate: string) {
  emit('select', candidate)
}

function closeModal() {
  emit('close')
}
</script>

<template>
  <div class="zhk-selection">
    <div class="zhk-selection__list">
      <div v-for="(candidate, index) in candidates" :key="index" class="zhk-selection__text" @click="selectCandidate(candidate)">
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
