<script setup lang="ts">
const { types } = storeToRefs(useProductStore())
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
  await getProducts(
    {
      typeID: types.value[classIndex.value].id,
      typeParentID: categorys[Params.value.key].value,
    },
    1,
    20,
  )
}

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
/**
 * 页面显示获取数据
 */
onShow(async () => {
  await getCategorys(Params.value.key, 1, 20)
  await getProduct()
})
</script>

<template>
  <div class="select">
    <navbar-back text="选择组件" />
    <common-search />
    <common-sort-filter :has-layout="false" @change="onChange" />

    <div class="commodity_list">
      <product-module-select />
    </div>

    <div>
      <product-select-num-bottom />
    </div>
  </div>
</template>

<style lang="scss" soped>
.select {
  .commodity_list {
    padding: 32rpx;

  }
}
</style>
