<script setup lang="ts">
// const props = defineProps<{
//   parentId: number
// }>()
const { types } = storeToRefs(useProductStore())
const { categorys, getCategorys, getProducts } = useProductStore()

// const { getModificationList } = useDiyStore()
/**
 * 当前产品类目
 */
// const category = ref<CategorysItem>({} as CategorysItem)
/**
 * 页面参数
 */
interface PageReq {
  key: CategoryKey
}
const Params = ref({} as PageReq)

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

// const getModificationListParams = ref<Modification>({
//   productTypeParentID: props.parentId,
//   page: 1,
//   pageSize: 10,
// })

// 展示选中项
const showSelected = ref<selectItem[]>([])
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
/**
 * 页面显示获取数据
 */
onShow(async () => {
  await getCategorys(Params.value.key, 1, 20)
  await getProduct()
})

onLoad(() => {
  // Params.value = params as PageReq
  // category.value = categorys[Params.value.key]

})
</script>

<template>
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
        <div class="icon i-icons-closed" @click="remove(index)" />
      </div>
    </div>
    <common-popup :show="filte" name="筛选" @close="filte = false">
      <product-filter-list @confirm="confirmFn" />
    </common-popup>
    <div class="commodity_list">
      <!-- <product-module-select /> -->
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

    .icon {
      color: #fff;
      font-size: 24rpx;
      margin-left: 8rpx;

    }
  }
}
</style>
