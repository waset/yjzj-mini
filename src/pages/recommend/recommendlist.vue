<script lang="ts" setup>
// const { recommendlist } = storeToRefs(useProductStore())
const { categorys, recommendList } = useProductStore()

const products = ref<Product[]>([])
// 当前产品类目
const category = ref<CategorysItem>({} as CategorysItem)
// 价格区间和 cpu
interface param {
  cpu: string
  start: string
  end: string
}
const Params = ref<param>({
  cpu: '',
  start: '',
  end: '',
})

const lastpage = ref<number>(1000)
const page = ref<number>(0)

const maxs = () => {
  let max = 0
  if (Number(Params.value.start) > Number(Params.value.end)) {
    max = Number(Params.value.start)
  }
  else if (Number(Params.value.start) < Number(Params.value.end)) {
    max = Number(Params.value.end)
  }
  else {
    max = Number(Params.value.end)
  }
  return max
}
const min = () => {
  let min = 0
  if (Number(Params.value.start) > Number(Params.value.end)) {
    min = Number(Params.value.end)
  }
  else if (Number(Params.value.start) < Number(Params.value.end)) {
    min = Number(Params.value.start)
  }
  else {
    min = Number(Params.value.end)
  }
  return min
}

const getProduct = async () => {
  const data = await recommendList({
    productTypeParentID: categorys.diy.value,
    CPUType: Params.value.cpu,
    sellPriceMax: maxs(),
    sellPriceMin: min(),
  }, page.value += 1, 20)

  products.value = [...products.value, ...data?.data || []]
  lastpage.value = data?.page?.lastPage || 1000
}
onLoad((params) => {
  if (params?.value.cpu) {
    Params.value.cpu = params?.cpu
    Params.value.start = params?.start
    Params.value.end = params?.end
  }

  category.value = categorys.diy
  getProduct()
})
// 触底加载分页
onReachBottom(() => {
  if (page.value < lastpage.value) {
    getProduct()
  }
})
</script>

<template>
  <div>
    <navbar-back text="智能推荐" />
    <div class="list">
      <product-list
        :list="products" layout="grids" @click="(item: Product) => {
          Jump('/pages/product/detail', { id: item.id })
        }"
      />
    </div>

    <div v-if="products.length === 0">
      <common-empty text="商品列表为空~" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
