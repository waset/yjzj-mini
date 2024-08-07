const colors: string[] = [
  '#A7F522',
  '#E61C44',
  '#52FFE2',
  '#FE63FC',
]
const getColorsArr = () => {
  return colors.sort(() => Math.random() - 0.5)
}

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
        const res = data.filter(item => item.status === 1)

        if (this.windows.length === res.length && this.windows.every((v, i) => v.id === res[i].id && v.updatedAt === res[i].updatedAt)) {
          return
        }

        this.windows = res

        this.banners = this.getWindowsByKeyValue('name', '小程序 banner')?.content.images || []

        this.hots = this.getWindowsByKeyValue('name', '小程序 热门产品')?.content.products || []
        let colors = getColorsArr()
        this.hots = this.hots.map((item, index) => {
          return {
            ...item,
            color: colors[index % colors.length],
          }
        })

        this.pushs = this.getWindowsByKeyValue('name', '小程序 推荐定制')?.content.products || []
        colors = getColorsArr()
        this.pushs = this.pushs.map((item, index) => {
          return {
            ...item,
            color: colors[index % colors.length],
          }
        })
      }
    },
    // 通过名称、ID、状态获取橱窗数据
    getWindowsByKeyValue<T extends keyof WindowsRes>(key: T, value: WindowsRes[T]): WindowsRes | undefined {
      return this.windows.find(item => item[key] === value)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWindowsStore, import.meta.hot))
