<!-- eslint-disable -->
<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="about">
    <img class="image" :src="props.src" mode="widthFix" alt="关于我们" @click="emit('click')">
  </div>
</template>

<style lang="scss" scoped>
    .about {
        @apply flex-center;

        .image{
            @apply w-full;
        }
    }
</style>
