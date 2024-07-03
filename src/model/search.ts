export const useSearchStore = defineStore('Search', {
  state: (): {
    searchList: Product[]
    searchParams: Search_req
    lastpage: number
  } => ({
    searchList: [],
    lastpage: 1,
    searchParams: { name: '', page: 1, pageSize: 10, order: '', sort: '' },
  }),
  actions: {
    async getsearch() {
      const { data, code, page } = await http.post<Search_res>('/web/product/list', this.searchParams, { auth: false })
      if (code === 200) {
        this.searchList = this.searchList.concat(data)
        this.lastpage = page.lastPage
        this.searchParams.page++
      }
    },
    clearSearch() {
      this.searchList = []
      this.searchParams.page = 1
      this.getsearch()
    },
  },
})
