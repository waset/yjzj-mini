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
      const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', { page, pageSize }, { auth: true })
      if (code === 200)
        this.couponList = data
    },
    // 获取卡券
    async getCoupon(params: couponReq) {
      const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', params, { auth: true })
      if (code === 200)
        this.couponList = data
    },
  },
  persist: true,
})
