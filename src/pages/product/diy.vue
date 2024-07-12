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
  shareCode: Product['shareCode'] | null
}
const deatrr = ['CPU', '主板', '显卡', '内存', '硬盘', '机箱', 'CPU散热器', '电源']
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

// 更新配置
const updataParams = (data: any) => {
  // 分拣配置单  数据
  data.products.forEach((item: Product, index: number) => {
    // 判断 如果是前八个必选参数   放到parr 中
    if (deatrr.includes(item.typeName)) {
      parr.value[index].paramDesc = item.typeName
      parr.value[index].paramValue = item.id
      parr.value[index].product = item
      if (item.typeName === '机箱' && detail.value) {
        detail.value.banner = item.banner
      }
    }
    else {
      // 如果不是前八个必选参数  则是外设
      if (detail.value) {
        data.params.forEach((x: any) => {
          // 如果 配置单id列表中 的 pId 等于 当前外设id  则把 num 取出用作数量
          if (x.pID === item.id) {
            item.number = x.num
            detail.value?.perihera.push(item)
          }
        })
      }
    }
  })

  // console.log(detail.value, '123')
}

const isEmpty = (obj: UserInfo) => Object.keys(obj).length === 0
onLoad(async (params) => {
  const req = params as PageReq
  if (req.id) {
    await getProductDetail(Number(req.id))
  }

  if (req.config_id) {
    // 配置单 更新数据
    detail.value = {} as Product
    // 清空外设数据
    detail.value.perihera = []
    detail.value.typeParentID = 6
    // 清空配置单
    detail.value.params = []

    const data = await getConfigInfo(Number(req.config_id))
    // 分解配置单
    updataParams(data)
    detail.value.params = parr.value // 配置单params
    detail.value.alloaction = data.id // 配置单id
    detail.value.name = `配置单(${data.shareCode})` // 配置单name
    detail.value.sellPrice = data.sellPrice // 配置单价格
  }

  if (req.shareCode) {
    detail.value = {} as Product
    detail.value.typeParentID = 6
    detail.value.params = []
    const data = await getConfigInfo(0, req.shareCode)
    updataParams(data.products)
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
  const alloactionArr = detail.value?.params.filter(item => isEmpty(item.product))
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
// 预存数组
// const periheraArr = ref<any>([])
const DiyGameRef = ref<ComponentInstance['ProductDiyGame'] | null>(null)
// 新增配置单需要的参数

// 计算金额
const showPrice = computed(() => {
  let result = 0
  detail.value?.params.forEach((item) => {
    if (deatrr.includes(item.paramDesc)) {
      result += Number(item.product.sellPrice)
    }
  })
  if (detail.value?.perihera && detail.value?.perihera.length > 0) {
    detail.value?.perihera.forEach((item) => {
      result += (Number(item.sellPrice) * item.number)
    })
  }
  return result
})

// 生成配置单id  和收藏配置单
const allocationId = async () => {
  const params = ref<addConfiguration>({ params: [] })
  params.value.params = []
  Object.entries(detail.value?.params || {}).forEach(([_, item]) => {
    params.value.params.push({ pID: item?.paramValue as number, num: 1 })
  })
  Object.entries(detail.value?.perihera || {}).forEach(([_, item]) => {
    params.value.params.push({ pID: item?.id as number, num: item.number })
  })

  // 新增配置单
  const data = await addConfiguration(params.value)
  //  收藏配置单
  await collectionConfig(data.no)
  // @ts-expect-error detail.value一定有值
  detail.value.shareCode = data.shareCode

  //  如果改了配置    就会变成 配 置单xxxx
  //  如果啥都没改    还是原来的配置单

  // 添加配置单id
  if (detail.value) {
    detail.value.alloaction = data.id
    if (!detail.value.id) {
      detail.value.name = `配置单(${data.shareCode ?? ''})`
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
      // 如果有外设选配   将外设添加到 params 配置中

      // 获取配置单id
      await allocationId()
      // 切换购买状态为 diy页面下单
      changeBuyType('buy')
      // 跳转下单页面
      Jump('/pages/buy/submitOrder', {}, 1)
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
  if (!isPass()) {
    return {
      title: '自由定制',
      path: '/pages/product/diy',
    }
  }

  if (!detail.value?.shareCode) {
    await allocationId()
  }

  params.shareCode = detail.value?.shareCode
  params.inviteCode = user.value?.inviteCode

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
      <product-top :info="detail" :price="showPrice" />
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
