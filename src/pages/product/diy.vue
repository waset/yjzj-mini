<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { getProductDetail } = useProductStore()
const { changeBuyType } = useSubmitOrderStore()
const { addConfiguration, collectionConfig } = useDiyStore()
const { addProduct } = useBuyStore()
interface PageReq {
  product_id: Product['id'] | null
}
onLoad(async (params) => {
  const req = params as PageReq
  if (req.product_id) {
    await getProductDetail(Number(req.product_id))
  }
})

// 是否通过检测
const isPass = () => {
  const isEmpty = (obj: any) => Object.keys(obj).length === 0
  const alloactionArr = detail.value?.params.filter(item => isEmpty(item))
  if (detail.value?.params.length === 0 || alloactionArr?.length !== 0) {
    uni.showToast({
      title: '请选择完整配置',
      icon: 'error',
    })
    return false
  }
  else {
    return true
  }
}

const DiyGameRef = ref<ComponentInstance['ProductDiyGame'] | null>(null)
// 新增配置单需要的参数
const params = ref<addConfiguration>({ params: [] })

// 生成配置单id  和收藏配置单
const allocationId = async () => {
  Object.entries(detail.value?.params || {}).forEach(([_, item]) => {
    params.value.params.push({ pID: item?.paramValue as number, num: 1 })
  })
  // 新增配置单
  const data = await addConfiguration(params.value)
  //  收藏配置单
  await collectionConfig(data.no)
  return data
}

/**
 * 立即购买
 */

const buyNow = async () => {
  await allocationId()
  if (isPass()) {
    changeBuyType('buy')
    Jump('/pages/buy/submitOrder')
  }
}

/**
 * 加入购物车
 */
const addBuyCar = async () => {
  if (!detail.value) {
    return
  }
  const data = await allocationId()
  if (detail.value) {
    // 添加配置单id
    detail.value.alloaction = data.id
    detail.value.name = `配置单${data.id}`
  }
  if (isPass()) {
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
      <product-diy-configur :params="detail?.params" @up-config="DiyGameRef?.upOptional()" />
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
