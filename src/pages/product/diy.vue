<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { user } = storeToRefs(useUserStore())
const { getProductDetail } = useProductStore()
const { changeBuyType } = useSubmitOrderStore()
const { addConfiguration, collectionConfig, getConfigInfo } = useDiyStore()
const { addProduct } = useBuyStore()
interface PageReq {
  id: Product['id'] | null
  config_id: Product['id'] | null
}

const parr = ref<any[]>([
  { paramDesc: 'CPU' },
  { paramDesc: '主板' },
  { paramDesc: '显卡' },
  { paramDesc: '内存' },
  { paramDesc: '硬盘' },
  { paramDesc: '机箱' },
  { paramDesc: 'CPU散热器' },
  { paramDesc: '电源' },
])
const isEmpty = (obj: UserInfo) => Object.keys(obj).length === 0
onLoad(async (params) => {
  const req = params as PageReq
  if (req.id) {
    await getProductDetail(Number(req.id))
  }

  if (req.config_id) {
    detail.value = {} as Product
    detail.value.typeParentID = 6
    detail.value.params = []
    const data = await getConfigInfo(Number(req.config_id))
    data.products.forEach((item: Product, index: number) => {
      parr.value[index].paramDesc = item.typeName
      parr.value[index].paramValue = item.id
      parr.value[index].product = item
      if (item.typeName === '机箱' && detail.value) {
        detail.value.banner = item.banner
      }
    })
    detail.value.params = parr.value // 配置单params
    detail.value.alloaction = data.id // 配置单id
    detail.value.name = `配置单${data.id}` // 配置单name
    detail.value.sellPrice = data.sellPrice // 配置单价格
  }

  if (isEmpty(user.value)) {
    uni.showToast({ title: '请登录', duration: 1000, icon: 'none' })
    setTimeout(() => {
      Jump('/pages/me/login')
    }, 1000)
  }
})

// 是否通过检测
const isPass = () => {
  const isEmpty = (obj: any) => Object.keys(obj).length === 0
  // 判断配置单是否又空选项
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

// 生成配置单id  和收藏配置单
const allocationId = async () => {
  const params = ref<addConfiguration>({ params: [] })
  Object.entries(detail.value?.params || {}).forEach(([_, item]) => {
    params.value.params.push({ pID: item?.paramValue as number, num: 1 })
  })
  // 新增配置单
  const data = await addConfiguration(params.value)
  //  收藏配置单
  await collectionConfig(data.no)
  if (!detail.value?.id) {
    // 添加配置单id
    if (detail.value) {
      detail.value.alloaction = data.id
      detail.value.name = `配置单${data.id ? data.id : ''}`
    }
  }
  return data
}

// 判断每个对象中的errors 是否有值
const hasErrors = (arrayOfObjects: any) => {
  return arrayOfObjects.params.some((obj: any) => obj.product.errors && obj.product.errors.length > 0)
}
/**
 * 立即购买
 */

const buyNow = async () => {
  // 如果通过 检测是否为空
  if (isPass()) {
    // 如果没有 错误
    if (!hasErrors(detail.value)) {
      await allocationId()
      changeBuyType('buy')
      Jump('/pages/buy/submitOrder')
    }
    else {
      uni.showToast({
        title: '请检查配置单',
        icon: 'error',
      })
    }
  }
}

/**
 * 加入购物车
 */
const addBuyCar = async () => {
  if (!detail.value) {
    return
  }
  if (isPass()) {
    if (!hasErrors(detail.value)) {
      // 如果没有 错误
      await allocationId()
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
    else {
      uni.showToast({
        title: '请检查配置单',
        icon: 'error',
      })
    }
  }
}
// #ifdef MP
onShareAppMessage(async () => {
  const params = {} as any
  if (!detail.value?.id || !detail.value?.alloaction) {
    await allocationId()
  }

  if (detail.value) {
    params.id = detail.value?.alloaction || detail.value?.id
    params.inviteCode = user.value?.inviteCode
  }

  return {
    title: detail.value?.name,
    imageUrl: ShareIamgeUrl(detail.value?.banner),
    path: UrlAndParams('/pages/product/diy', params),
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
      <product-diy-configur :params="detail?.params" @upconfigs="DiyGameRef?.upOptional()" />
    </div>

    <div class="swiper">
      <product-diy-game ref="DiyGameRef" />
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
