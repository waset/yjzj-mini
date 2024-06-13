export const useSubmitOrderStore = defineStore('submitOrder', {
  state: (): {
    couponList: couponList[]

  } => ({
    couponList: [],

  // 当前选择的地址
  }),
  getters: {
  },
  actions: {
    // 获取卡券列表
    async getCouponList(page: number, pageSize: number) {
      try {
        const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', { page, pageSize }, { auth: true })
        if (code === 200)
          this.couponList = data
      }
      catch {
        uni.showToast({
          title: '网络错误,请稍后重试',
          icon: 'error',
        })
      }
    },
    // 获取卡券
    async getCoupon(params: couponReq) {
      try {
        const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', params, { auth: true })
        if (code === 200)
          this.couponList = data
      }
      catch {
        uni.showToast({
          title: '网络错误,请稍后重试',
          icon: 'error',
        })
      }
    },
    //  下单
    async submitOrderReq(params: submitOrderReq) {
      try {
        await http.post<couponList[]>('/web/order/add', { ...params }, { auth: true })
      }
      catch {}
    },
  },
  persist: true,
})
