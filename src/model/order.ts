const def = {
  id: 1,
  status: 6,
  no: '202201010001',
  sellPrice: '7999',
  express: {
    companyName: '顺丰速运',
    no: 'SF23409231234567890',
    snapshot: {
      message: '已签收，感谢使用顺丰，期待再次为您服务',
      lastResult: {
        data: [{
          context: '[武汉市]快件到达 【武汉东湖新技术开发区崇文中心店】',
          time: '2022-01-01 12:00:00',
        }, {
          context: '[杭州市]快件在【杭州西湖西溪软件园店】完成分拣，准备发往 【杭州城北中转场】',
          time: '2024-04-24 18:46:43',
        }, {
          context: '[杭州市]快件运输中',
          time: '2024-04-24 18:37:22',
        }],
      },
    },
  },
  details: [{
    id: 1,
    productSnapshot: {
      banner: [''],
      name: '天选5PRo14代酷睿i9天选5PRo4代酷睿i9天选5PRo14代酷睿i9',
      tagPrice: '4399',
    },
  }, {
    id: 2,
    productSnapshot: {
      banner: [''],
      name: '联想 ThinkBook14P R7-6800H 16G 512G 集成',
      tagPrice: '3099',
    },
  }],
} as Order

export const useOrderStore = defineStore('orders', {
  state: (): {
    orders: Order[]
    express: Express
  } => ({
    orders: [def as Order],
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
      })

      if (code === 200) {
        this.orders = data
      }
    },

    // 根据orderId获取物流信息
    async getExpressDetails(orderId: Order['id'], page: number = 1, pageSize: number = 1000) {
      const id = orderId
      const { data, code } = await http.post<Express>('/web/order/express/info', {
        orderId: id,
        page,
        pageSize,
      })

      if (code === 200) {
        this.express = data
      }
    },

  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
