<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { user } = storeToRefs(useUserStore())
const { getProductDetail } = useProductStore()
const { changeBuyType } = useSubmitOrderStore()
const productId = ref<Product['id']>()
interface PageReq {
  id: Product['id']
  inviteCode: UserInfo['inviteCode']
}

onLoad(async (params) => {
  try {
    const req = params as PageReq
    if (req.id) {
      productId.value = Number(req.id)
    }
  }
  catch (error) {

  }
})
const { addProduct } = useBuyStore()
/**
 * 加入购物车
 */
const addBuyCar = () => {
  try {
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
  catch (error) {

  }
}

const buyNow = () => {
  changeBuyType('buy')
  Jump('/pages/buy/submitOrder')
}
onShow(async () => {
  await getProductDetail(productId.value)
})
// #ifdef MP
onShareAppMessage(() => {
  const params = {} as any
  if (detail.value) {
    params.id = detail.value.id
    params.inviteCode = user.value?.inviteCode
  }

  return {
    title: detail.value?.name,
    imageUrl: ShareIamgeUrl(detail.value?.banner),
    path: UrlAndParams('/pages/product/detail', params),
  }
})
// #endif
</script>

<template>
  <div class="detail">
    <navbar-back text="商品详情" />
    <div class="banner">
      <product-banner :list="detail?.banner || []" />
    </div>

    <div class="top">
      <div class="wrap">
        <div class="title">
          {{ detail?.name }}
        </div>
        <div class="desc">
          {{ detail?.description }}
        </div>
        <div class="more">
          <div class="price">
            <span>￥</span>
            <span>{{ detail?.sellPrice || 0 }}</span>
          </div>
          <div class="btns">
            <div class="btn">
              <div class="i-icons-share" />
            </div>
          </div>
        </div>
      </div>
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

  .top {
    padding: 32rpx;

    .wrap {
      padding: 32rpx;
      border-radius: 16rpx;
      background-color: #000;
      word-break: break-all;

      .title {
        font-size: 36rpx;
        line-height: 48rpx;
        color: rgba(245, 245, 245, 1);
      }

      .desc {
        font-size: 24rpx;
        line-height: 36rpx;
        color: #bebebe;
        padding: 16rpx 0;
      }

      .more {
        @apply flex-between;
        font-size: 48rpx;
        line-height: 56rpx;

        .price {
          @apply text-green;
        }
      }
    }

    .price {
      @apply text-green;
    }
  }

}
</style>
