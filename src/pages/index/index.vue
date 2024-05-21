<script setup lang="ts">
const { getWindows, getWindowsByKeyValue } = useWindowsStore()
const { getCategorys, getProducts } = useProductStore()
const { types, products } = storeToRefs(useProductStore())

const banners = ref<WindowsImage[]>([])
const hots = ref<Product[]>([])
const pushs = ref<Product[]>([])

const hots_current = ref(0)

const notebook_type = ref(0)

onShow(async () => {
  await getWindows(1, 20)
  banners.value = getWindowsByKeyValue('name', '小程序 banner')?.content.images || []
  hots.value = getWindowsByKeyValue('name', '小程序 热门产品')?.content.products || []
  pushs.value = getWindowsByKeyValue('name', '小程序 推荐定制')?.content.products || []

  await getCategorys('laptop', 1, 3)
  notebook_type.value = types.value[0]?.id || 0

  await getProductsByType(notebook_type.value)
})

async function getProductsByType(type: number) {
  getProducts({ typeID: type }, 1, 4)
}
</script>

<template>
  <div class="index">
    <navbar-logo-search />
    <index-carousel-banner :list="banners" />
    <index-product-title @click="jump('/menu')">
      <template #left>
        <div class="i-svg-hot-products" />
      </template>
      <template #right>
        <div class="mt-[-8rpx] pr-[8rpx] text-[52rpx] lh-[50rpx]">
          <span class="text-green">{{ hots_current < 10 ? `0${hots_current + 1}` : hots_current + 1 }}</span>
          <span class="text-[40rpx] text-green">/</span>
          <span class="text-[40rpx]">{{ hots.length < 10 ? `0${hots.length}` : hots.length }}</span>
        </div>
      </template>
    </index-product-title>
    <index-carousel-hot v-model:current="hots_current" :list="hots" />
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
    <index-carousel-push :list="pushs" />

    <index-product-switch-type
      v-model:current="notebook_type" :list="types"
      @change="async (id) => await getProductsByType(id)"
    />
    <index-product-list :list="products" />

    <div class="about">
      <image class="image" :src="StaticUrl('/images/about_us.png')" mode="widthFix" alt="关于我们" @click="jump('/me')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    margin-top: calc((var(--navbar-height-all) - var(--navbar-top)) * -1);

    .about {
      @apply flex-center;

      .image {
        @apply w-full;
      }
    }
  }
</style>

<route type="home" lang="json">
{
  "layout": "home"
}
</route>
