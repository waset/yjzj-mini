<script setup lang="ts">
const { getProducts, getCategorys } = useDiyStore()
const { categorys, detail } = storeToRefs(useProductStore())
const { types, peripheral } = storeToRefs(useDiyStore())
// 列表请求参数
const listParams = ref({
  typeID: 0,
  typeParentID: 0,
  order: '',
  sort: '',
  name: '',
  page: 1,
  pageSize: 20,
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
}
// 打开列表
const setShow = async () => {
  peripheral.value = []
  shows.value = true
  await getCategorys(1, 20)
  nowType.value = types.value[0].id
  listParams.value.typeID = nowType.value
  listParams.value.typeParentID = categorys.value.peripherals.value
  // 获取列表
  getlistFun()
}

const loadmoreFn = async () => {
  listParams.value.page += 1

  await getProducts(listParams.value)
}

const cancleFn = () => {
  shows.value = false
}

// 设置排序的请求参数
const setSortGet = async (name: string, value: number) => {
  peripheral.value = []
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
}

// 筛选
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = async (name, value) => {
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
  nowType.value = item.id
  listParams.value.typeID = nowType.value || 0
  await getProducts(listParams.value)
}

// 确认选购
const addPeriheralsFn = () => {
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
      <div>
        <scroll-view scroll-x class="scroll-h">
          <div class="items">
            <template v-for="(item, index) in types" :key="index">
              <div class="item" @click="setNowType(item)">
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
        <common-search
          padding="48rpx 0rpx" :value="listParams.name" is-input @update:value="(val) => {
            listParams.name = val
            listParams.page = 1
            getlistFun()
          }"
        />
        <common-sort-filter :has-layout="false" padding="0 0 32rpx 0" @change="onChange" />
      </div>
      <div>
        <product-custom-peripheralitem ref="ProductPeripheralItem" @loadmore="loadmoreFn" />
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
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
