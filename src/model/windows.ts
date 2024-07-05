export const useWindowsStore = defineStore('windows', {
  state: (): {
    windows: WindowsRes[]
    banners: WindowsImage[]
    hots: Product[]
    pushs: Product[]
  } => ({
    windows: [],
    banners: [],
    hots: [],
    pushs: [],
  }),
  actions: {
    // 通过接口获取橱窗数据
    async getWindows(page: number, pageSize: number) {
      const { data, code } = await http.post<WindowsRes[]>('/web/windowShow/list', {
        page,
        pageSize,
      }, { auth: false })

      if (code === 200) {
        this.windows = data

        this.banners = this.getWindowsByKeyValue('name', '小程序 banner')?.content.images || []
        this.hots = this.getWindowsByKeyValue('name', '小程序 热门产品')?.content.products || []
        this.pushs = this.getWindowsByKeyValue('name', '小程序 推荐定制')?.content.products || []
      }
    },
    // 通过名称、ID、状态获取橱窗数据
    getWindowsByKeyValue<T extends keyof WindowsRes>(key: T, value: WindowsRes[T]): WindowsRes | undefined {
      return this.windows.find(item => item[key] === value)
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowsStore, import.meta.hot))
