<script lang="ts" setup>
const { searchList, lastpage, searchParams } = storeToRefs(useSearchStore())
const { getsearch, clearSearch } = useSearchStore()
const { categorys } = useProductStore()
const layout = ref(true)
// 进入不显示空数据状态
const showNodata = ref(false)
// 搜索数据
function handleUpdate(e: string) {
  showNodata.value = true
  searchParams.value.name = e
  clearSearch()
}

const onChange: ComponentInstance['CommonSortFilter']['onChange'] = (name, value) => {
  switch (name) {
    case 'layout':
      layout.value = !value
      break
    case 'price':
      searchParams.value.order = 'sell_price'
      searchParams.value.sort = value === 0 ? 'asc' : 'desc'
      clearSearch()
      break
    case 'sales':
      searchParams.value.order = 'sell_number'
      searchParams.value.sort = value === 0 ? 'asc' : 'desc'
      clearSearch()
      break
    case 'all':
      searchParams.value.order = ''
      searchParams.value.sort = ''
      clearSearch()
      break
    default:
      break
  }
}
// 触底加载分页
onReachBottom(() => {
  if (searchParams.value.page < lastpage.value) {
    getsearch()
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
  <div>
    <navbar-back text="搜索" />
    <common-search :is-input="true" :is-focus="true" @update:value="handleUpdate" />
    <template v-if="showNodata">
      <common-sort-filter @change="onChange" />
      <template v-if="searchList && searchList.length">
        <product-list
          :list="searchList" :layout="layout ? 'grids' : 'rows'" @click="goDetails"
        />
      </template>
      <template v-else>
        <common-empty text="抱歉，没有找到相关结果" icon="i-icons-nosearch" />
      </template>
    </template>
  </div>
</template>
