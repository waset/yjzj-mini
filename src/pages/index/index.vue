<script setup lang="ts">
const { banners, hots, pushs } = storeToRefs(useWindowsStore())
const { getWindows } = useWindowsStore()
const { getCategorys, getProducts } = useProductStore()
const { types, products } = storeToRefs(useProductStore())

const hots_current = ref(0)

const notebook_type = ref(0)

const getProductsByType = async (type: number) => {
  products.value = []
  await getProducts({ typeID: type }, 1, 4)
}

onShow(async () => {
  await getWindows(1, 20)
  await getCategorys('laptop', 1, 4)

  if (!notebook_type.value) {
    notebook_type.value = types.value[0]?.id || 0
  }
  await getProductsByType(notebook_type.value)
})
</script>

<template>
  <div class="index">
    <navbar-logo-search />
    <index-carousel-banner :list="banners" />
    <index-product-title @click="Jump('/pages/menu/menu')">
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
    <index-carousel-hot
      v-model:current="hots_current" :list="hots"
      @click="(item) => Jump('/pages/product/detail', { id: item.id })"
    />
    <index-product-title @click="Jump('/pages/product/category', { key: 'diy' })">
      <template #left>
        <div class="i-svg-push-products" />
      </template>
      <template #right>
        <div class="underline underline-offset-3">
          查看更多>>
        </div>
      </template>
    </index-product-title>
    <index-carousel-push :list="pushs" @click="(item) => Jump('/pages/product/diy', { id: item.id })" />

    <index-product-switch-type v-model:current="notebook_type" :list="types" @change="(id) => getProductsByType(id)" />
    <index-product-list :list="products" />

    <div class="about">
      <image class="image" :src="StaticUrl('/images/about_us.png')" mode="widthFix" alt="关于我们" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .index {
    overflow: hidden;
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
