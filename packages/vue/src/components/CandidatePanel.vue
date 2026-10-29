<script setup lang="ts">
import CandidateList from './CandidateList.vue'
import CandidateSelection from './CandidateSelection.vue'
import '../styles/CandidateBar.scss'

withDefaults(defineProps<{
  candidates: string[]
  selectionCandidates?: string[]
  preedit?: string
  loading?: boolean
  loadingText?: string
  expanding?: boolean
  expanded?: boolean
}>(), {
  loadingText: '加载候选词中…',
})

const emit = defineEmits<{
  (e: 'select', index: number): void
  (e: 'expand'): void
  (e: 'close'): void
}>()
</script>

<template>
  <div class="zhk-candidate">
    <div v-if="loading" class="zhk-candidate__container zhk-candidate__container--loading">
      <span class="zhk-candidate__loading-text">{{ loadingText }}</span>
    </div>
    <template v-else>
      <div class="zhk-candidate__container">
        <div v-if="preedit" class="zhk-candidate__pinyin">
          {{ preedit }}
        </div>
        <div class="zhk-candidate__bottom-container">
          <CandidateList v-if="candidates.length" :candidates @select="index => emit('select', index)" />
          <button
            v-if="candidates.length"
            type="button"
            class="zhk-candidate__more"
            aria-label="展开全部候选词"
            :aria-expanded="!!expanded"
            :disabled="expanding"
            @click="emit('expand')"
          >
            <img src="../assets/icons/chevron-right.svg" alt="" />
          </button>
        </div>
      </div>
      <CandidateSelection
        v-if="expanded"
        :candidates="selectionCandidates ?? candidates"
        @select="index => emit('select', index)"
        @close="emit('close')"
      />
    </template>
  </div>
</template>
