export const useProductStore = defineStore('product', {
  state: (): {
    categorys: Categorys
    types: ProductType[]
    products: Product[]
    detail: Product

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
    detail: {} as Product,

  }),
  getters: {
    isDiy: (state) => {
      if (!state.detail)
        return false
      return product_is_diy(state.detail)
    },
  },
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
    // 获取产品详情
    async getProductDetail(id?: number) {
      if (!id) {
        return
      }
      const { data, code } = await http.post<Product>('/web/product/info', { id }, { auth: false })

      if (code === 200)
        this.detail = data
    },

    // 获取智能推荐列表
    async recommendList(params: GetrecommendPar, pages: number, pageSize: number) {
      try {
        const { data, code, page } = await http.post<Product[]>('/web/product/recommend/list', {
          ...params,
          page: pages,
          pageSize,
        }, { auth: false })
        if (code === 200) {
          return { data, page }
        }
        else {
          throw new Error('列表请求失败')
        }
      }
      catch (error) {
        uni.showToast({
          title: '请求失败',
          icon: 'error',
        })
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
