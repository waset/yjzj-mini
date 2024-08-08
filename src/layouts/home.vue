<script setup lang="ts">
// 获取当前路由
const currentUrl = ref('')

watchEffect(() => {
  const pages = getCurrentPages()
  currentUrl.value = pages[pages.length - 1]?.route || ''
})
</script>

<template>
  <common-layout>
    <slot />
    <common-tabbar :url="currentUrl" @jump="(path) => Jump(`/${path}` as any)" />
  </common-layout>
</template>

<style lang="scss" scoped></style>
