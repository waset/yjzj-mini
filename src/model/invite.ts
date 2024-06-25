export const useInviteStore = defineStore('invite', {
  state: (): {
    levelall: Levelall[]
    inviterank: Inviterank[]
  } => ({
    levelall: [],
    inviterank: [],
  }),
  actions: {
    // 升级数据
    async getInviteall() {
      const { data, code } = await http.post('/web/promoter/level/all', { auth: false })
      if (code === 200)
        this.levelall = data
    },
    // 邀请榜单数据
    async getInviteRank() {
      const { data, code } = await http.post('/web/promoter/rank', { auth: false })
      if (code === 200) {
        // 手动添加排名
        if (data.length) {
          data.forEach((item: Inviterank, index: number) => item.lv = index + 1)
        }
        this.inviterank = data
      }
    },
  },
})
