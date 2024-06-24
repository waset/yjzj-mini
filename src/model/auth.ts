export const useAuthStore = defineStore('auth', {
  state: (): {
    /**
     * 密钥
     */
    key: string
    /**
     * token
     */
    token: string
    /**
     * 过期时间
     */
    expire_time: number
  } => ({
    key: '',
    token: '',
    expire_time: 0,
  }),
  actions: {
    async getKey() {
      if (this.key)
        return
      const { data, code } = await http.post<loginKey>('/web/login/generate/key', {}, { auth: false })
      if (code === 200)
        this.key = data.loginKey
    },
    async getToken(code: string) {
      const { data, code: rescode } = await http.post<LoginRes>('/web/login', {
        code,
        loginKey: this.key,
        type: 'miniPrograms',
      } as LoginReq, { auth: false })
      if (rescode === 200) {
        this.token = data.token
        this.expire_time = (data.expire_time - 6000) * 1000
      }
    },
    async refreshToken() {
      const res = await http.post<LoginRes>('/web/refresh/token', {}, { auth: false, headers: { Authorization: `Bearer ${this.token}` } })
      return res
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
