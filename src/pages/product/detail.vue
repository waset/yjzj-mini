<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { getProductDetail } = useProductStore()
const productId = ref<Product['id']>()

interface PageReq {
  id: Product['id']
}
onLoad(async (params) => {
  const req = params as PageReq

  productId.value = Number(req.id)
})
onShow(async () => {
  await getProductDetail(productId.value)
})

const uReadMoreRef = ref<any>(null)// 定义方法
function load() {
  if (uReadMoreRef.value) {
    uReadMoreRef.value?.init()
  }
}
</script>

<template>
  <div class="detail">
    <navbar-back text="商品详情" />
    <div class="banner">
      <product-banner :list="detail.banner" @load="load" />
    </div>
    <div class="info">
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
  </div>
</template>

<style scoped lang="scss">
  .detail {
    padding: 48rpx 0;

    .banner {
      padding: 0 32rpx;
    }

    .info {
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

        .more{
          @apply flex-between;
          font-size: 48rpx;
          line-height: 56rpx;

          .price{
            @apply text-green;
          }
        }
      }
    }
  }
</style>
