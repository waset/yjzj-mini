export const useBuyStore = defineStore('buy', {
  state: (): {
    products: BuyProduct[]
  } => ({
    products: [],
  }),
  getters: {
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
    isSelectdAll(state) {
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
    selectedProductIds(state) {
      return (isDelete: boolean) => {
        if (state.products.length === 0)
          return []

        return state.products.filter((item) => {
          if (!isDelete)
            return item.select
          else
            return item.delete
        }).map(item => item.id)
      }
    },
    total: state => state.products.filter(item => item.select).reduce((pre, product) => {
      return pre + Number.parseFloat(product.tagPrice) * (product.quantity ?? 1)
    }, 0).toFixed(2),
  },
  actions: {
    selectAll(value: boolean, isDelete: boolean) {
      this.products.forEach((item) => {
        if (!isDelete)
          item.select = value
        else
          item.delete = value
      })
    },

    deleteProduct(ids: BuyProduct['id'][]) {
      ids.forEach((id) => {
        const index = this.products.findIndex(item => item.id === id)
        if (index !== -1)
          this.products.splice(index, 1)
      })
    },
  },
  // persist: true,
})
