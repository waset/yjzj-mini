<script setup lang="ts">
const { getProducts, getCategorys } = useDiyStore()
const { categorys, detail } = storeToRefs(useProductStore())
const { types, peripheral } = storeToRefs(useDiyStore())
interface listPar {
  productTypeID?: number
  productTypeParentID?: number
  order?: string
  sort?: string
  keywords?: string
  page: number
  pageSize: number
}

// 列表请求参数
const listParams = ref<listPar>({
  page: 1,
  pageSize: 10,
  productTypeParentID: 5,
})

// 列表组do
const ProductPeripheralItem = ref<ComponentInstance['ProductCustomPeripheralitem']>()
// 外设列表弹窗
const shows = ref<boolean>(false)
// 当前分类
const nowType = ref<number>()

// 请求列表的函数
const getlistFun = async () => {
  peripheral.value = []
  listParams.value.page = 1

  await getProducts(listParams.value)
  peripheral.value.forEach((item: any) => {
    detail.value?.perihera.forEach((x) => {
      if (item.id === x.id) {
        item.number = x.number
      }
    })
  })

  ProductPeripheralItem.value?.Processing()
}
// 打开列表
const setShow = async () => {
  peripheral.value = []
  shows.value = true
  await getCategorys(1, 20)
  nowType.value = types.value[0].id
  listParams.value.productTypeID = nowType.value
  listParams.value.productTypeParentID = categorys.value.peripherals.value
  // 获取列表
  getlistFun()
  ProductPeripheralItem.value?.showEvery()
}

const loadmoreFn = async () => {
  listParams.value.page += 1

  await getProducts(listParams.value)

  ProductPeripheralItem.value?.Processing()
}

const cancleFn = () => {
  shows.value = false
}

// 设置排序的请求参数
const setSortGet = async (name: string, value: number) => {
  peripheral.value = []
  listParams.value.page = 1
  listParams.value.order = name
  if (value === 0) {
    listParams.value.sort = 'asc'
  }
  else {
    listParams.value.sort = 'desc'
  }
  if (name === 'all') {
    listParams.value.order = ''
    listParams.value.sort = ''
  }
  listParams.value.page = 1
  await getProducts(listParams.value)

  // ProductPeripheralItem.value?.showEvery()
  ProductPeripheralItem.value?.Processing()
}
const totop = ref<number>(0)
// 筛选
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = async (name, value) => {
  // 设置 列表返回top 0 顶部
  totop.value = 0
  switch (name) {
    case 'filte':
      break
    case 'all':
      setSortGet('all', value || 0)
      break
    case 'price':
      setSortGet('sell_price', value || 0)
      break
    case 'sales':
      setSortGet('sell_number', value || 0)
      break
  }
}

const listTop = ref(0)

// 设置当前分类
const setNowType = async (item: any) => {
  peripheral.value = []
  listParams.value.page = 1
  nowType.value = item.id
  listParams.value.productTypeID = nowType.value || 0
  await getProducts(listParams.value)
  ProductPeripheralItem.value?.Processing()
  listTop.value = 0
}

// 确认选购
const addPeriheralsFn = () => {
  ProductPeripheralItem.value?.confirmSelect()
  shows.value = false
}

const ProductselectPeripheralItem = ref<ComponentInstance['ProductCustomSelectPeripheral']>()

// 已选外设弹窗
const selectshows = ref<boolean>(false)
// 展示已选
const showSelectedFn = () => {
  // 点击已选 弹出啊 已选弹窗
  selectshows.value = true
}

// 合计
const totalPrice = computed(() => {
  let result = 0
  detail.value?.perihera?.forEach((item: any) => {
    result += (item.number * Number(item.sellPrice))
  })
  return result
})
// 数量
const totalNum = computed(() => {
  let result = 0
  detail.value?.perihera?.forEach((item: any) => {
    result += item.number
  })
  return result
})
const closed = () => {
  ProductPeripheralItem.value?.closed()
}
// 查看配置详情的数据
const showConfigs = ref<any | null>(null)
const showConfigsSwitch = ref<boolean>(false)
const checkInfo = (index: number) => {
  showConfigs.value = detail.value?.perihera[index]
  showConfigsSwitch.value = true
}

defineExpose({
  setShow,
})
</script>

<template>
  <div class="body">
    <common-popup v-model:show="shows" name="选购外设" height="80%">
      <template #top>
        <div class="tabs" @touchmove.prevent.stop @mousemove.prevent.stop>
          <scroll-view scroll-x class="scroll-h">
            <div class="items">
              <template v-for="(item, index) in types" :key="index">
                <div
                  class="item" :class="{
                    active: listParams.productTypeID === item.id,
                  }" @click="setNowType(item)"
                >
                  <div class="logo">
                    <product-image :src="item.logo" width="160rpx" :background="nowType === item.id" />
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
              </template>
            </div>
          </scroll-view>
        </div>
      </template>
      <scroll-view
        class="scroll" scroll-y :scroll-top="listTop" enable-flex @scrolltolower="loadmoreFn" @scroll="({ scrollTop }:any) => {
          listTop = scrollTop
        }"
      >
        <div class="scrollpb">
          <common-search
            padding="0 0 32rpx 0" :value="listParams.keywords" is-input @update:value="(val:any) => {
              listParams.keywords = val
              listParams.page = 1
              getlistFun()
            }"
          />
          <common-sort-filter :has-layout="false" padding="0 0 32rpx 0" @change="onChange" />
          <product-custom-peripheralitem ref="ProductPeripheralItem" />
        </div>
      </scroll-view>

      <div>
        <product-custom-add-periheral
          @add-periherals="addPeriheralsFn" @show-selected="showSelectedFn"
          @cancle="cancleFn"
        />
      </div>
    </common-popup>

    <common-popup v-model:show="selectshows" name="已选外设" height="70%" @close="closed">
      <div>
        <product-custom-select-peripheral ref="ProductselectPeripheralItem" @checkload="checkInfo" />
      </div>
      <template #footer>
        <div class="bottom" @touchmove.prevent.stop @mousemove.prevent.stop>
          <div class="numberbox">
            <div class="total">
              合计 <span class="temcolor pricefs">￥{{ totalPrice || 0 }}</span>
            </div>
            <div class="num">
              数量 <span class="temcolor pricefs">x{{ totalNum }}</span>
            </div>
          </div>
        </div>
      </template>
    </common-popup>

    <common-popup v-model:show="showConfigsSwitch" name="配置详情">
      <buys-show-alloaction :config="showConfigs" />
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
.body {
  .tabs {
    padding-bottom: 20rpx !important;
  }

  .scroll {
    overflow: scroll;
    overscroll-behavior-block: contain;

    .scrollpb {
      padding-bottom: 80rpx;
    }
  }

  .bottom {
    padding: 32rpx;
    padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(#444444, 0.6);
    backdrop-filter: blur(48rpx);
    color: #f5f5f5;
    z-index: 9;
    box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);
    @apply flex-between;

    .numberbox {
      width: 100%;
      @apply flex-between;
    }

    .total,
    .num {
      font-size: 28rpx;
    }

    .temcolor {
      margin-left: 8rpx;
      color: #A7F522;
    }

    .pricefs {
      font-size: 40rpx;
      font-weight: 600;
    }

    .right {
      display: flex;
      align-items: center;
      color: #000;
      position: relative;
      width: 420rpx;
      height: 80rpx;

      .confirm,
      .cancel,
      .confirm2 {
        position: absolute;
        right: 32rpx;
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        font-weight: 400;
        // margin-right: 40rpx;
        color: #000;
        text-align: center;
        z-index: 10;
        padding-left: 50rpx;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 26rpx;
          right: 0;
          bottom: 0;
          border-radius: 30rpx;
          height: 80rpx;
          background: #A7F522;
          transform: skewX(-30deg);
          z-index: -1;
          border-top-left-radius: 20rpx;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: -20rpx;
          width: 162rpx;
          height: 80rpx;
          border-radius: 25rpx;
          background: #A7F522;
          z-index: -1;

        }

      }

      .confirm2 {
        position: absolute;
        top: 8rpx;
        left: 8rpx;
        z-index: -2;

        &::after {
          background-color: #57683B;
        }

        &::before {
          background-color: #57683B;
        }
      }

      .cancel {
        left: 6rpx;
        padding-left: 46rpx;
        padding-right: 67rpx;

        &::after {
          left: 24rpx;
          border-radius: 30rpx;
          height: 80rpx;
          background: #ffffff;
          transform: skewX(-30deg);
          z-index: -1;
          border-bottom-right-radius: 20rpx;
        }

        &::before {

          right: 21rpx;
          width: 200rpx;
          height: 80rpx;
          border-radius: 25rpx;
          background: #ffffff;
          z-index: -1;

        }
      }

    }

  }
}

.scroll-h {
  white-space: nowrap;
  width: 100%;

  .items {
    display: flex;
    flex-wrap: nowrap;

    .item {

      @apply flex-center;
      display: inline-block;
      text-align: center;
      width: 200rpx;
      padding: 0 16rpx;
      scroll-snap-align: left;
      scroll-snap-stop: always;

      .name {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        padding: 16rpx 0;
        color: #BEBEBE;
      }

      &.active {
        .name {
          color: #A7F522;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
