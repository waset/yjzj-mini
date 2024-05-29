<script setup lang="ts">
const { detail, isDiy } = storeToRefs(useProductStore())
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
  if (productId.value) {
    await getProductDetail(productId.value)
  }
  else {
    detail.value = {
      typeID: 6,
    } as Product
  }
})
</script>

<template>
  <div class="detail">
    <navbar-back text="商品详情" />
    <div class="banner">
      <product-banner :list="detail.banner" />
    </div>
    <div class="top">
      <div class="wrap">
        <div class="title">
          {{ detail.name }}
        </div>
        <div class="desc">
          {{ detail.description }}
        </div>
        <div class="more">
          <div class="price">
            <span>￥</span>
            <span>{{ detail.tagPrice }}</span>
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
      <template v-if="isDiy">
        <product-diy />
      </template>
      <template v-else>
        <product-info :info="detail" />
      </template>
    </div>
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
    }
  }
</style>
