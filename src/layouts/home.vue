<script setup lang="ts">
// 获取tabbar数据
const { lists } = useTabbarStore()
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
    <div class="mx-auto mt-5 text-center text-sm c-white opacity-25">
      [Home Layout]
    </div>
    <common-tabbar :tabbars="lists" :url="currentUrl" @jump="jump" />
  </common-layout>
</template>

<style lang="scss" scoped>
</style>
