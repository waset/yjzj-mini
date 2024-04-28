<script setup lang="ts">
const { getWindows, getWindowsByKeyValue } = useWindowsStore()

const banners = ref<WindowsImage[]>([])
const hots = ref<Product[]>([])
const diys = ref<Product[]>([])
const pushs = ref<Product[]>([])

onShow(async () => {
  await getWindows(1, 10)
  banners.value = getWindowsByKeyValue('name', '小程序 banner')?.content.images || []
  hots.value = getWindowsByKeyValue('name', '热门产品')?.content.products || []
  diys.value = getWindowsByKeyValue('name', '热门产品')?.content.products || []
  pushs.value = getWindowsByKeyValue('name', '热门产品')?.content.products || []
})

const hots_current = ref(0)

const notebook_type = ref(0)
const notebook_type_list = ref(['轻薄笔记本', '游戏笔记本', '移动工作站'])
</script>

<template>
  <div class="index">
    <index-navbar />
    <index-carousel-banner :list="banners" />
    <index-product-title @click="jump('/menu')">
      <template #left>
        <div class="i-svg-hot-products" />
      </template>
      <template #right>
        <div>
          <span class="green">{{ hots_current < 10 ? `0${hots_current + 1}` : hots_current + 1 }}</span>
          <span class="green">/</span>
          <span class="text-[28rpx]">{{ hots.length < 10 ? `0${hots.length}` : hots.length }}</span>
        </div>
      </template>
    </index-product-title>
    <index-carousel-hot v-model:current="hots_current" :list="hots" />
    <index-product-title @click="jump('/menu')">
      <template #left>
        <div class="i-svg-diy-products" />
      </template>
      <template #right>
        <div class="underline underline-offset-3">
          查看更多>>
        </div>
      </template>
    </index-product-title>
    <index-product-title @click="jump('/menu')">
      <template #left>
        <div class="i-svg-push-products" />
      </template>
      <template #right>
        <div class="underline underline-offset-3">
          查看更多>>
        </div>
      </template>
    </index-product-title>

    <index-product-switch-type v-model:current="notebook_type" :list="notebook_type_list" />

    <index-about src="/static/images/about_us.png" @click="jump('/me')" />
  </div>
</template>

<style lang="scss" scoped>
    .index {
        margin-top: calc((var(--navbar-heigth-all) - var(--navbar-top)) * -1);
    }
</style>

<route type="home" lang="json">
{
    "layout": "home"
}
</route>
