export const usePopularizeStore = defineStore('popularize', {
  state: (): {
    rebatelist: Rebatelist[]
    withdrawlist: Withdrawlist[]
    rebateLastpage: number
    withdrawLastpage: number
  } => ({
    rebatelist: [],
    withdrawlist: [],
    rebateLastpage: 10,
    withdrawLastpage: 10,
  }),
  actions: {
    // 返利记录
    async getRebatelist(params: Popularize_req) {
      const { code, data, page } = await http.post<Rebate_req>('/web/rebate/list', params)
      if (code === 200) {
        this.rebateLastpage = page.lastPage

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
      const { data, code, page } = await http.post<Withdraw_req>('/web/user/withdraw/list', params)
      if (code === 200) {
        this.withdrawLastpage = page.lastPage
        if (params.page === 1) {
          this.withdrawlist = data
        }
        else {
          this.withdrawlist = this.withdrawlist.concat(data)
        }
      }
    },
    // 发起提现
    CashWithdraw(params: CashWithdraw_req) {
      return http.post('/web/user/withdraw/apply', params)
    },
  },
})
