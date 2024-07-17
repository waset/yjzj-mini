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

// 设置当前分类
const setNowType = async (item: any) => {
  peripheral.value = []
  listParams.value.page = 1
  nowType.value = item.id
  listParams.value.productTypeID = nowType.value || 0
  await getProducts(listParams.value)
  ProductPeripheralItem.value?.Processing()
}

// 确认选购
const addPeriheralsFn = () => {
  ProductPeripheralItem.value?.confirmSelect()
  shows.value = false
}

// 展示已选
const showSelectedFn = () => {
  // 点击已选 弹出啊 已选弹窗
  ProductPeripheralItem.value?.openSelect()
}

defineExpose({
  setShow,
})
</script>

<template>
  <div class="body">
    <common-popup v-model:show="shows" name="选购外设" height="80%">
      <div class="tabs">
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
      <div>
        <scroll-view scroll-y class="scroll" :enable-flex="true" :scroll-top="totop" @scrolltolower="loadmoreFn">
          <div class="scrollpb">
            <common-search
              padding="0 0 32rpx 0" :value="listParams.keywords" is-input @update:value="(val) => {
                listParams.keywords = val
                listParams.page = 1
                getlistFun()
              }"
            />
            <common-sort-filter :has-layout="false" padding="0 0 32rpx 0" @change="onChange" />
            <product-custom-peripheralitem ref="ProductPeripheralItem" @loadmore="loadmoreFn" />
          </div>
        </scroll-view>
      </div>

      <div>
        <product-custom-add-periheral
          @add-periherals="addPeriheralsFn" @show-selected="showSelectedFn"
          @cancle="cancleFn"
        />
      </div>
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
.body {
  .tabs {
    padding-bottom: 20rpx !important;
  }

  .scroll {
    height: 50vh;

    .scrollpb {
      padding-bottom: 80rpx;
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
