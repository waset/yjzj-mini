export const useConfigurationStore = defineStore('configuration', {
  state: (): {
    configurations: Configuration[]
  } => ({
    configurations: [],
  }),

  actions: {
    // 获取配置单
    async getList(params: ConfigurationListReq) {
      const { data, code } = await http.post<Configuration[]>('/web/user/product/config/list', params, { auth: true })
      if (code === 200) {
        if (params.page === 1) {
          this.configurations = []
        }
        this.configurations = [...this.configurations, ...data]
      }
    },

    // 删除配置单
    async del(productConfigNO: string) {
      const { code } = await http.post<Configuration>('/web/user/product/config/unCollect', {
        productConfigNO,
      })

      return code
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigurationStore, import.meta.hot))
