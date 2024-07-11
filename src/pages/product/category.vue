<script setup lang="ts">
const { types, products, lastPage } = storeToRefs(useProductStore())
const { categorys, getCategorys, getProducts } = useProductStore()
/**
 * 当前产品类目
 */
const category = ref<CategorysItem>({} as CategorysItem)
/**
 * 页面参数
 */
interface PageReq {
  key: CategoryKey
}
const Params = ref({} as PageReq)
// 搜索参数
const searchName = ref<string | number>('')
// 第几页
const pages = ref(1)
// 排序参数
const sortParams = ref({ order: '', sort: '' })
/**
 * 页面加载获取数据
 */
onLoad((params) => {
  Params.value = params as PageReq
  category.value = categorys[Params.value.key]
})
/**
 * 当前类目索引
 */
const classIndex = ref(0)
/**
 * 获取当前类目产品
 */
const getProduct = async () => {
  await getProducts({
    typeID: types.value[classIndex.value].id,
    typeParentID: categorys[Params.value.key].value,
    name: searchName.value || undefined,
    ...sortParams.value,
  }, pages.value, 20)
}
// 清空列表再请求
async function cleargetProduct() {
  pages.value = 1
  products.value = []
  await getProduct()
}
/**
 * 页面显示获取数据
 */
onShow(async () => {
  await getCategorys(Params.value.key, 1, 20)
  await cleargetProduct()
})

const layout = ref(true)
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = (name, value) => {
  switch (name) {
    case 'layout':
      layout.value = !value
      break
    case 'price':
      sortParams.value.order = 'sell_price'
      sortParams.value.sort = value === 0 ? 'asc' : 'desc'
      cleargetProduct()
      break
    case 'sales':
      sortParams.value.order = 'sell_number'
      sortParams.value.sort = value === 0 ? 'asc' : 'desc'
      cleargetProduct()

      break
    case 'all':
      sortParams.value.order = ''
      sortParams.value.sort = ''
      cleargetProduct()

      break
    default:
      break
  }
}

// 输入框输入事件
async function handleUpdate(e: string | number) {
  searchName.value = e
  products.value = []
  getProduct()
}
// 触底加载分页
onReachBottom(async () => {
  if (pages.value < lastPage.value) {
    pages.value++
    await getProducts({
      typeID: types.value[classIndex.value].id,
      typeParentID: categorys[Params.value.key].value,
      name: searchName.value || undefined,
    }, pages.value, 20, true)
  }
  else {
    uni.showToast({
      title: '没有更多了',
      icon: 'none',
    })
  }
})

const goDetails = (item: Product) => {
  if (item.typeParentID === categorys.diy.value) {
    Jump('/pages/product/diy', { id: item.id })
  }
  else {
    Jump('/pages/product/detail', { id: item.id })
  }
}
</script>

<template>
  <div class="category">
    <navbar-back :text="category.label" />
    <common-search :is-input="true" @update:value="handleUpdate" />
    <div class="classify">
      <div class="items">
        <template v-for="(item, index) in types" :key="index">
          <div
            class="item" :class="{
              active: classIndex === index,
            }" @click="async () => {
              classIndex = index
              await cleargetProduct()
            }"
          >
            <div class="logo">
              <product-image :src="item.logo" width="160rpx" :background="classIndex === index" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <common-sort-filter @change="onChange" />
    <template v-if="products && products.length">
      <div class="list">
        <product-list
          :list="products" :layout="layout ? 'grids' : 'rows'" @click="goDetails"
        />
      </div>
    </template>
    <template v-else>
      <common-empty text="商品列表为空~" />
    </template>
  </div>
</template>

<style lang="scss" soped>
.category {
  .classify {
    padding-bottom: 32rpx;

    .items {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      .item {
        @apply flex-center;
        flex-direction: column;
        padding: 0 16rpx;

        scroll-snap-align: left;
        scroll-snap-stop: always;

        &:first-child {
          padding-left: 64rpx;
        }

        &:last-child {
          padding-right: 64rpx;
        }

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
}
</style>
