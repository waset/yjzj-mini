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
const { addProduct } = useBuyStore()
/**
 * 加入购物车
 */
const addBuyCar = () => {
  if (!detail.value) {
    return
  }
  addProduct({
    quantity: 1,
    select: false,
    delete: false,
    ...detail.value,
  })
  uni.showToast({
    title: '添加成功',
    icon: 'success',
  })
}

const buyNow = () => {
  Jump('/pages/buy/submitOrder')
}
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

  <div class="bottom">
    <product-operation @add-car="addBuyCar" @buy-now="buyNow" />
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
