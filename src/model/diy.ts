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
    // 制空数据列表
    setModificationListNull() {
      this.ModificationList = []
    },
    // 获取游戏列表
    async getGamesList() {
      const { code, data } = await http.post<gamesList[]>('/web/game/list', { page: 1, pageSize: 10 })

      if (code === 200) {
        this.gamesList = data
        return data
      }
    },
    // 获取游戏性能
    async getGamePower(params: powerParams) {
      const { code, data } = await http.post<FpsPowerRes[]>('/web/game/performance/list', params)
      if (code === 200) {
        return data
      }
    },
    // 获取改配的列表`
    async getModificationList(params: Modification) {
      const { code, data } = await http.post('/web/product/list/by/params', params)
      if (code === 200) {
        this.ModificationList = [...this.ModificationList, ...data]
      }
    },

    // 获取配置单列表
    async configurationList(params: configurationListReq) {
      await http.post('/web/product/config/list', params)
    },

    // 新增配置单
    async addConfiguration(params: addConfiguration) {
      await http.post('/web/product/config/add', params)
    },
    // 下单
    async submit(params: submitReq) {
      await http.post('/web/order/add', params)
    },

    // 获取配置的筛选条件
    async getFilter() {
      await http.post('/web/product/type/param/list', { ids: [2000] })
    },

  },

  // persist: true,
})
