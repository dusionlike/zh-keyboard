<script setup lang="ts">
import '../styles/CandidateList.scss'

defineProps<{
  candidates: string[]
}>()

const emit = defineEmits<{
  (e: 'select', candidate: string): void
}>()

function handleSelect(candidate: string) {
  emit('select', candidate)
}
</script>

<template>
  <div class="zhk-candidate-list">
    <button
      v-for="(candidate, index) in candidates"
      :key="`candidate-${index}`"
      class="zhk-candidate-list__item"
      @click="handleSelect(candidate)"
    >
      {{ candidate }}
    </button>
  </div>
</template>
