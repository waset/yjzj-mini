export const useWindowsStore = defineStore('windows', {
  state: (): {
    windows: WindowsRes[]
  } => ({
    // 这里存放数据
    windows: [],
  }),
  actions: {
    // 通过接口获取橱窗数据
    async getWindows(page: number, pageSize: number) {
      const { data, code } = await http.post<WindowsRes[]>('/web/windowShow/list', {
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.windows = data
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
