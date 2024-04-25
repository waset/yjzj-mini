<!-- eslint-disable -->
<script setup lang="ts">

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="about">
    <img class="image" src="@/static/images/about_us.png" mode="widthFix" alt="关于我们" @click="emit('click')">
    <!-- <wd-img src="@/assets/images/about_us.png" @click="emit('click')" /> -->
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
