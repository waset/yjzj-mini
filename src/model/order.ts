export const useOrderStore = defineStore('orders', {
  state: (): {
    orders: Order[]
    lastPage: number
    express: Express
  } => ({
    orders: [] as Order[],
    lastPage: 1,
    express: {} as Express,
  }),

  actions: {
    // 获取订单状态
    async getOrderList(status: number, Page: number, pageSize: number) {
      const sta = status !== undefined && status !== 0 ? Number(status) : null
      const { data, code, page } = await http.post<OrderRes>('/web/order/list', {
        status: sta,
        Page,
        pageSize,
      }, { auth: true })

      if (code === 200) {
        if (Page === 1) {
          // 如果是第一页，直接替换数据
          this.orders = data
        }
        else {
          // 如果不是第一页，追加数据
          this.orders = this.orders.concat(data)
        }
        this.lastPage = page?.lastPage || 1
      }
    },

  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
