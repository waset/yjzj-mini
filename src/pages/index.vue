<script setup lang="ts">
const { getWindows, getWindowsByKeyValue } = useWindowsStore()

const banners = ref<WindowsImage[]>([])

onShow(async () => {
  await getWindows(1, 10)
  banners.value = getWindowsByKeyValue('name', '小程序 banner')?.content.images || []
})

const banner_images = computed<string[]>(() => banners.value.map(item => ImageUrl(item.imageUrl)))
</script>

<template>
  <div class="index">
    <index-navbar />
    <index-banners :list="banner_images" @click="(index) => jump(banners[index].src)" />
  </div>
</template>

<style lang="scss" scoped>
.index{
    margin-top: calc((var(--navbar-heigth-all) -  var(--navbar-top)) * -1);
}
</style>

<route type="home" lang="json">
{
  "layout": "home"
}
</route>
