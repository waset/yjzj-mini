// 产品类目
enum Category {
  computer = 2,
  laptop = 3,
  components = 4,
  peripherals = 5,
  diy = 6,
  diyGoods = 7,
}
// 产品类目
type Categorys = {
  [key in keyof typeof Category]: {
    label: string
    value: number
  }
}

export const useProductStore = defineStore('product', {
  state: () => ({
    // 产品类目
    categorys: {
      computer: { label: '整机', value: 2 },
      laptop: { label: '笔记本', value: 3 },
      components: { label: '组件', value: 4 },
      peripherals: { label: '外设', value: 5 },
      diy: { label: 'DIY', value: 6 },
      diyGoods: { label: 'DIY', value: 6 },
    } as Categorys,
    // 产品分类
    types: [] as ProductType[],
    // 这里存放数据
    products: [] as Product[],
  }),
  actions: {
    // 获取产品分类
    async getCategorys(category: keyof Categorys, page: number, pageSize: number) {
      const { data, code } = await http.post<ProductType[]>('/web/product/type/list', {
        parentID: this.categorys[category].value,
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.types = data
    },
    // 获取产品列表
    async getProducts(typeID: number, page: number, pageSize: number) {
      const { data, code } = await http.post<Product[]>('/web/product/list', {
        typeID,
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
