export const useDiyStore = defineStore('diy', {
  state: (): {
    gamesList: gamesList[]
    ModificationList: any

  } => ({
    gamesList: [],
    ModificationList: [],
  }),
  getters: {

  },
  actions: {
    // 获取游戏列表
    async getGamesList() {
      const { code, data } = await http.post<gamesList[]>('/web/game/list', { page: 1, pageSize: 10 }, { auth: true })

      if (code === 200) {
        this.gamesList = data
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
    // 获取改配的列表
    async getModificationList(params: Modification) {
      const { code, data } = await http.post('/web/product/list/by/params', params, { auth: true })
      if (code === 200) {
        return this.ModificationList = [...this.ModificationList, ...data]
      }
    },
    // 获取配置单列表
    async configurationList(params: configurationListReq) {
      await http.post('/web/product/config/list', params, { auth: true })
    },

    // 新增配置单 /product/config/add
    async addConfiguration(params: addConfiguration) {
      await http.post('/web/product/config/add', params, { auth: true })
    },
    // 下单
    async submit(params: submitReq) {
      await http.post('/web/order/add', params, { auth: true })
    },

  },

  persist: true,
})
