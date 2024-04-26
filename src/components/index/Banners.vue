<!-- eslint-disable no-console -->
<script setup lang="ts">
const props = defineProps<{
  list: string[]
}>()

const emits = defineEmits<{
  click: [index: number]
}>()
</script>

<template>
  <div class="banner">
    <up-swiper
      :list="props.list"
      indicator
      indicator-mode="dot"
      :display-multiple-items="0"
      radius="0"
      bg-color="none"
      height="600"
      circular
      @click="(index) => emits('click', index)"
    />
  </div>
</template>

<style lang="scss" scoped>
    .banner {
        color: #fff;
        --wot-swiper-radius: 0;
    }
</style>
