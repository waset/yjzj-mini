<script setup lang="ts">
const { getWindows } = useWindowsStore()
onShow(async () => {
  await getWindows(1, 10)
})
</script>

<template>
  <div class="index">
    <index-navbar />
  </div>
</template>

<style lang="scss" scoped>

</style>

<route type="home" lang="json">
{
  "layout": "home"
}
</route>
