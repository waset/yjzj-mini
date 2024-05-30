<script setup lang="ts">
// 获取当前路由
const currentUrl = ref('')
// 刷新路由变化
onShow(() => {
  currentUrl.value = useRouter().currentUrl.value
})
</script>

<template>
  <common-layout>
    <slot />
    <common-tabbar :url="currentUrl" @jump="(path) => Jump(`/${path}` as any)" />
  </common-layout>
</template>

<style lang="scss" scoped></style>
