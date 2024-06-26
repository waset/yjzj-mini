export const useUserStore = defineStore('user', {
  state: (): {
    /**
     * 当前登录用户信息
     */
    user: UserInfo
    /**
     * 是否已经注册
     */
    isRegister: boolean
  } => ({
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
