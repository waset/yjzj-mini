export const windowsStore = defineStore('windows', {
  state: () => ({
    // 这里存放数据
    windows: [] as WindowsRes[],
  }),
  actions: {
    async getWindows(page: number, pageSize: number) {
      const { data, code } = await http.post<WindowsRes[]>('/web/windowShow/list', {
        page,
        pageSize,
      }, { auth: false })

      if (code === 200)
        this.windows = data
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(windowsStore, import.meta.hot))
