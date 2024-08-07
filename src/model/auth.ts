export const useAuthStore = defineStore('auth', {
  state: (): {
    /**
     * 密钥
     */
    key: string
    pc_key: string
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
    pc_key: '',
    token: '',
    expire_time: 0,
  }),
  actions: {
    logout() {
      this.token = ''
      this.expire_time = 0
    },
    async getKey() {
      if (this.key)
        return
      const { data, code } = await http.post<loginKey>('/web/login/generate/key', {}, { auth: false })
      if (code === 200)
        this.key = data.loginKey
    },
    async getToken(code: string) {
      const user = useUserStore()
      const { data, code: rescode } = await http.post<LoginRes>('/web/login', {
        code,
        loginKey: this.pc_key || this.key,
        type: 'miniPrograms',
        inviteCode: user.shareCode || undefined,
      } as LoginReq, { auth: false })
      if (rescode === 200) {
        this.token = data.token
        this.pc_key = ''
        this.expire_time = (data.expire_time - 6000) * 1000
      }
    },
    async refreshToken() {
      const res = await http.post<LoginRes>('/web/refresh/token', {}, { auth: false, headers: { Authorization: `Bearer ${this.token}` } })
      return res
    },
    async verificationLogin() {
      const { code, data } = await http.post<LoginRes>('/web/login/auth', { loginKey: this.key }, { auth: false })
      if (code === 200) {
        this.token = data.token
        this.expire_time = (data.expire_time - 6000) * 1000
        return true
      }
      return false
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
