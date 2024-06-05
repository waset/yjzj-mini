import Product from '@/components/buys/Product.vue'

export const useOrderStore = defineStore('orders', {
  state: (): {
    orders: Order[]
  } => ({
    orders: [{
      id: 1,
      status: 1,
      no: '202201010001',
      sellPrice: '7999',
      details: [{
        id: 1,
        productSnapshot: {
          banner: ['./assets/svg/warn'],
          name: '天选5PRo14代酷睿i9天选5PRo4代酷睿i9天选5PRo14代酷睿i9',
          tagPrice: '4399',
        },
      }, {
        id: 2,
        productSnapshot: {
          banner: ['./assets/svg/warn'],
          name: '联想 ThinkBook14P R7-6800H 16G 512G 集成',
          tagPrice: '3099',
        },
      }],

    } as Order],
  }),

  actions: {
    // 获取订单状态
    async getOrderList(status: Order['status'], page: number = 1, pageSize: number = 10) {
      const sta = status || null
      const { data, code } = await http.post<Order[]>('/web/order/list', {
        status: sta,
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.orders = data
    },

  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
