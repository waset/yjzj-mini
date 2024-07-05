export const useBuyStore = defineStore('buy', {
  state: (): {
    products: BuyProduct[]
  } => ({
    products: [],
  }),
  getters: {
    // 选中数量
    selectedNum(state) {
      return (isDelete: boolean) => {
        if (state.products.length === 0)
          return 0

        return state.products.filter((item) => {
          if (!isDelete)
            return item.select
          else
            return item.delete
        }).length
      }
    },
    // 是否全选
    isSelectedAll(state) {
      return (isDelete: boolean) => {
        if (state.products.length === 0)
          return false

        return state.products.every((item) => {
          if (!isDelete)
            return item.select
          else
            return item.delete
        })
      }
    },
    // 选中的所有商品id
    selectedProductIds(state) {
      const obj = ref<delobj>({
        ids: [],
        alls: [],
      })
      return (isDelete: boolean) => {
        if (state.products.length === 0)
          return obj.value

        const selectArr = state.products.filter((item) => {
          if (!isDelete)
            return item.select
          else
            return item.delete
        })
        selectArr.forEach((item) => {
          if (item.alloaction) {
            obj.value.alls.push(item.alloaction)
          }
          else {
            obj.value.ids.push(item.id)
          }
        })
        return obj.value

        // .map(item => item.id)
      }
    },
    total: state => state.products.filter(item => item.select).reduce((pre, product) => {
      return pre + Number.parseFloat(product.sellPrice) * (product.quantity ?? 1)
    }, 0).toFixed(2),
  },
  actions: {
    // 选中全部
    selectAll(value: boolean, isDelete: boolean) {
      this.products.forEach((item) => {
        if (!isDelete)
          item.select = value
        else
          item.delete = value
      })
    },
    // 删除商品
    deletes(ids: BuyProduct['id'][], alls: BuyProduct['id'][]) {
      let idsPro = this.products.filter(item => item.id)
      let allPro = this.products.filter(item => item.alloaction)
      if (ids.length !== 0) {
        idsPro = idsPro.filter(item => !ids.includes(item.id))
      }
      if (alls.length !== 0) {
        allPro = allPro.filter(item => !alls.includes(item.alloaction as number))
      }
      this.products = [...idsPro, ...allPro]
    },

    // 添加商品
    addProduct(product: BuyProduct) {
      if (product.id) {
        // 判断购物车有没有该产品
        const index = this.products.findIndex(item => item.id === product.id)
        if (index === -1) {
          // 没有该产品
          this.products.push(product)
        }
        else {
          // 有该产品
          this.products[index].quantity += 1
        }
      }

      if (product.alloaction) {
        const index = this.products.findIndex(item => item.alloaction === product.alloaction)
        if (index === -1) {
          // 没有该产品
          this.products.push(product)
        }
        else {
          // 有该产品
          this.products[index].quantity += 1
        }
      }
    },
  },
  persist: true,
})
