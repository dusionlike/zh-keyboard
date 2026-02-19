<script setup lang="ts">
import '../styles/CandidateList.scss'

defineProps<{
  candidates: string[]
}>()

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

function handleSelect(index: number) {
  emit('select', index)
}
</script>

<template>
  <div class="zhk-candidate-list">
    <button
      v-for="(candidate, index) in candidates"
      :key="`candidate-${index}`"
      class="zhk-candidate-list__item"
      @click="handleSelect(index)"
    >
      {{ candidate }}
    </button>
  </div>
</template>
