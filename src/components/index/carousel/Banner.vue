<script setup lang="ts">
const props = defineProps<{
  list: WindowsImage[]
}>()

const current = ref(0)
const banner_images = computed<string[]>(() => props.list.map(item => ImageUrl(item.imageUrl)))

function skip(index: number) {
  jump(props.list[index].src)
}
</script>

<template>
  <div class="banner">
    <carousel v-model:current="current" :list="banner_images" indicator :height="600" @click="skip" />
  </div>
</template>
