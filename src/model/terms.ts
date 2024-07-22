export const useTermsStore = defineStore('terms', {
  state: (): {
    agreement?: Terms
    privacy?: Terms
  } => ({

  }),
  actions: {
    async getTerms(code: TermsCode) {
      if (this.$state[code]) {
        return this.$state[code]
      }
      const { code: rcode, data } = await http.post<Terms>('/web/staticPage/info', { code }, { auth: false })
      if (rcode !== 200) {
        return undefined
      }
      this.$state[code] = data
      return data
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTermsStore, import.meta.hot))
