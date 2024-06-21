<script setup lang="ts">
const { detail, isDiy, types } = storeToRefs(useProductStore())
const { products } = storeToRefs(useBuyStore())
const { getProductDetail, categorys, getCategorys } = useProductStore()
const { getGamesList, getModificationList, configurationList, addConfiguration } = useDiyStore()
const { addProduct } = useBuyStore()

const productId = ref<Product['id']>()
interface PageReq {
  id: Product['id']
}

const addBuyCar = () => {
  addProduct({
    ...detail.value,
    quantity: 1,
    select: false,
    delete: false,
  })
  uni.showToast({
    title: '添加成功',
    icon: 'success',
  })
}

// 展示选中项
const showSelected = ref<selectItem[]>([])
// swiper当前位置
const current = ref<number>(0)
// 改配的弹窗
const changeAllocation = ref<boolean>(false)
// 显示选择游戏弹窗
const showGames = ref<boolean>(false)
//  swiper 列表
const swiperList = ref<gamesList[]>([])
// 获取请求列表的参数
const getModificationListParams = ref<Modification>({
  productTypeParentID: 0,
  productTypeID: 0,
  page: 1,
  pageSize: 10,
})
// 配置弹窗的显示列表
const ModificationList = ref<any>([])
// 打开的是第几项配置
const openIndex = ref<number>(0)

// 切换 swiper
const changeSwiperFn = (value: number) => {
  current.value = value
}

// 获取配置列表数据
const getAllocationList = async () => {
  ModificationList.value = await getModificationList(getModificationListParams.value)
}

// 打开选择配置组件的弹窗
const openSelectPop = async (index: number) => {
  openIndex.value = index
  changeAllocation.value = true
  getModificationListParams.value.productTypeParentID = categorys.components.value
  await getCategorys('components', 1, 20)
  getModificationListParams.value.productTypeID = types.value[index].id
  // 获取配置列表
  await getAllocationList()
}

// 筛选弹窗开关
const filte = ref(false)
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = (name, value) => {
  switch (name) {
    case 'filte':
      filte.value = Boolean(value) || !filte.value
      break
    default:
      break
  }
}

// 确定筛选项
const confirmFn = (selected: selectItem[]) => {
  showSelected.value = selected
  filte.value = false
}

// 移除筛选项
const remove = (index: number) => {
  showSelected.value.splice(index, 1)
}

// 替换 选配 组件
const replaceAllocation = (index: number) => {
  detail.value.params[openIndex.value].id = ModificationList.value[index].id
  detail.value.params[openIndex.value].product = ModificationList.value[index]
  changeAllocation.value = false
  ModificationList.value = []
}

// 立即购买
const buyNow = async () => {
  const params = ref<addConfiguration>({ params: [] })
  detail.value.params.forEach((item) => {
    params.value.params.push({ productID: item.id, number: 1 })
  })
  // 新增配置单
  await addConfiguration(params.value)
  // 提交订单
  // await submit()
}

onLoad(async (params) => {
  const req = params as PageReq
  if (req.id) {
    productId.value = Number(req.id)
  }
  await configurationList({ page: 1, pageSize: 10 })
})
onShow(async () => {
  const gemelist = await getGamesList() || []
  swiperList.value = [...gemelist, ...gemelist]
  if (productId.value) {
    await getProductDetail(productId.value)
  }
  else {
    if (productId.value) {
      detail.value = {
        typeID: 6,
      } as Product
    }
  }
})
</script>

<template>
  <div class="detail">
    <navbar-back text="商品详情" />
    <div class="banner">
      <product-banner :list="detail.banner" />
    </div>
    <template v-if="isDiy">
      <div class="top">
        <div class="wrap">
          <div class="title">
            {{ detail.name || '自由定制' }}
          </div>
          <div class="desc">
            {{ detail.description }}
          </div>
          <div class="more">
            <div class="price">
              <span>￥</span>
              <span>{{ detail.tagPrice || 0 }}</span>
            </div>
            <div class="btns">
              <div class="btn">
                <div class="i-icons-share" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="info">
      <template v-if="isDiy">
        <product-diy :params="detail.params" @change="openSelectPop" />
      </template>
      <template v-else>
        <product-info :info="detail" />
      </template>
    </div>

    <div v-if="isDiy" class="swiper">
      <div
        class="content"
        :style="{ backgroundImage: swiperList.length !== 0 ? `url(https://file.yjzj.com/${swiperList[current]?.cover || ''}` : `url(${StaticUrl('/images/login-bg.png')})` }"
      >
        <product-swiper-box
          :list="swiperList" :pcurrent="current" :params="detail.params"
          @select-games="showGames = true" @change-swiper="changeSwiperFn"
        />
      </div>
    </div>

    <common-popup :show="showGames" name="选择游戏" @close="showGames = false">
      <div>
        <product-select-games :list="swiperList" />
      </div>
    </common-popup>

    <common-popup :show="changeAllocation" name="修改配置" height="80%" @close="changeAllocation = false">
      <div>
        <div class="select">
          <navbar-back text="选择组件" />
          <common-search />
          <common-sort-filter :has-layout="false" @change="onChange" />
          <div v-if="showSelected.length" class="showSelected">
            <div>筛选条件：</div>
            <div v-for="(item, index) in showSelected" :key="index" class="selectedItem">
              {{
                item.name
              }}
              <div class="i-icons-closed" @click="remove(index)" />
            </div>
          </div>
          <common-popup :show="filte" name="筛选" @close="filte = false">
            <product-filter-list @confirm="confirmFn" />
          </common-popup>
          <div class="commodity_list">
            <product-module-select :list="ModificationList" @confirm="replaceAllocation" />
          </div>
        </div>
      </div>
    </common-popup>

    <div class="operation">
      <div class="wrap">
        <div class="left">
          <div class="item">
            <div class="icon">
              <div class="i-icons-share" />
            </div>
            <div class="name">
              分享
            </div>
          </div>
          <div class="item" @click="() => Jump('/pages/buy/buy')">
            <div class="icon">
              <div class="i-icons-buy" />
              <div v-if="products && products.length" class="num">
                {{ products.length }}
              </div>
            </div>
            <div class="name">
              购物车
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="btn" @click="addBuyCar">
              加入购物车
            </div>
          </div>
          <div class="item">
            <div class="btn" @click="buyNow">
              立即购买
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

  .swiper {
    padding: 32rpx;

    .content {
      padding: 32rpx 22rpx;
      border-radius: 32rpx;
      background-size: cover;
      background-position: left
    }
  }

  .operation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--tabbar-height-all);
    background-color: rgba(#444444, 0.6);
    backdrop-filter: blur(48rpx);
    z-index: 100;
    box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);

    .wrap {
      height: calc(100% - env(safe-area-inset-bottom));
      @apply flex-between;
      padding: 0 32rpx;
      gap: 40rpx;

      .left,
      .right {
        height: 100%;
        @apply flex-between;
      }

      .left {
        margin-left: -16rpx;

        .item {
          height: 100%;
          padding: 0 24rpx;
          @apply flex-center;
          flex-direction: column;

          .icon {
            @apply flex-center;
            font-size: 40rpx;
            position: relative;

            .num {
              $size: 40rpx;
              position: absolute;
              top: calc($size / 4 * -1);
              right: calc($size / 2 * -1);
              @apply flex-center;

              font-size: 20rpx;
              color: #fff;
              width: $size;
              height: $size;
              border-radius: 50%;
              background-color: rgba(245, 63, 63, 1);
            }
          }

          .name {
            font-size: 20rpx;
            line-height: 40rpx;
            font-weight: 400;
          }
        }
      }

      .right {
        justify-content: center;

        .item {
          color: rgba(19, 17, 18, 1);
          padding: 10rpx 40rpx;
          padding-right: 50rpx;
          position: relative;
          z-index: 0;

          --path: polygon(90.957% 78.538%, 98.117% 39.269%, 98.117% 39.269%, 98.844% 34.141%, 99.226% 28.82%, 99.288% 23.477%, 99.052% 18.285%, 98.544% 13.418%, 97.786% 9.049%, 96.802% 5.349%, 95.616% 2.493%, 94.252% 0.652%, 92.733% 0%, 9.836% 0%, 9.836% 0%, 8.241% 0.491%, 6.727% 1.912%, 4.027% 7.235%, 2.881% 10.983%, 1.898% 15.353%, 1.098% 20.267%, 0.501% 25.647%, 0.129% 31.417%, -0% 37.5%, -0% 62.5%, -0% 62.5%, 0.129% 68.583%, 1.898% 84.647%, 2.881% 89.016%, 4.027% 92.765%, 5.316% 95.814%, 6.727% 98.088%, 8.241% 99.509%, 9.836% 100%, 80.189% 100%, 81.468% 99.762%, 82.723% 99.059%, 83.946% 97.905%, 85.129% 96.318%, 86.265% 94.311%, 87.345% 91.901%, 88.362% 89.103%, 89.309% 85.933%, 90.176% 82.406%, 90.957% 78.538%);

          &::after {
            content: "";
            position: absolute;
            z-index: -1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            clip-path: var(--path);
            transform-origin: center center;
            background-color: #fff;
          }

          &:last-child {
            &::after {
              background-color: #a7f522;
              transform: rotate(180deg) translateX(12rpx);
            }

            &::before {
              content: "";
              position: absolute;
              z-index: -1;
              left: 8rpx;
              top: 8rpx;
              width: 100%;
              height: 100%;
              transform-origin: center center;
              transform: rotate(180deg) translateX(12rpx);
              clip-path: var(--path);
              background-color: rgba($color: #a7f522, $alpha: 0.2);
            }
          }

          .btn {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
          }
        }
      }
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
}
</style>
