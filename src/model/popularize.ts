export const usePopularizeStore = defineStore('popularize', {
  state: (): {
    rebatelist: Levelall[]
    withdrawlist: Levelall[]
  } => ({
    rebatelist: [],
    withdrawlist: [],
  }),
  actions: {
    // 返利记录
    async getRebatelist(params: Popularize_req) {
      const { code, data } = await http.post('/web/rebate/list', params)
      if (code === 200) {
        if (params.page === 1) {
          this.rebatelist = data
        }
        else {
          this.rebatelist = this.rebatelist.concat(data)
        }
      }
    },
    // 返利
    async getWithdrawlist(params: Popularize_req) {
      const { data, code } = await http.post('/web/user/withdraw/list', params)
      if (code === 200) {
        if (params.page === 1) {
          this.withdrawlist = data
        }
        else {
          this.withdrawlist = this.withdrawlist.concat(data)
        }
      }
    },
    // 发起提现
    async CashWithdraw(params: CashWithdraw_req) {
      return await http.post('/web/user/withdraw/apply', params)
    },
  },
})
