export const useOrderStore = defineStore('orders', {
  state: (): {
    orders: Order[]
    express: Express
  } => ({
    orders: [] as Order[],
    express: {} as Express,
  }),

  actions: {
    // 获取订单状态
    async getOrderList(status: Order['status'], page: number = 1, pageSize: number = 1000) {
      const sta = status !== undefined && status !== 0 ? Number(status) : null
      const { data, code } = await http.post<Order[]>('/web/order/list', {
        status: sta,
        page,
        pageSize,
      }, { auth: true })

      if (code === 200) {
        this.orders = data
      }
    },

  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
