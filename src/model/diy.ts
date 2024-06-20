export const useDiyStore = defineStore('diy', {
  state: (): {
    gamesList: any
  } => ({
    gamesList: [],
  }),
  getters: {

  },
  actions: {
    // 获取游戏列表
    async getGamesList() {
      const { code, data } = await http.post<gamesList[]>('/web/game/list', { page: 1, pageSize: 10 }, { auth: true })
      if (code === 200) {
        return data
      }
    },
    // 获取游戏性能
    async getGamePower(params: powerParams) {
      const { code, data } = await http.post<FpsPowerRes[]>('/web/game/performance/list', params, { auth: true })
      if (code === 200) {
        return data
      }
    },

  },
  persist: true,
})
