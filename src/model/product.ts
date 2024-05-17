export const useProductStore = defineStore('product', {
  state: (): {
    categorys: Categorys
    types: ProductType[]
    products: Product[]
  } => ({
    // 产品类目
    categorys: {
      diy: { label: 'DIY主机', value: 6, icon: 'i-icons-diy' },
      laptop: { label: '笔记本', value: 3, icon: 'i-icons-laptop' },
      components: { label: '组件', value: 4, icon: 'i-icons-components' },
      peripherals: { label: '外设', value: 5, icon: 'i-icons-peripherals' },
      diyGoods: { label: 'DIY配件', value: 7, icon: 'i-icons-diy' },
    },
    // 产品分类
    types: [],
    // 这里存放数据
    products: [],
  }),
  actions: {
    // 获取产品分类
    async getCategorys(category: CategoryKey, page: number, pageSize: number) {
      const { data, code } = await http.post<ProductType[]>('/web/product/type/list', {
        parentID: this.categorys[category].value,
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.types = data
    },
    // 获取产品列表
    async getProducts(params: GetProductParams, page: number, pageSize: number) {
      const { data, code } = await http.post<Product[]>('/web/product/list', {
        ...params,
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.products = data
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
