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
    <wd-swiper
      :list="props.list" :height="600" :display-multiple-items="0" :autoplay="false"
      :indicator="{ type: 'dots-bar' }" image-mode="aspectFill" @click="({ index }) => emits('click', index)"
    />
  </div>
</template>

<style lang="scss" scoped>
    .banner {
        color: #fff;
        --wot-swiper-radius: 0;
    }
</style>
