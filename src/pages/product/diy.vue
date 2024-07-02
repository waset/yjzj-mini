<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { getProductDetail } = useProductStore()

interface PageReq {
  product_id: Product['id'] | null
}
onLoad(async (params) => {
  const req = params as PageReq
  if (req.product_id) {
    await getProductDetail(Number(req.product_id))
  }
})

const DiyGameRef = ref<ComponentInstance['ProductDiyGame'] | null>(null)

const { addConfiguration } = useDiyStore()
/**
 * 立即购买
 */
const buyNow = async () => {
  const params = ref<addConfiguration>({ params: [] })

  Object.entries(detail.value?.configuration || {}).forEach(([_, item]) => {
    params.value.params.push({ pID: item?.paramValue as number, num: 1 })
  })

  // detail.value.configuration

  // 新增配置单
  await addConfiguration(params.value)
  // 提交订单
  // await submit()
}

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
          {{ detail?.name || '自由定制' }}
        </div>
        <div class="desc">
          {{ detail?.description }}
        </div>
        <div class="more">
          <div class="price">
            <span>￥</span>
            <span>{{ detail?.tagPrice || 0 }}</span>
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
      <product-diy-configur
        :params="detail?.configuration" @up-config="(list) => {
          DiyGameRef?.upOptional()
        }"
      />
    </div>

    <div class="swiper">
      <product-diy-game ref="DiyGameRef" :detail="detail" />
    </div>
    <div class="bottom">
      <product-operation @add-car="addBuyCar" @buy-now="buyNow" />
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

    .price {
      @apply text-green;
    }
  }

  .swiper {
    padding: 32rpx;
  }

}

.select {
  .commodity_list {
    padding: 32rpx;
    padding-bottom: 144rpx;
  }

}

.showSelected {
  font-size: 28rpx;
  padding: 32rpx 32rpx 0 32rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  flex-wrap: wrap;

  .selectedItem {
    margin-right: 16rpx;
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    padding: 8rpx 16rpx;
    background-color: #414141;
    color: #A7F522;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .i-icons-closed {
      color: #fff;
      font-size: 24rpx;
      margin-left: 8rpx;

    }
  }
}
</style>
