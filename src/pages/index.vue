<script setup lang="ts">
const { getWindows } = windowsStore()

getWindows(1, 10)
</script>

<template>
  <view>home</view>
</template>

<style></style>

<route type="home" lang="json">
{
    "layout": "home"
}
</route>
