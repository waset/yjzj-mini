export const useUserStore = defineStore('user', {
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
     * 当前登录用户信息
     */
    user: UserInfo
    /**
     * 是否已经注册
     */
    isRegister: boolean
  } => ({
    key: '',
    token: '',
    user: {} as UserInfo,
    isRegister: false,
  }),
  getters: {
    userDesc: (state) => {
      return <Desc<UserInfo>>{
        ...state.user,
        isSubDesc: state.user?.isSub === 1 ? '已订阅' : '未订阅',
        phoneDesc: state.user?.phone ? SensitivePhone(state.user.phone) : '未绑定手机号',
      }
    },
  },
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
      }
    },
    async getUserInfo() {
      const { data, code } = await http.post<UserInfo>('/web/user/info')
      if (code === 200) {
        this.user = data
        this.isRegister = !!data.phone
      }
      else {
        this.isRegister = false
      }
    },
    async uploadAvatar(avatarUrl: string) {
      const { data } = await http.upload<UploadRes>('/web/file/upload', avatarUrl, {})

      return data?.fileKey || ''
    },
    async getPhoneNumber(req: GetPhoneNumberRes['detail']) {
      const { data } = await http.post<{
        phoneNumber: string
      }>('/web/user/bind/mpphone', req)

      return data?.phoneNumber || ''
    },
    async authentication(req: AuthenticationReq) {
      const { code, message } = await http.post<UserInfo>('/web/user/realName/authentication', req)
      if (code === 200) {
        this.user.IDCard = req.IDCard
        this.user.realName = req.realName
      }
      else {
        uni.showToast({
          title: message,
          icon: 'none',
        })
      }
      return code === 200
    },
    async register(user: UserInfo) {
      const { data, code } = await http.post<UserInfo>('/web/user/updata', user)
      if (code === 200) {
        this.user = data
      }
      return code === 200
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
