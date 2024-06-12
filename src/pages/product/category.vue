<script setup lang="ts">
const { types, products } = storeToRefs(useProductStore())
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
  }, 1, 20)
}
/**
 * 页面显示获取数据
 */
onShow(async () => {
  await getCategorys(Params.value.key, 1, 20)
  await getProduct()
})

const layout = ref(true)
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = (name, value) => {
  switch (name) {
    case 'layout':
      layout.value = !value
      break

    default:
      break
  }
}
</script>

<template>
  <div class="category">
    <navbar-back :text="category.label" />
    <common-search />
    <div class="classify">
      <div class="items">
        <template v-for="(item, index) in types" :key="index">
          <div
            class="item" :class="{
              active: classIndex === index,
            }" @click=" async () => {
              classIndex = index
              await getProduct()
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
    <div class="list">
      <product-list
        :list="products" :layout="layout ? 'grids' : 'rows'" @click="(item) => {
          Jump('/pages/product/detail', { id: item.id })
        }"
      />
    </div>
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
