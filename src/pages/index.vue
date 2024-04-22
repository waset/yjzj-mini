<script setup lang="ts">
const { windows } = storeToRefs(windowsStore())
const { getWindows } = windowsStore()
onShow(() => {
  getWindows(1, 10)
  console.log(windows.value[0].name)
})
</script>

<template>
  <div class="index">
    <index-navbar />
    <index-banner :list="windows" />
  </div>
</template>

<style></style>

<route type="home" lang="json">
{
    "layout": "home"
}
</route>
