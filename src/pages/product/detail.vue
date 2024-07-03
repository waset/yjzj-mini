<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { getProductDetail } = useProductStore()

const productId = ref<Product['id']>()
interface PageReq {
  id: Product['id']
}

onLoad(async (params) => {
  const req = params as PageReq
  if (req.id) {
    productId.value = Number(req.id)
  }
})

onShow(async () => {
  await getProductDetail(productId.value)
})
</script>

<template>
  <div class="detail">
    <navbar-back text="商品详情" />
    <div class="banner">
      <product-banner :list="detail?.banner || []" />
    </div>

    <div class="info">
      <product-info :info="detail" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .detail {
    padding: 48rpx 0;

    .banner {
      padding: 0 32rpx;
    }

  }
</style>
