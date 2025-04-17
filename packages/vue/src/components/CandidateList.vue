<script setup lang="ts">
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

<style lang="scss">
.zhk-candidate-list {
  flex: 1;
  min-width: 0;
  display: flex;
  overflow-x: auto;
  gap: var(--gap);
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Webkit */
  }

  &__item {
    font-size: var(--candidate-font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    white-space: nowrap; // 确保候选项不换行
    aspect-ratio: 1; // 保持宽高比为1:1，形成正方形
    flex-shrink: 0; // 防止在flex容器中被压缩
  }
}
</style>
