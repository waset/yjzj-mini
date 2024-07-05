export const useInviteStore = defineStore('invite', {
  state: (): {
    levelall: Levelall[]
    inviterank: Inviterank[]
    inviteuser: Inviteuser_res
  } => ({
    levelall: [],
    inviterank: [],
    inviteuser: {},
  }),
  actions: {
    // 升级数据
    async getInviteall() {
      const { data, code } = await http.post('/web/promoter/level/all', {}, { auth: false })
      if (code === 200)
        this.levelall = data
    },
    // 邀请榜单数据
    async getInviteRank() {
      const { data, code } = await http.post('/web/promoter/rank', {}, { auth: false })
      if (code === 200) {
        // 手动添加排名
        if (data.length) {
          data.forEach((item: Inviterank, index: number) => item.lv = index + 1)
        }
        this.inviterank = data
      }
    },
    // 绑定邀请人
    async bandInviter(inviteCode: string) {
      const res = await http.post('/web/user/bind/inviter', { inviteCode })
      return res
    },
    // 成为推广员
    async becomePromoter() {
      const res = await http.post('/web/user/become/promoter')
      return res
    },
  },
})
